<template>
  <div id="container-login">
    <div class="surface-card p-6 shadow-3 border-round w-full lg:w-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
        <p class="text-600 font-medium">
          Don't have an account?
          <router-link
            to="/register"
            class="font-bold text-primary-600 hover:underline"
          >
            Create one today!
          </router-link>
        </p>
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
            <label for="rememberme" class="font-medium">Remember me</label>
          </div>
          <a class="font-bold text-primary-600 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="p-button p-component w-full text-xl font-bold p-3"
        >
          <span class="p-button-icon pi pi-user mr-2"></span>
          <span class="p-button-label">Login</span>
        </button>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 mt-4 font-medium">{{ error }}</p>
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
#container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.surface-card {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.text-primary {
  color: #3b82f6;
}

.text-primary-600 {
  color: #2563eb;
}

.p-button {
  background-color: #3b82f6;
  border-color: #3b82f6;
  transition: all 0.3s ease;
}

.p-button:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.p-inputtext:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
</style>
