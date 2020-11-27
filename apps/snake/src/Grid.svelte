<script>
  import { grid } from '~/models/grid'
  import Cell from './Cell.svelte'
</script>

<template>
  <table class="table-auto">
    {#each $grid.toArray() as row}
      <tr>
        {#each row.toArray() as cellType}
          <td>
            <Cell type="{cellType}" />
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</template>
