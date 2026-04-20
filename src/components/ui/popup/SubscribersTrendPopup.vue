<template>
  <TrendPopup
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :period="period"
    @update:period="$emit('update:period', $event)"
    title="Subscriptions Insight"
    logo="https://i.ibb.co.com/MyhfGRNH/svgviewer-png-output-12.webp"
  >
    <div class="flex flex-col gap-4">
      <!-- row: stats -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- New Subscribers -->
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem]  bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
            New Subscribers
          </h3>
          <div class="flex flex-col justify-center items-center gap-4">
            <span class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
              {{ insightData?.new ? insightData.new.toLocaleString() : '--' }}
            </span>
            <div class="inline-flex items-center gap-2">
              <div class="w-14 flex justify-center items-center gap-1">
                <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up" class="h-5 w-5" />
                <div class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">20%</div>
              </div>
              <div class="text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(period) }}</div>
            </div>
          </div>
        </div>

        <!-- Recurring Subscribers -->
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
            Recurring Subscribers
          </h3>
          <div class="flex flex-col justify-center items-center gap-4">
            <span class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
              {{ insightData?.recurring ? insightData.recurring.toLocaleString() : '--' }}
            </span>
            <div class="inline-flex items-center gap-2">
              <div class="w-14 flex justify-center items-center gap-1">
                <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up" class="h-5 w-5" />
                <div class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">20%</div>
              </div>
              <div class="text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(period) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- row: charts -->
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Subscriptions Insight -->
        <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
          <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">Subscriptions Insight</h3>
          <div class="flex flex-col justify-center items-center gap-6 h-full text-center">
            <div class="relative flex justify-center items-center ">
              <img src="/images/noTrendImg.png" alt="illustration" class="w-32 h-32 object-contain" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary">No trend to show at the moment</span>
              <a href="#" class="text-sm text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways to earn</a>
            </div>
          </div>
        </div>

        <!-- Tiers Breakdown -->
        <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
          <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">Tiers Breakdown</h3>
          <div class="flex flex-col justify-center items-center gap-6 h-full text-center">
            <div class="relative flex justify-center items-center ">
              <img src="/images/noTrendImg.png" alt="illustration" class="w-32 h-32 object-contain" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary">No trend to show at the moment</span>
              <a href="#" class="text-sm text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways to earn</a>
            </div>
          </div>
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

function getVsLabel(period) {
  switch ((period || '').toLowerCase()) {
    case 'daily': return 'vs last 24 hour'
    case 'weekly': return 'vs last week'
    case 'monthly': return 'vs last 30 days'
    case 'yearly': return 'vs last year'
    default: return 'vs last year'
  }
}
</script>
