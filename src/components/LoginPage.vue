<template>
<div class="flex items-center justify-center min-h-screen">
  <Card class="mx-auto max-w-sm">
    <form @submit.prevent="login">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
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
          <Input v-model="password" id="password" type="password" />
        </div>
        <span v-if="formError" class="text-red-500" > {{ formError }}</span>
        <span v-if="successMessage" class="text-green-500">{{ successMessage }}</span>
        <Button type="submit" class="w-full">
          Login
        </Button>
        <Button @click.prevent="loginWithGoogle" variant="outline" class="w-full">
          Login with Google
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link to="/register" class="text-blue-500">
          Sign up
        </router-link>
      </div>
    </CardContent>
    </form>
  </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  getRedirectResult,
  GoogleAuthProvider, 
  useFirebaseAuth,
  sendPasswordResetEmail
} from '@/firebaseConfig'
import { useUserStore } from '@/stores/userStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'


const email = ref('')
const password = ref('')
const formError = ref(null)
const successMessage = ref(null)

const auth = useFirebaseAuth()
const router = useRouter()
const userStore = useUserStore()
const { toast } = useToast()

/**
 * Login the user with the provided email and password
 */
const checkEmailAndPassword = () => {
  if (!email.value) {
    toast({
      title: 'Error',
      description: 'Please enter your email',
    })
    return false
  }
  if (!password.value) {
    toast({
      title: 'Error',
      description: 'Please enter your password',
    })
    return false
  }
  return true
}

/**
 * Login the user with the provided email and password
 */
const login = async () => {
  if (!checkEmailAndPassword()) return
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    handleSuccessfulLogin(userCredential.user)
  } catch (error) {
    handleLoginError(error)
  }
}

// Login the user with Google
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithRedirect(auth, provider)
}
onMounted(async () => {
  try {
    const result = await getRedirectResult(auth)
    if (result) {
      handleSuccessfulLogin(result.user)
    }
  } catch (error) {
    handleLoginError(error)
  }
})

// Handle successful login and direct user specific page
const handleSuccessfulLogin = (user) => {
  console.log('User logged in:', user)
  const role = user.email === 'admin@example.com' ? 'admin' : 'user'
  userStore.login(user.email, role)
  toast({
    title: 'Success',
    description: 'You have successfully logged in',
  })
  router.push(role === 'admin' ? '/admin' : '/home')
}

// Handle login error
const handleLoginError = (error) => {
  console.error('Login failed:', error)
  let title = 'Login Failed'
  let description = 'An unexpected error occurred. Please try again.'

  // Check if the error is a Firebase AuthError
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        title = 'Email Error'
        description = 'No account found with this email address.'
        break
      case 'auth/wrong-password':
        title = 'Password Error'
        description = 'Incorrect password. Please try again.'
        break
      case 'auth/invalid-email':
        title = 'Email Error'
        description = 'The email address is not valid.'
        break
      default:
        title = 'Authentication Error'
        description = 'An error occurred during login. Please try again.'
    }
  }
  toast({
    title,
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
      description: 'Failed to send reset email',
      variant: 'destructive',
    })
  }
}

</script>