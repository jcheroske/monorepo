import { Record } from 'immutable'
import { writable } from 'svelte/store'

import type { Configuration, ConfigurationData } from '~/types'

const ConfigurationFactory: (
  data?: ConfigurationData,
) => Configuration = Record({
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
})

const configuration = writable(ConfigurationFactory())

export { configuration }
