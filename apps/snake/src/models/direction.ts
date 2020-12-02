import { produce } from 'immer'
import { combineLatest, concat, fromEvent } from 'rxjs'
import {
  filter,
  map,
  mergeMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators'

import type { Configuration, Direction } from '~/types'

import { configuration$ } from './configuration'

const keyToDirection$ = configuration$.pipe(
  map<Configuration, Record<string, Direction>>(({ keyMappings }) => ({
    [keyMappings.up]: {
      name: 'UP',
      key: keyMappings.up,
      getNextLocation: produce((draft) => {
        draft.Y -= 1
      }),
    },
    [keyMappings.down]: {
      name: 'DOWN',
      key: keyMappings.up,
      getNextLocation: produce((draft) => {
        draft.Y += 1
      }),
    },
    [keyMappings.left]: {
      name: 'LEFT',
      key: keyMappings.up,
      getNextLocation: produce((draft) => {
        draft.X -= 1
      }),
    },
    [keyMappings.right]: {
      name: 'RIGHT',
      key: keyMappings.up,
      getNextLocation: produce((draft) => {
        draft.X += 1
      }),
    },
  })),
)

const initialDirection$ = combineLatest([configuration$, keyToDirection$]).pipe(
  mergeMap(
    ([{ keyMappings }, keyToDirection]) => keyToDirection[keyMappings.up],
  ),
)

const direction$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  withLatestFrom(keyToDirection$),
  map(([evt, keyToDirection]) => {
    if (evt.key in keyToDirection) {
      return keyToDirection[evt.key]
    }
  }),
  filter((val) => val != undefined),
)

export { direction$ }
