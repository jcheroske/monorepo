<script>
  import { useMachine } from '@jcheroske/xstate-svelte'
  import { gameMachine } from '~/machines/game'

  const { context$, send, state$ } = useMachine(gameMachine)

  $: console.log($context$)
  $: console.log($state$)
</script>

<template>
  <button on:click="{() => send('START')}">Start Game</button>
  <button on:click="{() => send('DIRECTION')}">GO TO PROCESSING</button>
</template>
