<template>
  <TrendPopup
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Contributors Insight"
    logo="https://i.ibb.co.com/rGSXLKX4/money.webp"
  >
    <div class="flex flex-col gap-4">
      <!-- Top Contributors -->
      <div class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
        <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Top Contributors</h3>
        <div class="flex flex-col justify-center items-center gap-6 w-full py-12 text-center">
          <div class="relative flex justify-center items-center">
            <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32 object-contain" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to show at the moment</span>
            <a href="#" class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways to earn</a>
          </div>
        </div>
      </div>

      <!-- Top Fans -->
      <div class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
        <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Top Fans</h3>
        <div class="flex flex-col justify-center items-center gap-6 w-full py-12 text-center">
          <div class="relative flex justify-center items-center">
            <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32 object-contain" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to show at the moment</span>
            <a href="#" class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways to earn</a>
          </div>
        </div>
      </div>

      <!-- Top Order Spenders -->
      <div class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
        <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Top Order Spenders</h3>
        <div class="flex flex-col justify-center items-center gap-6 w-full py-12 text-center">
          <div class="relative flex justify-center items-center">
            <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32 object-contain" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to show at the moment</span>
            <a href="#" class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways to earn</a>
          </div>
        </div>
      </div>
    </div>
  </TrendPopup>
</template>

<script setup>
import TrendPopup from './TrendPopup.vue'

defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>
