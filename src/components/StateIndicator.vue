<script setup lang="ts">
interface Props {
  currentState: string
  isHalted: boolean
  isAccepted: boolean | null
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <!-- Estado actual -->
    <div class="flex flex-col items-center">
      <span class="text-sm text-gray-400 mb-2">Estado Actual</span>
      <div
        class="px-6 py-3 rounded-lg font-mono text-xl font-bold transition-all duration-300"
        :class="{
          'bg-green-500/20 text-green-400 border-2 border-green-500': isHalted && isAccepted,
          'bg-red-500/20 text-red-400 border-2 border-red-500': isHalted && isAccepted === false,
          'bg-blue-500/20 text-blue-400 border-2 border-blue-500': !isHalted,
        }"
      >
        {{ currentState }}
      </div>
    </div>

    <!-- Indicador de estado -->
    <div v-if="isHalted" class="flex items-center gap-2">
      <div
        class="w-3 h-3 rounded-full animate-pulse"
        :class="{
          'bg-green-500': isAccepted,
          'bg-red-500': !isAccepted,
        }"
      ></div>
      <span
        class="font-semibold"
        :class="{
          'text-green-400': isAccepted,
          'text-red-400': !isAccepted,
        }"
      >
        {{ isAccepted ? 'ACEPTADO' : 'RECHAZADO' }}
      </span>
    </div>
    <div v-else class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
      <span class="text-blue-400 font-semibold">EN EJECUCIÓN</span>
    </div>
  </div>
</template>
