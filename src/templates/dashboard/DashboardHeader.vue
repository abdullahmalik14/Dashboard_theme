<template>
  <header class="dashboard-header">
    <div class="block md:hidden">
      <slot name="mobile">
        <DashboardMobileHeaderPart />
      </slot>
    </div>
    <div class="hidden md:block">
      <slot name="desktop">
        <DashboardDesktopHeaderPart />
      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import DashboardMobileHeaderPart from '@/components/layout/dashboard/DashboardMobileHeaderPart.vue'
import DashboardDesktopHeaderPart from '@/components/layout/dashboard/DashboardDesktopHeaderPart.vue'
</script>