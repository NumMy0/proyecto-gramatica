/**
 * Tipos y definiciones para la Máquina de Turing
 * Proyecto de Gramática y Lenguajes Formales
 */

export type State = string
export type Symbol = string
export type Direction = 'L' | 'R' | 'S' // Left, Right, Stay

/**
 * Representa una transición de la Máquina de Turing
 */
export interface Transition {
  currentState: State
  readSymbol: Symbol
  writeSymbol: Symbol
  direction: Direction
  nextState: State
  comment?: string
}

/**
 * Configuración completa de la Máquina de Turing
 */
export interface TuringMachineConfig {
  states: State[]
  inputAlphabet: Symbol[]
  tapeAlphabet: Symbol[]
  initialState: State
  acceptState: State
  rejectState: State
  blankSymbol: Symbol
  transitions: Transition[]
}

/**
 * Estado actual de la cinta en ejecución
 */
export interface TapeState {
  tape: Symbol[]
  headPosition: number
  currentState: State
  stepCount: number
  isHalted: boolean
  isAccepted: boolean | null
}

/**
 * Resultado de ejecutar un paso
 */
export interface StepResult {
  success: boolean
  message: string
  previousState?: State
  currentState?: State
  symbolRead?: Symbol
  symbolWritten?: Symbol
  direction?: Direction
}
