<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="register">
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name">First name</Label>
                <Input 
                  v-model="firstName" 
                  id="first-name" 
                  placeholder="Max" 
                  required 
                  @blur="validateField('firstName')"
                />
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
              </div>
              <div class="grid gap-2">
                <Label for="last-name">Last name</Label>
                <Input 
                  v-model="lastName" 
                  id="last-name" 
                  placeholder="Robinson" 
                  required 
                  @blur="validateField('lastName')"
                />
                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                v-model="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input 
                v-model="password" 
                id="password" 
                type="password" 
                required 
                @blur="validateField('password')"
              />
              <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="confirm-password">Confirm Password</Label>
              <Input 
                v-model="confirmPassword" 
                id="confirm-password" 
                type="password" 
                required 
                @blur="validateField('confirmPassword')"
              />
              <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
            </div>
            <Button type="submit" class="w-full">Create an account</Button>
            <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
            <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <router-link to="/login" class="text-blue-500">Sign in</router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, getAuth } from '@/firebaseConfig'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const formError = ref('')
const successMessage = ref('')
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateField = (field) => {
  const value = { firstName, lastName, email, password, confirmPassword }[field].value
  const validations = {
    firstName: () => !value && 'First name is required',
    lastName: () => !value && 'Last name is required',
    email: () => !value ? 'Email is required' : 
                !/\S+@\S+\.\S+/.test(value) && 'Email is invalid',
    password: () => !value ? 'Password is required' : 
                  value.length < 6 && 'Password must be at least 6 characters long',
    confirmPassword: () => !value ? 'Please confirm your password' : 
                          value !== password.value && 'Passwords do not match'
  }
  errors[field] = validations[field]() || ''
}

const validateForm = () => {
  Object.keys(errors).forEach(validateField)
  return !Object.values(errors).some(Boolean)
}

const register = async () => {
  formError.value = ''
  successMessage.value = ''
  if (!validateForm()) {
    formError.value = 'Please correct the errors in the form'
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('User registered:', userCredential.user)
    successMessage.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => router.push('/login'), 2000)
  } catch (error) {
    console.error('Registration failed:', error)
    formError.value = error.message || 'Registration failed'
  }
}
</script>