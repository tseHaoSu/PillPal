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
            :class="{ 'p-invalid': errors.email }"
            @blur="validateEmail"
            required
          />
          <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <!-- Password -->
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
            :class="{ 'p-invalid': errors.password }"
            @blur="validatePassword"
            required
          />
          <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <!-- Confirm Password-->
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
            :class="{ 'p-invalid': errors.confirmPassword }"
            @blur="validateConfirmPassword"
            required
          />
          <small class="p-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="acceptTerms"
              :binary="true"
              v-model="acceptTerms"
              :class="{ 'p-invalid': errors.acceptTerms }"
              @blur="validateTerms"
              class="mr-2"
            />
            <label for="acceptTerms" class="font-medium"
              >I agree to the terms and conditions</label
            >
          </div>
        </div>
        <small class="p-error" v-if="errors.acceptTerms">{{ errors.acceptTerms }}</small>

        <!-- Submit Button -->
        <button
          type="submit"
          class="p-button p-component w-full text-xl font-bold p-3"
        >
          <span class="p-button-icon pi pi-user-plus mr-2"></span>
          <span class="p-button-label">Register</span>
        </button>

        <!-- General Error Message -->
        <p v-if="generalError" class="text-red-500 mt-4 font-medium">{{ generalError }}</p>
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

const isValidEmail = (email) => email.includes('@') && email.includes('.');

const isValidPassword = (password) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
};

const validateEmail = () => {
  errors.value.email = "";
  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!isValidEmail(email.value)) {
    errors.value.email = "Please enter a valid email address.";
  }
};

const validatePassword = () => {
  errors.value.password = "";
  if (!password.value) {
    errors.value.password = "Password is required.";
  } else if (!isValidPassword(password.value)) {
    errors.value.password = "Password must be at least 8 characters long, contain at least one uppercase letter and one number.";
  }
};

const validateConfirmPassword = () => {
  errors.value.confirmPassword = "";
  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Please confirm your password.";
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match.";
  }
};

const validateTerms = () => {
  errors.value.acceptTerms = "";
  if (!acceptTerms.value) {
    errors.value.acceptTerms = "Please accept the terms and conditions.";
  }
};

const validateForm = () => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateTerms();
  return Object.values(errors.value).every(error => error === "");
};

const handleFirebaseError = (error) => {
  console.error("Registration error:", error);
  switch (error.code) {
    case "auth/email-already-in-use":
      errors.value.email = "This email is already in use.";
      break;
    case "auth/invalid-email":
      errors.value.email = "Invalid email format.";
      break;
    case "auth/weak-password":
      errors.value.password = "Password is too weak. It should be at least 6 characters long.";
      break;
    default:
      generalError.value = "An error occurred during registration. Please try again.";
  }
};

const handleRegister = async () => {
  generalError.value = "";
  
  if (!validateForm()) return;

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/login");
  } catch (error) {
    handleFirebaseError(error);
  }
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

.p-invalid {
  border-color: #e24c4c !important;
}

.p-error {
  color: #e24c4c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
