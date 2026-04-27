<template>
  <TrendPopup
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :period="period"
    @update:period="$emit('update:period', $event)"
    title="Likes Insight"
    logo="https://i.ibb.co.com/rGSXLKX4/money.webp"
  >
    <div class="flex flex-col gap-4 p-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Media -->
        <div class="bg-light-bg-container p-6 rounded-md text-center border dark:bg-dark-bg-container dark:border-gray-700">
          <h3 class="text-gray-500 font-semibold mb-2">Media</h3>
          <span class="text-3xl font-bold">{{ insightData?.media ?? '--' }}</span>
        </div>
        <!-- Merch -->
        <div class="bg-light-bg-container p-6 rounded-md text-center border dark:bg-dark-bg-container dark:border-gray-700">
          <h3 class="text-gray-500 font-semibold mb-2">Merch</h3>
          <span class="text-3xl font-bold">{{ insightData?.merch ?? '--' }}</span>
        </div>
        <!-- Profile -->
        <div class="bg-light-bg-container p-6 rounded-md text-center border dark:bg-dark-bg-container dark:border-gray-700">
          <h3 class="text-gray-500 font-semibold mb-2">Profile</h3>
          <span class="text-3xl font-bold">{{ insightData?.profile ?? '--' }}</span>
        </div>
        <!-- Feed -->
        <div class="bg-light-bg-container p-6 rounded-md text-center border dark:bg-dark-bg-container dark:border-gray-700">
          <h3 class="text-gray-500 font-semibold mb-2">Feed</h3>
          <span class="text-3xl font-bold">{{ insightData?.feed ?? '--' }}</span>
        </div>
      </div>
    </div>
  </TrendPopup>
</template>

<script setup>
import TrendPopup from './TrendPopup.vue'

defineProps({
  modelValue: Boolean,
  period: String,
  insightData: Object
})

defineEmits(['update:modelValue', 'update:period'])
</script>
