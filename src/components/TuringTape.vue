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
          'border-jungleTeal bg-jungleTeal/20 scale-110': index === tapeState.headPosition,
          'border-Taupe/50 bg-onyx': index !== tapeState.headPosition,
        }"
      >
        <!-- Símbolo en la celda -->
        <span
          class="text-2xl font-mono font-bold"
          :class="{
            'text-celadon': index === tapeState.headPosition,
            'text-AlabasterGrey/70': index !== tapeState.headPosition,
          }"
        >
          {{ symbol }}
        </span>

        <!-- Indicador del cabezal -->
        <div
          v-if="index === tapeState.headPosition"
          class="absolute -top-8 flex flex-col items-center"
        >
          <div class="text-celadon text-2xl">▼</div>
          <div class="text-xs text-jungleTeal font-semibold">HEAD</div>
        </div>

        <!-- Índice de la celda -->
        <div class="absolute -bottom-6 text-xs text-Taupe">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>
