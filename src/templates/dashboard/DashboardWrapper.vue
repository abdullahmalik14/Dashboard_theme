<template>
  <DashboardMainWrapperDesktop>
    <DashboardBaseContainerWrapper>
      <div class="dash bg-fade-lr">
        <!-- Sidebar -->
        <aside class="dash__sidebar">
          <DashboardSidebar />
        </aside>

        <!-- Header -->
        <header class="dash__header">
          <slot name="header">
            <DashboardHeader />
          </slot>
        </header>

        <!-- Main Content -->
        <section class="dash__main">
          <div class="w-full h-full">
            <router-view />
          </div>
        </section>

        <!-- Footer -->
        <slot name="footer">
          <DashboardFooter />
        </slot>
      </div>
    </DashboardBaseContainerWrapper>
  </DashboardMainWrapperDesktop>
</template>

<script setup lang="ts">
import DashboardMainWrapperDesktop from '@/components/layout/dashboard/DashboardMainWrapperDesktop.vue'
import DashboardBaseContainerWrapper from '@/components/layout/dashboard/DashboardBaseContainerWrapper.vue'
import DashboardSidebar from '@/templates/dashboard/DashboardSidebar.vue'
import DashboardFooter from './DashboardFooter.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>

<style scoped>
.dash {
  display: grid;
  grid-template-columns: 100px 1fr; /* Sidebar fixed, content flexible */
  grid-template-rows: auto 1fr auto; /* Header + main + footer */
  min-height: 100vh;
}

/* Sidebar spans all rows */
.dash__sidebar {
  grid-row: 1 / 4; /* poore rows cover kare */
  background-color: #fff;
  /* padding: 1rem; */
}

/* Header, Main, Footer sab column 2 mein jayenge */
.dash__header,
.dash__main,
.dash__footer {
  grid-column: 2 / 3; /* force into 2nd column */
}

/* Main ko stretch karna hoga */
.dash__main {
  width: 100%; /* full width */
  min-width: 0; /* grid overflow fix */
  height: 100%; /* jitni jagah available ho */
}
</style>
