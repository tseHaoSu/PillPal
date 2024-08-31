<template>
  <div id="container-register">
    <div class="surface-card p-6 shadow-3 border-round w-full lg:w-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-primary mb-2">Create Account</h1>
        <p class="text-600 font-medium">
          Already have an account?
          <router-link
            to="/login"
            class="font-bold text-primary-600 hover:underline"
          >
            Log in here!
          </router-link>
        </p>
      </div>

      <form @submit.prevent="handleRegister">
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
              id="acceptTerms"
              :binary="true"
              v-model="acceptTerms"
              class="mr-2"
            />
            <label for="acceptTerms" class="font-medium"
              >I agree to the terms and conditions</label
            >
          </div>
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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase.js";
import Checkbox from 'primevue/checkbox';

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const errors = ref({});
const generalError = ref("");

const isValidEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

const isValidPassword = (password) => {
  if(password.length < 8) {
    return false;
  }
  if(!/[A-Z]/.test(password)) {
    return false;
  }
  if(!/[0-9]/.test(password)) {
    return false;
  }
  return true;
};

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!isValidEmail(email.value)) {
    errors.value.email = "Please enter a valid email address.";
  }
};

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = "Password is required.";
  } else if (!isValidPassword(password.value)) {
    errors.value.password = "Password requires 8 characters, 1 uppercase letter, and 1 number.";
  }
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Confirm password is required.";
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match.";
  }
};

const validateTerms = () => {
  if (!acceptTerms.value) {
    errors.value.acceptTerms = "You must accept the terms and conditions.";
  }
};

const validateForm = () => {
  errors.value = {};
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateTerms();
  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("User registered:", userCredential.user);
    router.push("/login");
  } catch (err) {
    console.error("Registration error:", err);
    switch(err.code){
    case "auth/email-already-in-use":
      generalError.value = "Email is already in use.";
      break;
    }
    alert("Error registering.")
  }
}



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
