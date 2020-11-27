import { Map } from 'immutable'
import { derived, get } from 'svelte/store'

import type { Direction, Location } from '~/types'

import { configuration } from './configuration'
import { runtime } from './runtime'

const keyToDirection = derived<typeof configuration, Map<string, Direction>>(
  configuration,
  ({ keyMappings }) => {
    return Map({
      [keyMappings.up]: {
        name: 'UP',
        key: keyMappings.up,
        getNextLocation: (location: Location) =>
          location.set('Y', location.get('Y', 0) - 1),
      },
      [keyMappings.down]: {
        name: 'DOWN',
        key: keyMappings.up,
        getNextLocation: (location: Location) =>
          location.set('Y', location.get('Y', 0) + 1),
      },
      [keyMappings.left]: {
        name: 'LEFT',
        key: keyMappings.up,
        getNextLocation: (location: Location) =>
          location.set('X', location.get('X', 0) - 1),
      },
      [keyMappings.right]: {
        name: 'RIGHT',
        key: keyMappings.up,
        getNextLocation: (location: Location) =>
          location.set('X', location.get('X', 0) + 1),
      },
    })
  },
)

const initialDirection = derived(
  [configuration, keyToDirection],
  ([$configuration, $keyToDirection]) =>
    $keyToDirection.get($configuration.keyMappings.up) as Direction,
)

const direction = derived(
  [initialDirection, keyToDirection, runtime],
  ([$initialDirection, $keyToDirection, $runtime], set) => {
    const keydownHandler = (event: KeyboardEvent) => {
      if ($keyToDirection.has(event.key)) {
        set($keyToDirection.get(event.key) as Direction)
      }
    }

    if ($runtime.status === 'RUNNING') {
      document.addEventListener('keydown', keydownHandler)
      return () => document.removeEventListener('keydown', keydownHandler)
    }

    set($initialDirection)
  },
  get(initialDirection),
)

export { direction }
