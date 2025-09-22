<template>
  <DashboardTwoColContainerWrapper>
    <DashboardTwoColInnerContainerWrapper>
      <!-- your orders body goes here (table/cards/etc) -->
      <slot />
    </DashboardTwoColInnerContainerWrapper>
  </DashboardTwoColContainerWrapper>
</template>

<script setup lang="ts">
import DashboardTwoColContainerWrapper from '@/components/layout/dashboard/DashboardTwoColContainerWrapper.vue'
import DashboardTwoColInnerContainerWrapper from '@/components/layout/dashboard/DashboardTwoColInnerContainerWrapper.vue'
</script>