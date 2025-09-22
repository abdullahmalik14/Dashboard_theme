<template>
  <div
    class="flex flex-col gap-6 [backdrop-filter:blur(25px)] bg-light-bg-section [box-shadow:0px_4px_6px_-2px_rgba(16,_24,_40,_0.08)] dark:bg-dark-bg-section dark:[box-shadow:0px_4px_6px_-2px_rgba(13,_19,_32,_0.08)]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<!-- <template>
  <div :class="['inner-container', customClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.inner-container {
  padding: 1rem;
  background-color: #f7fafc; /* light gray background */
  border: 1px solid #e2e8f0; /* light border */
}
</style> -->
