import { SvelteSubject } from '@jcheroske/rxjs-svelte'
import { freeze } from 'immer'

import type { Configuration } from '~/types'

const DEFAULT_CONFIGURATION: Configuration = {
  cellSize: 7,
  gridSize: {
    X: 21,
    Y: 21,
  },
  tick: {
    durationReductionFactor: 0.9,
    initialDuration: 1000,
  },
  keyMappings: {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  },
}

const configuration$ = new SvelteSubject(freeze(DEFAULT_CONFIGURATION))

export { configuration$ }
