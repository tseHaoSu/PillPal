<script setup>
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})

</script>

<template>
  <Toaster />
    <RouterView />
</template>

