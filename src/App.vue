<template>
  <div id="app" class="font-sans">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardAnalytics } from './store/DashboardAnalytics'

const store = useDashboardAnalytics()
window.store = store 
const { earnings } = storeToRefs(store)

onMounted(async () => {
  try {
    await store.loadAnalytics()
    console.log('Store loaded:', earnings.value)
  } catch (error) {
    console.error('Failed to load analytics:', error)
  }
})
</script>