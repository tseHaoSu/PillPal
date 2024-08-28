<template>
  <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Login</div>
        <span class="text-600 font-medium line-height-3">
          Don't have an account?
        </span>
        <router-link
          to="/register"
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
        >
          Create today!
        </router-link>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- Username Field -->
        <div class="mb-3">
          <label for="username" class="block text-900 font-medium mb-2">
            Username
          </label>
          <InputText
            id="username"
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="mb-3">
          <label for="password" class="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full"
            required
          />
        </div>

        <!-- Remember Me and Forgot Password -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme"
              :binary="true"
              v-model="rememberMe"
              class="mr-2"
            />
            <label for="rememberme">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >
            Forgot password?
          </a>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="p-button p-component w-full">
          <span class="p-button-icon pi pi-user"></span>
          <span class="p-button-label">Login</span>
        </button>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

export default {
  components: {
    InputText,
    Button,
    Checkbox,
  },

  data() {
    return {
      rememberMe: false,
    };
  },
  name: "LoginView",
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const rememberMe = ref(false);

    const handleLogin = () => {
      if (username.value === "admin" && password.value === "password") {
        // Hardcoded credentials
        localStorage.setItem("isAuthenticated", "true"); // Store authentication state
        error.value = "";
        // Navigate to the home page
        window.location.href = "/home";
      } else {
        window.location.href = "/access-denied";
      }
    };

    return {
      username,
      password,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 50px;
}

.btn {
  margin-top: 10px;
}
</style>
