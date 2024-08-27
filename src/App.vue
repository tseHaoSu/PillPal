<script setup>
// import JSON from './components/JSON.vue'
import BHeader from "./components/NavigationBar.vue";
import MenuBar from './components/MenuBar.vue';
</script>

<template>
  <header>
    <MenuBar />
  </header>
  <!-- <JSON/> -->

  <main class="main-box">
    <router-view></router-view>
    <!-- <LoginForm /> -->
  </main>
</template>

<!-- <style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.card-padding {
  padding: 1rem;
}

.spaced-text {
  min-height: 60px; /* Adjust as needed */
  min-width: 20px; /* Adjust as needed */
}

body {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style> -->
