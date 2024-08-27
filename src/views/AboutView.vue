<template>
  <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5"></div>
  <div class="about">
    <h1>About Our Library</h1>
    <p>
      Welcome to our digital library! We're dedicated to providing a vast
      collection of books and resources to our community.
    </p>
    <div class="text-center mb-5"></div>
    <div class="text-900 text-3xl font-medium mb-3">Login</div>
    <span class="text-600 font-medium line-height-3">
      Don't have an account?
    </span>
    <router-link to="/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
      Create today!
    </router-link>
    </div>
    </div>
  </div>
  
  
</template>

<script setup>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes full viewport height */
  background-color: #f0f0f0; /* Optional: add a background color */
}
</style>
