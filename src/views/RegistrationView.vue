<template>
  <div id="container-register">
    <div class="surface-card p-6 shadow-3 border-round w-full lg:w-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-primary mb-2">Create Account</h1>
        <p class="text-600 font-medium">
          Already have an account?
          <router-link
            to="/"
            class="font-bold text-primary-600 hover:underline"
          >
            Log in here!
          </router-link>
        </p>
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
        <div class="flex align-items-center mb-6">
          <Checkbox
            id="terms"
            :binary="true"
            v-model="acceptTerms"
            class="mr-2"
          />
          <label for="terms" class="font-medium"
            >I accept the terms and conditions</label
          >
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="p-button p-component w-full text-xl font-bold p-3"
        >
          <span class="p-button-icon pi pi-user-plus mr-2"></span>
          <span class="p-button-label">Register</span>
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
      if (
        !username.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
      ) {
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
      console.log("User registered:", {
        username: username.value,
        email: email.value,
      });

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

<style scoped>
#container-register {
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
