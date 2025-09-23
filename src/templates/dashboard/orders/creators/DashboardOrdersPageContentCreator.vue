<template>
  <DashboardOverviewMainSectionWrapper>
      <!-- your orders body goes here (table/cards/etc) -->
      <slot />
  </DashboardOverviewMainSectionWrapper>
</template>

<script setup>
import DashboardOverviewMainSectionWrapper from '@/components/layout/dashboard/DashboardOverviewMainSectionWrapper.vue'
</script>