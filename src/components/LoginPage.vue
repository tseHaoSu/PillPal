<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="mx-auto max-w-sm">
      <form @submit.prevent="login">
        <CardHeader>
          <CardTitle class="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                v-model="email"
                id="email"
                type="email"
                placeholder="johnsmith@example.com"
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="#" @click.prevent="forgotPassword" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input v-model="password" id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </Button>
            <Button @click.prevent="loginWithGoogle" variant="outline" class="w-full" :disabled="isLoading">
              Login with Google
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <router-link to="/register" class="text-blue-500">Sign up</router-link>
          </div>
        </CardContent>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  auth
} from '@/firebaseConfig'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const authStore = useAuthStore()

const router = useRouter()
const { toast } = useToast()

const login = async () => {
  if (!email.value || !password.value) return

  isLoading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    handleSuccessfulLogin(userCredential.user)
  } catch (error) {
    handleLoginError(error)
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  isLoading.value = true
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    handleSuccessfulLogin(result.user)
  } catch (error) {
    handleLoginError(error)
  } finally {
    isLoading.value = false
  }
}

const handleSuccessfulLogin = (user) => {
  console.log('User logged in:', user)
  authStore.setUser(user)
  const role = user.email === 'admin@example.com' ? 'admin' : 'user'
  toast({
    title: 'Success',
    description: 'You have successfully logged in',
  })
  router.push(role === 'admin' ? '/admin' : '/home')
}

const handleLoginError = (error) => {
  console.error('Login failed:', error)
  let description = 'An unexpected error occurred. Please try again.'

  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        description = 'No account found.'
        break
      case 'auth/wrong-password':
        description = 'Incorrect password.'
        break
      case 'auth/invalid-email':
        description = 'Invalid email address.'
        break
      case 'auth/too-many-requests':
        description = 'Too many failed login attempts. '
        break
      default:
        description = 'An error occurred during login.'
    }
  }
  toast({
    title: 'Login Failed',
    description,
    variant: 'destructive'
  })
}

const forgotPassword = async () => {
  if (!email.value) {
    toast({
      title: 'Error',
      description: 'Please enter your email address',
    })
    return
  }

  try {
    await sendPasswordResetEmail(auth, email.value)
    toast({
      title: 'Success',
      description: 'Please check your email for a password reset link',
    })
  } catch (error) {
    console.error('Error sending reset email:', error)
    toast({
      title: 'Error',
      description: 'Failed to send reset email. Please try again.',
      variant: 'destructive',
    })
  }
}
</script>