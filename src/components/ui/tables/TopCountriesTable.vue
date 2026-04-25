<template>
  <!-- white-card-column-container (countries) -->
  <div class="fourth-white-card-column w-full gap-4 order-3 flex flex-col">
    <!-- white-card -->
    <DashboardTrendCard>
      <!-- tabs-container -->
      <div>
        <!-- title -->
        <div class="flex items-center justify-between gap-2 px-[16px]">
          <h3 class="text-light-text-secondary dark:text-dark-text-secondary m-0 leading-6 text-base font-medium">
            Top Countries
          </h3>
        </div>
      </div>

      <!-- table-content -->
      <div v-if="topCountriesRows && topCountriesRows.length > 0" class="w-full flex-1 pt-4">
        <FlexTable :columns="topCountriesColumns" :rows="topCountriesRows" :theme="topCountriesTheme">
          <!-- tags column -->
          <template #cell.tags="{ row }">
            <div class="flex justify-start items-center gap-2.5 h-full w-full sm:px-1">
              <div class="w-5 h-5 bg-black flex justify-center items-center shrink-0">
                <span class="text-white text-sm font-bold font-['Poppins']">{{ row.rank }}</span>
              </div>
              <div class="flex-1 text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2">
                {{ row.country }}
              </div>
            </div>
          </template>

          <!-- sales column -->
          <template #cell.sales="{ row }">
            <div
              class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
              {{ row.sales }}
            </div>
          </template>
        </FlexTable>
      </div>
      <!-- empty-state -->
      <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
        alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
    </DashboardTrendCard>
  </div>
</template>

<script setup>
import DashboardTrendCard from '@/components/ui/card/DashboardTrendCard.vue'
import DashboardTrendContent from '@/components/ui/content/DashboardTrendContent.vue'
import FlexTable from '@/components/ui/tables/FlexTable.vue'

import { computed } from 'vue'
import { useDashboardAnalytics } from '@/store/DashboardAnalytics'

const props = defineProps({
  period: { type: String, default: 'daily' }
})
const store = useDashboardAnalytics()

const topCountriesColumns = [
  { key: 'tags', label: 'Tags', basis: 'basis-1/2', grow: true, align: 'left' },
  { key: 'sales', label: 'Sales (USD)', basis: 'basis-1/2', grow: true, align: 'right' }
]

const topCountriesRows = computed(() => {
  const data = store.trendingCountries?.[props.period] || [];
  return data.map((item, index) => ({
    id: index,
    rank: item.rank,
    country: item.country,
    sales: `USD$ ${item.salesUSD || item.sales_usd || 0}`
  }));
});

const topCountriesTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500 w-full',
  headerCell: 'px-3 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[3rem] odd:bg-transparent even:bg-gray-100/50 hover:bg-gray-50 transition-colors w-full',
  cell: 'px-3 py-2 flex items-center h-full',
  footer: 'hidden'
}
</script>
