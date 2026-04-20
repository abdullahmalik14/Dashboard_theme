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

const topCountriesColumns = [
  { key: 'tags', label: 'Tags', basis: 'basis-1/2', grow: true, align: 'left' },
  { key: 'sales', label: 'Sales (USD)', basis: 'basis-1/2', grow: true, align: 'right' }
]

const topCountriesRows = [
  { id: 1, rank: 1, country: 'Hong Kong', sales: 'USD$ 512,345.99' },
  { id: 2, rank: 2, country: 'United States of America', sales: 'USD$ 412,345.99' },
  { id: 3, rank: 3, country: 'Singapore', sales: 'USD$ 312,345.99' },
  { id: 4, rank: 4, country: 'Australia', sales: 'USD$ 212,345.99' },
  { id: 5, rank: 5, country: 'Taiwan', sales: 'USD$ 112,345.99' },
  { id: 6, rank: 6, country: 'Hong Kong', sales: 'USD$ 92,345.99' },
  { id: 7, rank: 7, country: 'United States of America', sales: 'USD$ 72,345.99' },
  { id: 8, rank: 8, country: 'Singapore', sales: 'USD$ 52,345.99' },
  { id: 9, rank: 9, country: 'Australia', sales: 'USD$ 42,345.99' },
  { id: 10, rank: 10, country: 'Taiwan', sales: 'USD$ 12,345.99' }
]

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
