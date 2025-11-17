<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  (e: 'initialize', input: string): void
  (e: 'step'): void
  (e: 'run'): void
  (e: 'reset'): void
}

const emit = defineEmits<Emits>()

const inputValue = ref('')
const isInitialized = ref(false)

function handleInitialize() {
  if (inputValue.value.trim()) {
    emit('initialize', inputValue.value)
    isInitialized.value = true
  }
}

function handleReset() {
  emit('reset')
  isInitialized.value = false
  inputValue.value = ''
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 space-y-4">
    <!-- Input para la cadena -->
    <div class="space-y-2">
      <label for="input-string" class="block text-sm font-medium text-gray-300">
        Cadena de entrada (PIN de 4 o 6 dígitos)
      </label>
      <div class="flex gap-2">
        <input
          id="input-string"
          v-model="inputValue"
          type="text"
          placeholder="Ej: 1234 o 567890"
          class="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
          :disabled="isInitialized"
          @keyup.enter="handleInitialize"
        />
        <button
          v-if="!isInitialized"
          @click="handleInitialize"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!inputValue.trim()"
        >
          Iniciar
        </button>
      </div>
      <p class="text-xs text-gray-500">
        Ingrese solo dígitos (0-9). El PIN debe tener exactamente 4 o 6 dígitos.
      </p>
    </div>

    <!-- Botones de control -->
    <div v-if="isInitialized" class="flex gap-2 flex-wrap">
      <button
        @click="emit('step')"
        class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
      >
        ▶ Paso
      </button>
      <button
        @click="emit('run')"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
      >
        ▶▶ Ejecutar Todo
      </button>
      <button
        @click="handleReset"
        class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
      >
        ↻ Reiniciar
      </button>
    </div>
  </div>
</template>
