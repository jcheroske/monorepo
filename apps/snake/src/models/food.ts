import { is } from 'immutable'
import { derived, get, writable } from 'svelte/store'

import type { Location } from '~/types'

import { configuration } from './configuration'
import { snake } from './snake'
import { LocationFactory } from './util'

const food = writable<Location>(LocationFactory())

let $currentConfiguration = get(configuration)
let $currentSnake = get(snake)

derived([configuration, snake], ([$configuration, $snake]) => {
  $currentConfiguration = $configuration
  $currentSnake = $snake
})

function relocateFood(): void {
  const { gridSize } = $currentConfiguration
  while (true) {
    const X = Math.floor(Math.random() * gridSize.X)
    const Y = Math.floor(Math.random() * gridSize.Y)

    const location = LocationFactory({ X, Y })
    if ($currentSnake.every((seqment) => !is(seqment, location))) {
      food.set(location)
      break
    }
  }
}

export { food, relocateFood }
