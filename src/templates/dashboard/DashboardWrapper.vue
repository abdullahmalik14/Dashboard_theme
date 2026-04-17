<template>
  <DashboardMainWrapperDesktop>
    <DashboardBaseContainerWrapper>
      <div 
   class="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] w-full flex-1 bg-[#F9FAFBE5] min-h-screen md:bg-transparent md:h-auto dark:bg-background-dark-app before:content-[''] 
        before:fixed before:bg-[url('https://i.ibb.co.com/dw910Z5b/gradient-main-bg.webp')]
         before:bg-cover before:w-full before:bg-no-repeat before:h-full 
         before:left-0 before:top-0 before:pointer-events-none md:p-[40px]">


        <!-- Header -->
        <header class="w-full">
          <slot name="header">
            <DashboardHeader />
          </slot>
        </header>

        <!-- Main Content -->
        <section class="w-full h-full min-w-0">
          <router-view />
        </section>

  
      </div>
    </DashboardBaseContainerWrapper>
  </DashboardMainWrapperDesktop>
</template>

<script setup>
import DashboardMainWrapperDesktop from '@/components/layout/dashboard/DashboardMainWrapperDesktop.vue'
import DashboardBaseContainerWrapper from '@/components/layout/dashboard/DashboardBaseContainerWrapper.vue'

import DashboardHeader from './DashboardHeader.vue'
</script>
