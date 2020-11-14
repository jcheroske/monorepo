<script>
  import { CellContents } from './types/CellContents.enum'

  export let size: number = 5
  export let contents: CellContents = CellContents.EMPTY

  const contentsToColorMap = new Map<CellContents, String>()
  contentsToColorMap.set(CellContents.EMPTY, 'black')
  contentsToColorMap.set(CellContents.BODY, 'green-600')
  contentsToColorMap.set(CellContents.HEAD, 'red-600')
  contentsToColorMap.set(CellContents.FOOD, 'yellow-300')
</script>

<style>
</style>

<template>
  <div class="h-{size} w-{size} bg-{contentsToColorMap.get(contents)}"></div>
</template>
