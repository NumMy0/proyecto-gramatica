/**
 * Configuración de la Máquina de Turing para validar PINs de 4 o 6 dígitos
 * Regex: \d{4}|\d{6}
 */

import type { TuringMachineConfig, Transition } from '@/types/turingMachine'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const BLANK = '_'

/**
 * Genera transiciones para todos los dígitos desde un estado a otro
 */
function createDigitTransitions(
  fromState: string,
  toState: string,
  direction: 'R' | 'S',
  comment: string,
): Transition[] {
  return DIGITS.map((digit) => ({
    currentState: fromState,
    readSymbol: digit,
    writeSymbol: digit, // Nunca modificamos el símbolo
    direction,
    nextState: toState,
    comment: `${comment} (${digit})`,
  }))
}

/**
 * Configuración completa de la MT para validar PINs
 */
export const pinMachineConfig: TuringMachineConfig = {
  states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q_accept', 'q_reject'],
  inputAlphabet: DIGITS,
  tapeAlphabet: [...DIGITS, BLANK],
  initialState: 'q0',
  acceptState: 'q_accept',
  rejectState: 'q_reject',
  blankSymbol: BLANK,
  transitions: [
    // Desde q0 - primer dígito
    ...createDigitTransitions('q0', 'q1', 'R', 'Primer dígito'),
    {
      currentState: 'q0',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Cadena vacía',
    },

    // Desde q1 - segundo dígito
    ...createDigitTransitions('q1', 'q2', 'R', 'Segundo dígito'),
    {
      currentState: 'q1',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Solo 1 dígito',
    },

    // Desde q2 - tercer dígito
    ...createDigitTransitions('q2', 'q3', 'R', 'Tercer dígito'),
    {
      currentState: 'q2',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Solo 2 dígitos',
    },

    // Desde q3 - cuarto dígito
    ...createDigitTransitions('q3', 'q4', 'R', 'Cuarto dígito'),
    {
      currentState: 'q3',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Solo 3 dígitos',
    },

    // Desde q4 - estado de aceptación para 4 dígitos o continuar a 6
    ...createDigitTransitions('q4', 'q5', 'R', 'Quinto dígito (buscando 6)'),
    {
      currentState: 'q4',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_accept',
      comment: 'PIN de 4 dígitos válido ✓',
    },

    // Desde q5 - quinto dígito
    ...createDigitTransitions('q5', 'q6', 'R', 'Sexto dígito'),
    {
      currentState: 'q5',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Solo 5 dígitos',
    },

    // Desde q6 - estado de aceptación para 6 dígitos
    ...createDigitTransitions('q6', 'q_reject', 'R', 'Más de 6 dígitos'),
    {
      currentState: 'q6',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_accept',
      comment: 'PIN de 6 dígitos válido ✓',
    },

    // Estados finales (permanecen en sí mismos)
    {
      currentState: 'q_accept',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_accept',
      comment: 'Estado final de aceptación',
    },
    {
      currentState: 'q_reject',
      readSymbol: BLANK,
      writeSymbol: BLANK,
      direction: 'S',
      nextState: 'q_reject',
      comment: 'Estado final de rechazo',
    },
  ],
}
