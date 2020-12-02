<script>
  import { configuration } from '~/models/configuration'
  import type { CellType } from '~/types'

  export let size: number = $configuration.cellSize
  export let type: CellType

  const typeToColorMap = new Map<CellType, String>()
  typeToColorMap.set('EMPTY', 'black')
  typeToColorMap.set('BODY', 'green-600')
  typeToColorMap.set('HEAD', 'red-600')
  typeToColorMap.set('FOOD', 'yellow-300')
</script>

<style>
</style>

<template>
  <div class="h-{size} w-{size} bg-{typeToColorMap.get(type)}"></div>
</template>
