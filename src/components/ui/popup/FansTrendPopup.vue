<template>
  <TrendPopup :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :period="period"
    @update:period="$emit('update:period', $event)" title="Fans Insight"
    logo="https://i.ibb.co.com/rGSXLKX4/money.webp">
    <div class="flex flex-col gap-4">
      <!-- row: stats -->
      <div class="grid grid-cols-2">
        <!-- New Followers -->
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">New
            Followers</h3>
          <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
              {{ insightData?.newFollowers != null ? insightData.newFollowers.toLocaleString() : '--' }}
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

        <!-- Total Profile Visit -->
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">Total
            Profile Visit</h3>
          <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
              {{ insightData?.profileVisit != null ? insightData.profileVisit.toLocaleString() : '--' }}
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
        <!-- Traffic Source -->
        <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Traffic Source</h3>
          </div>
          <div class="flex flex-col justify-center items-center gap-6 h-full text-center">
            <div class="flex justify-center items-center backdrop-blur-[50px] ">
              <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart"
                class="w-32 h-32 opacity-40 object-contain" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-500 font-medium">Chart Visualization</span>
              <span class="text-xs text-gray-400">Detailed source breakdown will appear here</span>
            </div>
          </div>
        </div>

        <!-- Top Countries -->
        <div
          class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container overflow-hidden">
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Top Countries</h3>
          </div>

          <div v-if="insightData?.topCountries?.length > 0" class="w-full h-full overflow-hidden">
            <FlexTable :columns="fansTopCountriesColumns" :rows="insightData.topCountries"
              :theme="fansTopCountriesTheme">
              <template #cell.media="{ row }">
                <div class="flex items-center gap-3 w-full px-3">
                  <div class="w-8 h-8 rounded-sm bg-black flex justify-center items-center shrink-0">
                    <span class="text-white text-xs font-semibold">{{ row.rank }}</span>
                  </div>
                  <span class="flex-1 text-gray-900 text-sm font-normal truncate">{{ row.country }}</span>
                </div>
              </template>
              <template #cell.visits="{ value }">
                <div class="flex justify-end items-center px-3 w-full">
                  <span class="text-gray-900 text-sm font-medium">{{ value }}</span>
                </div>
              </template>
            </FlexTable>
          </div>

          <div v-else class="flex flex-col justify-center items-center gap-6 h-full text-center py-6">
            <div class="relative flex justify-center items-center">
              <img src="/images/noTrendImg.png" alt="illustration" class="w-32 h-32 object-contain" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary">No trend to
                show at the
                moment</span>
              <a href="#" class="text-xs text-light-text-secondary dark:text-dark-text-secondary underline">Learn ways
                to earn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TrendPopup>
</template>

<script setup>
import TrendPopup from './TrendPopup.vue'
import FlexTable from '../tables/FlexTable.vue'

defineProps({
  modelValue: Boolean,
  period: String,
  insightData: Object
})

defineEmits(['update:modelValue', 'update:period'])

const fansTopCountriesColumns = [
  { key: 'media', label: 'Countries', grow: true, align: 'left' },
  { key: 'visits', label: 'Profile Visits', basis: 'basis-32', align: 'right' }
]

const fansTopCountriesTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-slate-600',
  headerRow: 'flex items-center',
  headerCell: 'px-3 py-3 text-xs font-medium border-b border-gray-500',
  row: 'flex items-center h-10 odd:bg-transparent even:bg-gray-100/80 transition-colors',
  cell: 'flex items-center h-10',
  footer: 'hidden'
}

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
