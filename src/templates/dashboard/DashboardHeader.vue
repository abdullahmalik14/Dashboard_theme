<template>
  <header>
    
    <div class="">
      <slot name="desktop">
        <AnalyticsDashboardDesktopHeaderPart />
      </slot>
    </div>
  </header>
</template>

<script setup>
import AnalyticsDashboardDesktopHeaderPart from '@/components/ui/nav/AnalyticsDashboardDesktopHeaderPart.vue'
</script>