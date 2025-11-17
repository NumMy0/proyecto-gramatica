/**
 * Composable para manejar la lógica de la Máquina de Turing
 */

import { ref, computed } from 'vue'
import type { TuringMachineConfig, TapeState, Transition, StepResult } from '@/types/turingMachine'

export function useTuringMachine(config: TuringMachineConfig) {
  const tapeState = ref<TapeState>({
    tape: [],
    headPosition: 0,
    currentState: config.initialState,
    stepCount: 0,
    isHalted: false,
    isAccepted: null,
  })

  const executionHistory = ref<TapeState[]>([])

  /**
   * Inicializa la cinta con el input del usuario
   */
  function initializeTape(input: string): void {
    const inputSymbols = input.split('')

    // Validar que todos los símbolos estén en el alfabeto
    const invalidSymbols = inputSymbols.filter((s) => !config.inputAlphabet.includes(s))

    if (invalidSymbols.length > 0) {
      throw new Error(`Símbolos inválidos: ${invalidSymbols.join(', ')}`)
    }

    // Inicializar la cinta con el input + símbolo blanco
    tapeState.value = {
      tape: [...inputSymbols, config.blankSymbol],
      headPosition: 0,
      currentState: config.initialState,
      stepCount: 0,
      isHalted: false,
      isAccepted: null,
    }

    executionHistory.value = [{ ...tapeState.value, tape: [...tapeState.value.tape] }]
  }

  /**
   * Busca una transición válida para el estado y símbolo actual
   */
  function findTransition(state: string, symbol: string): Transition | null {
    return (
      config.transitions.find((t) => t.currentState === state && t.readSymbol === symbol) || null
    )
  }

  /**
   * Ejecuta un paso de la máquina de Turing
   */
  function step(): StepResult {
    if (tapeState.value.isHalted) {
      return {
        success: false,
        message: 'La máquina ya se detuvo',
      }
    }

    const currentSymbol = tapeState.value.tape[tapeState.value.headPosition]
    const transition = findTransition(tapeState.value.currentState, currentSymbol)

    if (!transition) {
      // No hay transición, la máquina se detiene y rechaza
      tapeState.value.isHalted = true
      tapeState.value.isAccepted = false
      return {
        success: false,
        message: `No hay transición para estado '${tapeState.value.currentState}' con símbolo '${currentSymbol}'`,
      }
    }

    const previousState = tapeState.value.currentState

    // Aplicar la transición
    tapeState.value.tape[tapeState.value.headPosition] = transition.writeSymbol
    tapeState.value.currentState = transition.nextState
    tapeState.value.stepCount++

    // Mover el cabezal
    if (transition.direction === 'R') {
      tapeState.value.headPosition++
      // Extender la cinta si es necesario
      if (tapeState.value.headPosition >= tapeState.value.tape.length) {
        tapeState.value.tape.push(config.blankSymbol)
      }
    } else if (transition.direction === 'L') {
      if (tapeState.value.headPosition > 0) {
        tapeState.value.headPosition--
      }
      // Si intentamos ir más a la izquierda del inicio, nos quedamos
    }
    // 'S' (Stay) no hace nada

    // Verificar si llegamos a un estado final
    if (tapeState.value.currentState === config.acceptState) {
      tapeState.value.isHalted = true
      tapeState.value.isAccepted = true
    } else if (tapeState.value.currentState === config.rejectState) {
      tapeState.value.isHalted = true
      tapeState.value.isAccepted = false
    }

    // Guardar en el historial
    executionHistory.value.push({
      ...tapeState.value,
      tape: [...tapeState.value.tape],
    })

    return {
      success: true,
      message: transition.comment || 'Transición ejecutada',
      previousState,
      currentState: transition.nextState,
      symbolRead: currentSymbol,
      symbolWritten: transition.writeSymbol,
      direction: transition.direction,
    }
  }

  /**
   * Ejecuta la máquina hasta que se detenga
   */
  function run(maxSteps: number = 1000): StepResult[] {
    const results: StepResult[] = []
    let stepCount = 0

    while (!tapeState.value.isHalted && stepCount < maxSteps) {
      results.push(step())
      stepCount++
    }

    if (stepCount >= maxSteps) {
      results.push({
        success: false,
        message: 'Se alcanzó el límite máximo de pasos',
      })
    }

    return results
  }

  /**
   * Reinicia la máquina
   */
  function reset(): void {
    tapeState.value = {
      tape: [],
      headPosition: 0,
      currentState: config.initialState,
      stepCount: 0,
      isHalted: false,
      isAccepted: null,
    }
    executionHistory.value = []
  }

  /**
   * Estado de la máquina en texto legible
   */
  const statusMessage = computed(() => {
    if (!tapeState.value.tape.length) {
      return 'Ingrese una cadena para comenzar'
    }
    if (tapeState.value.isHalted) {
      if (tapeState.value.isAccepted) {
        return '✓ Cadena ACEPTADA'
      } else {
        return '✗ Cadena RECHAZADA'
      }
    }
    return `Ejecutando - Estado: ${tapeState.value.currentState}`
  })

  return {
    tapeState,
    executionHistory,
    statusMessage,
    initializeTape,
    step,
    run,
    reset,
    findTransition,
  }
}
