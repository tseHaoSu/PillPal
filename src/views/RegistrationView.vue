<template>
  <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Register</div>
        <span class="text-600 font-medium line-height-3">
          Already have an account?
        </span>
        <router-link to="/" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
      Log in here!
    </router-link>
      </div>

      <form @submit.prevent="handleRegister">
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

        <!-- Email Field -->
        <div class="mb-3">
          <label for="email" class="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
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

        <!-- Confirm Password Field -->
        <div class="mb-3">
          <label for="confirmPassword" class="block text-900 font-medium mb-2">
            Confirm Password
          </label>
          <InputText
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="w-full"
            required
          />
        </div>

        <!-- Terms and Conditions -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="terms"
              :binary="true"
              v-model="acceptTerms"
              class="mr-2"
            />
            <label for="terms">I accept the terms and conditions</label>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="p-button p-component w-full">
          <span class="p-button-icon pi pi-user-plus"></span>
          <span class="p-button-label">Register</span>
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
import Checkbox from "primevue/checkbox";

export default {
  components: {
    InputText,
    Checkbox,
  },
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const acceptTerms = ref(false);
    const error = ref("");

    const handleRegister = () => {
      // Basic validation logic for registration
      if (!username.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = "All fields are required.";
        return;
      }

      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match.";
        return;
      }

      if (!acceptTerms.value) {
        error.value = "You must accept the terms and conditions.";
        return;
      }

      // Clear error and proceed with registration logic
      error.value = "";
      console.log("User registered:", { username: username.value, email: email.value });

      // Implement actual registration logic here (e.g., API call)
    };

    const redirectToLogin = () => {
      // Implement redirection logic to the login page
      console.log("Redirecting to login page...");
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      acceptTerms,
      error,
      handleRegister,
      redirectToLogin,
    };
  },
};
</script>