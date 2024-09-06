<template>
    <div class="flex flex-col min-h-screen">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <!-- Mobile menu button -->
      <button @click="toggleMenu" class="lg:hidden">
        <MenuIcon class="h-6 w-6" />
        <span class="sr-only">Toggle navigation menu</span>
      </button>

      <!-- Logo -->
      <router-link to="/" class="ml-4 lg:ml-0 flex items-center justify-center">
        <MountainIcon class="h-6 w-6" />
        <span class="sr-only">Acme Inc</span>
      </router-link>

      <!-- Desktop navigation -->
      <nav class="mx-6 flex items-center space-x-4 lg:space-x-6 hidden lg:block">
        <router-link
          v-for="item in navItems"
          :key="item"
          :to="item.toLowerCase()"
          class="text-sm font-medium hover:underline underline-offset-4"
        >
          {{ item }}
        </router-link>
      </nav>

      <!-- Auth buttons -->
      <div class="ml-auto flex items-center space-x-4">
        <button class="text-sm">Log in</button>
        <button class="text-sm bg-primary text-white px-3 py-2 rounded">
          Register
        </button>
      </div>
    </header>

    <!-- Rest of the component -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MountainIcon, MenuIcon } from '@/components/icons'

const isMenuOpen = ref(false)
const navItems = ['Home', 'Features', 'Pricing', 'About', 'Contact']

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>