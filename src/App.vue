<script setup>
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <header>
    <MenuBar />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>


