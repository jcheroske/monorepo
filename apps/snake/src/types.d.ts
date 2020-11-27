import { List, Map, RecordOf } from 'immutable'

export type ConfigurationData = {
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
export type Configuration = RecordOf<ConfigurationData>

export type LocationData = { X: number; Y: number }
export type Location = RecordOf<LocationData>

export type Snake = List<Location>

export type CellType = 'EMPTY' | 'HEAD' | 'BODY' | 'FOOD' | 'COLLISION'

export type Grid = List<List<CellType>>

export type DirectionName = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type Direction = {
  name: DirectionName
  key: string
  getNextLocation: (location: Location) => Location
}

export type RuntimeStatus = 'RUNNING' | 'PAUSED' | 'RESET' | 'FINISHED'
