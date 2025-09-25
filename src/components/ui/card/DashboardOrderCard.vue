<template>
  <div
    class="group/container relative flex flex-col flex-grow flex-shrink [flex-basis:auto] gap-4 p-4 rounded-sm min-w-0 min-h-0 [backdrop-filter:blur(25px)] bg-light-bg-container dark:bg-dark-bg-container"
  >
  

    <!-- dynamic content from parent -->
    <div class="flex flex-col flex-grow flex-shrink [flex-basis:auto] gap-4 min-w-0 min-h-0">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>
