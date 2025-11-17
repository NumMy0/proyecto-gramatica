<script setup lang="ts">
import { ref } from 'vue'
import { useTuringMachine } from '@/composables/useTuringMachine'
import { pinMachineConfig } from '@/config/pinMachineConfig'
import TuringTape from './TuringTape.vue'
import StateIndicator from './StateIndicator.vue'
import ControlPanel from './ControlPanel.vue'

const { tapeState, statusMessage, initializeTape, step, run, reset } =
  useTuringMachine(pinMachineConfig)

const errorMessage = ref('')
const lastStepMessage = ref('')

function handleInitialize(input: string) {
  try {
    errorMessage.value = ''
    lastStepMessage.value = ''
    initializeTape(input)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Error al inicializar'
  }
}

function handleStep() {
  const result = step()
  lastStepMessage.value = result.message
  if (!result.success) {
    errorMessage.value = result.message
  } else {
    errorMessage.value = ''
  }
}

function handleRun() {
  const results = run()
  const lastResult = results[results.length - 1]
  lastStepMessage.value = `Ejecutado ${results.length} pasos`
  if (lastResult && !lastResult.success) {
    errorMessage.value = lastResult.message
  }
}

function handleReset() {
  reset()
  errorMessage.value = ''
  lastStepMessage.value = ''
}
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-6 space-y-8">
    <!-- Título -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold text-white">Simulador de Máquina de Turing</h1>
      <p class="text-gray-400">
        Validador de PINs de 4 o 6 dígitos - Regex: <code class="text-blue-400">\d{4}|\d{6}</code>
      </p>
    </div>

    <!-- Panel de Control -->
    <ControlPanel
      @initialize="handleInitialize"
      @step="handleStep"
      @run="handleRun"
      @reset="handleReset"
    />

    <!-- Mensajes de error -->
    <div
      v-if="errorMessage"
      class="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg"
    >
      {{ errorMessage }}
    </div>

    <!-- Estado de la máquina -->
    <div v-if="tapeState.tape.length > 0" class="space-y-6">
      <!-- Indicador de estado -->
      <StateIndicator
        :current-state="tapeState.currentState"
        :is-halted="tapeState.isHalted"
        :is-accepted="tapeState.isAccepted"
      />

      <!-- Mensaje de estado -->
      <div class="text-center">
        <p class="text-xl font-semibold text-gray-300">{{ statusMessage }}</p>
        <p v-if="lastStepMessage" class="text-sm text-gray-500 mt-1">
          {{ lastStepMessage }}
        </p>
        <p class="text-sm text-gray-500 mt-1">Pasos ejecutados: {{ tapeState.stepCount }}</p>
      </div>

      <!-- Cinta de Turing -->
      <div class="bg-gray-900 rounded-lg p-4">
        <h2 class="text-lg font-semibold text-gray-300 mb-4 text-center">Cinta</h2>
        <TuringTape :tape-state="tapeState" />
      </div>

      <!-- Información adicional -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div class="bg-gray-800 rounded-lg p-4">
          <p class="text-gray-400 mb-1">Posición del cabezal:</p>
          <p class="text-2xl font-bold text-blue-400">{{ tapeState.headPosition }}</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-4">
          <p class="text-gray-400 mb-1">Símbolo actual:</p>
          <p class="text-2xl font-bold text-blue-400 font-mono">
            {{ tapeState.tape[tapeState.headPosition] || '_' }}
          </p>
        </div>
        <div class="bg-gray-800 rounded-lg p-4">
          <p class="text-gray-400 mb-1">Longitud de entrada:</p>
          <p class="text-2xl font-bold text-blue-400">
            {{ tapeState.tape.filter((s) => s !== '_').length }}
          </p>
        </div>
      </div>
    </div>

    <!-- Instrucciones -->
    <div v-else class="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
      <h2 class="text-xl font-semibold text-white mb-3">Cómo usar el simulador</h2>
      <ol class="text-left max-w-2xl mx-auto space-y-2">
        <li>1. Ingrese un PIN de 4 o 6 dígitos en el campo de entrada</li>
        <li>2. Haga clic en "Iniciar" para cargar la cadena en la cinta</li>
        <li>3. Use "Paso" para ejecutar una transición a la vez</li>
        <li>4. Use "Ejecutar Todo" para completar la ejecución automáticamente</li>
        <li>5. La máquina aceptará solo PINs de exactamente 4 o 6 dígitos</li>
      </ol>
    </div>
  </div>
</template>
