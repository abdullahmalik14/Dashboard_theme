<template>
  <header>
    
    <div class="">
      <slot name="desktop">
        <DashboardDesktopHeaderPart />
      </slot>
    </div>
  </header>
</template>

<script setup>
import DashboardMobileHeaderPart from '@/components/layout/dashboard/DashboardMobileHeaderPart.vue'
import DashboardDesktopHeaderPart from '@/components/ui/nav/DashboardDesktopHeaderPart.vue'
</script>