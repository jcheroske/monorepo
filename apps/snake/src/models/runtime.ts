import { writable } from 'svelte/store'

import type { RuntimeStatus } from '~/types'

function getInitialState() {
  return {
    foodCount: 0,
    status: 'RESET' as RuntimeStatus,
  }
}

const runtime = writable(getInitialState())

function reset(): void {
  runtime.set(getInitialState())
}

function start(): void {
  runtime.update((state) => {
    if (state.status === 'RESET' || state.status === 'PAUSED') {
      return { ...state, status: 'RUNNING' }
    }

    return state
  })
}

function pause(): void {
  runtime.update((state) => {
    if (state.status === 'RUNNING') {
      return { ...state, status: 'PAUSED' }
    }

    return state
  })
}

function finish(): void {
  runtime.update((state) => {
    if (state.status === 'RUNNING') {
      return { ...state, status: 'FINISHED' }
    }

    return state
  })
}

function consumeFood(): void {
  runtime.update((state) => {
    if (state.status === 'RUNNING') {
      return { ...state, foodCount: state.foodCount + 1 }
    }

    return state
  })
}

export { consumeFood, finish, pause, reset, runtime, start }
