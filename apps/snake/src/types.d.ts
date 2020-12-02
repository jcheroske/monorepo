export type Configuration = {
  cellSize: number
  gridSize: {
    X: number
    Y: number
  }
  tick: {
    durationReductionFactor: number
    initialDuration: number
  }
  keyMappings: {
    up: string
    down: string
    left: string
    right: string
  }
}

export type Location = { X: number; Y: number }

export type Snake = Location[]

export type CellType = 'EMPTY' | 'HEAD' | 'BODY' | 'FOOD' | 'COLLISION'

export type Grid = CellType[][]

export type DirectionName = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type Direction = {
  name: DirectionName
  key: string
  getNextLocation: (location: Location) => Location
}

export type RuntimeStatus = 'RUNNING' | 'PAUSED' | 'RESET' | 'FINISHED'
