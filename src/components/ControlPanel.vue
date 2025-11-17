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
  <div class="bg-onyx/50 border border-Taupe/30 rounded-lg p-6 space-y-4">
    <!-- Input para la cadena -->
    <div class="space-y-2">
      <label for="input-string" class="block text-sm font-medium text-AlabasterGrey">
        Cadena de entrada (PIN de 4 o 6 dígitos)
      </label>
      <div class="flex gap-2">
        <input
          id="input-string"
          v-model="inputValue"
          type="text"
          placeholder="Ej: 1234 o 567890"
          class="flex-1 px-4 py-2 bg-onyx border border-Taupe/50 rounded-lg text-AlabasterGrey placeholder-Taupe focus:outline-none focus:border-jungleTeal focus:ring-1 focus:ring-jungleTeal font-mono"
          :disabled="isInitialized"
          @keyup.enter="handleInitialize"
        />
        <button
          v-if="!isInitialized"
          @click="handleInitialize"
          class="px-6 py-2 bg-jungleTeal hover:bg-celadon text-onyx font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!inputValue.trim()"
        >
          Iniciar
        </button>
      </div>
      <p class="text-xs text-Taupe">
        Ingrese solo dígitos (0-9). El PIN debe tener exactamente 4 o 6 dígitos.
      </p>
    </div>

    <!-- Botones de control -->
    <div v-if="isInitialized" class="flex gap-2 flex-wrap">
      <button
        @click="emit('step')"
        class="px-4 py-2 bg-celadon hover:bg-celadon/80 text-onyx font-semibold rounded-lg transition-colors"
      >
        ▶ Paso
      </button>
      <button
        @click="emit('run')"
        class="px-4 py-2 bg-jungleTeal hover:bg-jungleTeal/80 text-AlabasterGrey font-semibold rounded-lg transition-colors"
      >
        ▶▶ Ejecutar Todo
      </button>
      <button
        @click="handleReset"
        class="px-4 py-2 bg-Taupe hover:bg-Taupe/80 text-AlabasterGrey font-semibold rounded-lg transition-colors"
      >
        ↻ Reiniciar
      </button>
    </div>
  </div>
</template>
