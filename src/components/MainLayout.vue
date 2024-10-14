<template>
  <div class="flex h-screen">
    <SideNavigation />
    <div class="flex-1 bg-white p-6 overflow-auto">
      <h1 class="text-2xl font-bold mb-6 flex items-center">
        {{ title }}
        <component :is="icon" class="ml-2 h-6 w-6" />
      </h1>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import SideNavigation from '@/components/SideNavigation.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  }
})
</script>