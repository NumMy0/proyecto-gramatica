<script setup lang="ts">
import type { TapeState } from '@/types/turingMachine'

interface Props {
  tapeState: TapeState
}

defineProps<Props>()
</script>

<template>
  <div class="w-full overflow-x-auto py-8">
    <div class="flex justify-center items-center gap-1 min-w-max px-4">
      <!-- Visualización de la cinta -->
      <div
        v-for="(symbol, index) in tapeState.tape"
        :key="index"
        class="relative flex items-center justify-center w-16 h-16 border-2 transition-all duration-300"
        :class="{
          'border-blue-500 bg-blue-500/20 scale-110': index === tapeState.headPosition,
          'border-gray-600 bg-gray-800': index !== tapeState.headPosition,
        }"
      >
        <!-- Símbolo en la celda -->
        <span
          class="text-2xl font-mono font-bold"
          :class="{
            'text-blue-300': index === tapeState.headPosition,
            'text-gray-400': index !== tapeState.headPosition,
          }"
        >
          {{ symbol }}
        </span>

        <!-- Indicador del cabezal -->
        <div
          v-if="index === tapeState.headPosition"
          class="absolute -top-8 flex flex-col items-center"
        >
          <div class="text-blue-400 text-2xl">▼</div>
          <div class="text-xs text-blue-400 font-semibold">HEAD</div>
        </div>

        <!-- Índice de la celda -->
        <div class="absolute -bottom-6 text-xs text-gray-500">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>
