<script>
  import { is } from 'immutable'

  import { direction } from '~/models/direction'
  import { food, relocateFood } from '~/models/food'
  import { snake, attachNewHead, removeTail, resetSnake } from '~/models/snake'
  import { tick } from '~/models/tick'
  import { consumeFood, runtime, start, reset, pause } from '~/models/runtime'
  import Grid from './Grid.svelte'

  import type { RuntimeStatus } from './types'

  let lastStatus: RuntimeStatus
  let lastTick: number
  $: {
    if (lastStatus !== 'RESET' && $runtime.status === 'RESET') {
      relocateFood()
      resetSnake()
    }

    if ($runtime.status === 'RUNNING' && lastTick !== $tick) {
      lastTick = $tick
      attachNewHead()
      if (is($food, $snake.first())) {
        relocateFood()
      } else {
        removeTail()
      }
    }
    lastStatus = $runtime.status
  }
</script>

<template>
  <h1>Tick: {$tick}</h1>
  <h1>Runtime Status: {$runtime.status}</h1>
  <h1>Direction: {$direction.name}</h1>
  <h1>Food Count: {$runtime.foodCount}</h1>
  <button on:click="{start}">Start Game</button>
  <button on:click="{reset}">Reset Game</button>
  <button on:click="{pause}">Pause Game</button>
  <button on:click="{consumeFood}">Consume Food</button>

  <Grid />
</template>
