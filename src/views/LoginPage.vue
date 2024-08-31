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

        <!-- Remember Me and Forgot Password -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              inputId="rememberme"
              :binary="true"
              v-model="rememberMe"
              class="mr-2"
            />
            <label for="rememberme" class="font-medium">Remember me</label>
          </div>
          <a @click="handleForgotPassword" class="font-bold text-primary-600 hover:underline cursor-pointer">
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

        <!-- Reset Message -->
        <p v-if="resetMessage" class="text-green-500 mt-4 font-medium">{{ resetMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../firebase/firebase.js';
import Checkbox from 'primevue/checkbox';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const resetMessage = ref('');

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    
    // Store authentication state
    sessionStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', user.email);
    
    // Navigate to the home page
    router.push('/home');
    console.log('User email:', user.email);
  } catch (err) {
    error.value = 'Invalid email or password.';
    console.error('Login error:', err);
  }
};

const handleForgotPassword = async () => {
  if (!email.value) {
    alert('Please enter your email address.');
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.value);
    alert('Password reset email sent. Please check your inbox.');
    resetMessage.value = '';
    error.value = ''; 
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      alert('No account found with this email address.');
    } else {
      alert('Error sending password reset email');
    }
    console.error('Password reset error:', err);
  }
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

/* Add these styles to ensure the checkbox is visible */
:deep(.p-checkbox) {
  width: 20px;
  height: 20px;
}

:deep(.p-checkbox .p-checkbox-box) {
  border: 2px solid #ced4da;
  background: #ffffff;
  width: 20px;
  height: 20px;
  color: #495057;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  border-color: #3B82F6;
  background: #3B82F6;
}

:deep(.p-checkbox .p-checkbox-box .p-checkbox-icon) {
  font-size: 14px;
  font-weight: bold;
}
</style>
