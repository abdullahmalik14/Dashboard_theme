<template>
  <!-- white-card-column-container (media) -->
  <div class="col-span-full xl:col-span-2 gap-4 w-full order-0 flex flex-col">
    <!-- white-card -->
    <DashboardTrendCard>
      <!-- tabs-container -->
      <div
        class="w-full px-4 flex justify-between flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4">
        <!-- title -->
        <div class="flex items-center gap-2">
          <h3 class="text-slate-700 m-0 leading-6 text-base font-medium font-['Poppins']">
            Top Media
          </h3>
        </div>

        <!-- tabs-button-group -->
        <div
          class="flex w-full sm:w-auto bg-white/30 rounded-lg justify-start items-start overflow-hidden border border-gray-200 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <div v-for="tab in topMediaTabs" :key="tab" @click="selectedTopMediaTab = tab" :class="[
            'flex-1 sm:flex-initial whitespace-nowrap cursor-pointer h-full px-4 py-2 flex justify-center items-center gap-2 transition-all font-[\'Poppins\'] text-sm outline-none border-r border-gray-200 last:border-r-0',
            selectedTopMediaTab === tab ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-500 font-medium hover:bg-gray-50'
          ]">
            {{ tab }}
          </div>
        </div>
      </div>

      <!-- tabs-content -->
      <div v-if="(selectedTopMediaTab === 'Views' ? topMediaRows : p2vSalesRows).length > 0"
        class="w-full flex-1 pt-4">
        <FlexTable :columns="selectedTopMediaTab === 'Views' ? topMediaColumns : p2vSalesColumns"
          :rows="selectedTopMediaTab === 'Views' ? topMediaRows : p2vSalesRows" :theme="topMediaTheme">
          <template #cell.media="{ row }">
            <div class="flex items-center gap-3 h-full">
              <div class="relative w-[3.5rem] sm:w-[5rem] h-[6rem] flex-shrink-0 -my-2 -ml-2.5">
                <img :src="row.image" alt="media" class="w-full h-full object-cover">
                <div class="w-5 h-5 left-0 top-0 absolute bg-black flex justify-center items-center">
                  <span class="text-white text-xs font-bold font-['Poppins'] leading-5">{{ row.rank }}</span>
                </div>
              </div>
              <div class="text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2 md:line-clamp-3">
                {{ row.title }}
              </div>
            </div>
          </template>
          <template #cell.clicks="{ row }">
            <div class="text-center w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4">
              {{ row.clicks }}
            </div>
          </template>
          <template #cell.duration="{ row }">
            <div class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4">
              {{ row.duration }}
            </div>
          </template>
          <template #cell.sales_count="{ row }">
            <div
              class="text-center w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
              {{ row.sales_count }}
            </div>
          </template>
          <template #cell.sales_usd="{ row }">
            <div
              class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
              {{ row.sales_usd }}
            </div>
          </template>
        </FlexTable>
      </div>
      <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
        alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
    </DashboardTrendCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardTrendCard from '@/components/ui/card/DashboardTrendCard.vue'
import DashboardTrendContent from '@/components/ui/content/DashboardTrendContent.vue'
import FlexTable from '@/components/ui/tables/FlexTable.vue'

const topMediaTabs = ['Views', 'P2V Sales']
const selectedTopMediaTab = ref('Views')

const topMediaColumns = [
  { key: 'media', label: 'Media', basis: 'basis-1/3', grow: true, align: 'left' },
  { key: 'clicks', label: '# of Clicks', basis: 'basis-1/3', grow: true, align: 'center' },
  { key: 'duration', label: 'Watch Duration', basis: 'basis-1/3', grow: true, align: 'right' }
]

const p2vSalesColumns = [
  { key: 'media', label: 'Media', basis: 'basis-1/3', grow: true, align: 'left' },
  { key: 'sales_count', label: '# of Sales', basis: 'basis-1/3', grow: true, align: 'center' },
  { key: 'sales_usd', label: 'Sales(USD)', basis: 'basis-1/3', grow: true, align: 'right' }
]

const topMediaRows = [
  { id: 1, rank: 1, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 2, rank: 2, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 3, rank: 3, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 4, rank: 4, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 5, rank: 5, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' }
]

const p2vSalesRows = [
  { id: 1, rank: 1, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 5123.45', image: '/images/profile-thumbnail.png' },
  { id: 2, rank: 2, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 4123.45', image: '/images/profile-thumbnail.png' },
  { id: 3, rank: 3, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 3123.45', image: '/images/profile-thumbnail.png' },
  { id: 4, rank: 4, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 2123.45', image: '/images/profile-thumbnail.png' },
  { id: 5, rank: 5, title: 'Record breaking fried chicken eating ! See my attempt to break world\u2019s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 1123.45', image: '/images/profile-thumbnail.png' }
]

const topMediaTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500',
  headerCell: 'px-2.5 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[6rem] odd:bg-transparent even:bg-gray-100/50 ',
  cell: 'px-2.5 py-2 flex items-center h-full',
  footer: 'hidden'
}
</script>
