<template>
  <div class="two-col-inner bg-[#ae969680] p-6 rounded-lg shadow ">
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


