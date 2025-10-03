<template>
  <DashboardMainWrapperDesktop>
    <DashboardBaseContainerWrapper>
      <div 
       style="
    background-image: url('https://dd9wrrdfti3m1.cloudfront.net/dev/images/dash/background-gradient.svg');
    background-size: cover;
    background-repeat: no-repeat;
  "
        class="grid min-h-screen grid-cols-1 md:grid-cols-[100px_1fr] grid-rows-[auto_1fr_auto]"
      >
        <!-- Sidebar -->
        <aside class="hidden md:block row-span-3 bg-white">
          <DashboardSidebar />
        </aside>

        <!-- Header -->
        <header class="col-span-1 md:col-start-2">
          <slot name="header">
            <DashboardHeader />
          </slot>
        </header>

        <!-- Main Content -->
        <section class="col-span-1 md:col-start-2 w-full h-full min-w-0">
          <router-view />
        </section>

        <!-- Footer -->
        <footer class="col-span-1 md:col-start-2">
          <slot name="footer">
            <DashboardFooter />
          </slot>
        </footer>
      </div>
    </DashboardBaseContainerWrapper>
  </DashboardMainWrapperDesktop>
</template>

<script setup>
import DashboardMainWrapperDesktop from '@/components/layout/dashboard/DashboardMainWrapperDesktop.vue'
import DashboardBaseContainerWrapper from '@/components/layout/dashboard/DashboardBaseContainerWrapper.vue'
import DashboardSidebar from '@/templates/dashboard/DashboardSidebar.vue'
import DashboardFooter from './DashboardFooter.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>
