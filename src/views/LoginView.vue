<template>
      <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2">Username</label>
        <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" placeholder="Password" class="w-full mb-3" />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox id="rememberme1" :binary="true" v-model="checked1" class="mr-2"></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

// export default {
//     name: 'Login',
//     // Your component logic goes here
// }
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes full viewport height */
  background-color: #f0f0f0; /* Optional: add a background color */
}

body {
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>