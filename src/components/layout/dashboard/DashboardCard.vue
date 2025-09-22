<template>
  <div
    class="group/container relative flex flex-col flex-grow flex-shrink [flex-basis:auto] gap-4 p-4 rounded-sm min-w-0 min-h-0 [backdrop-filter:blur(25px)] bg-light-bg-container dark:bg-dark-bg-container"
  >
    <!-- hover overlay (optional, toggle via prop) -->
    <div
      v-if="showOverlay"
      class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
    >
      <button
        class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
      >
        <span
          class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
        >
          Trend
        </span>
        <span>
          <img
            src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
            alt="expand"
            class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
          />
        </span>
      </button>
    </div>

    <!-- dynamic content from parent -->
    <div class="flex flex-col flex-grow flex-shrink [flex-basis:auto] gap-4 min-w-0 min-h-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showOverlay: {
    type: Boolean,
    default: true,
  },
})
</script>
