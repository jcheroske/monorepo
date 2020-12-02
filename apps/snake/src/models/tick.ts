import { derived, get } from 'svelte/store'

import { configuration$ } from './configuration'
import { runtime } from './runtime.ts.disabled'
import { snake } from './snake.ts.disabled'

const tickDuration = derived([configuration, snake], ([{ tick }, $snake]) => {
  return (
    tick.durationReductionFactor ** ($snake.size - 1) * tick.initialDuration
  )
})

let isTicking = false
let tickInterval: NodeJS.Timer | undefined
const tick = derived(
  runtime,
  ($runtime, set) => {
    let savedTickDuration: number

    function exitTickLoop() {
      clearInterval(tickInterval as NodeJS.Timer)
    }

    function startTickLoop() {
      set(Date.now())
      const nextTickDuration = get(tickDuration)
      if (savedTickDuration !== nextTickDuration) {
        exitTickLoop()
        savedTickDuration = nextTickDuration
        tickInterval = setInterval(startTickLoop, savedTickDuration)
      }
    }

    if (!isTicking && $runtime.status === 'RUNNING') {
      isTicking = true
      startTickLoop()
    } else if (isTicking && $runtime.status !== 'RUNNING') {
      isTicking = false
      exitTickLoop()
    }
  },
  Date.now(),
)

export { tick }
