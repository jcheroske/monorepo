import { assign } from '@xstate/immer'
import { map } from 'rxjs/operators'
import { Machine } from 'xstate'

import { configuration$ } from '~/models/configuration'
import { direction$ } from '~/models/direction'
import type { Direction } from '~/types'

let configuration: Configuration
configuration$.subscribe({
  next(cfg) {
    configuration = cfg
  },
})

interface GameStateSchema {
  states: {
    init: Record<string, unknown>
    running: {
      states: {
        waiting: Record<string, unknown>
        processing: Record<string, unknown>
      }
    }
    finished: Record<string, unknown>
  }
}

type GameEvent =
  | { type: 'START' }
  | { type: 'RESET' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'FINISH' }
  | { type: 'DIRECTION'; value: Direction }

interface GameContext {
  currentDirection?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  a?: number
  b?: number
  c?: number
  d?: number
}

const gameMachine = Machine<GameContext, GameStateSchema, GameEvent>(
  {
    id: 'game',
    initial: 'init',
    context: { a: 0 },
    states: {
      init: {
        on: {
          START: 'running',
        },
      },
      running: {
        initial: 'waiting',
        states: {
          waiting: {
            entry: [
              assign((cxt) => {
                cxt.b = 2
              }),
            ],
            on: {
              DIRECTION: {
                actions: [
                  assign((cxt) => {
                    cxt.c = 3
                  }),
                ],
              },
            },
          },
          processing: {
            entry: [
              assign((cxt) => {
                cxt.d = 4
              }),
            ],
          },
        },
        on: {
          RESET: 'init',
        },
      },
      finished: {
        on: {
          RESET: 'init',
        },
      },
    },
  },
  {
    services: {
      direction: () =>
        direction$.pipe(
          map((direction) => ({ type: 'DIRECTION', value: direction })),
        ),
    },
  },
)

export { gameMachine }
