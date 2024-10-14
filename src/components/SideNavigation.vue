<template>
  <div class="flex h-screen">
    <div class="w-64 bg-white hidden md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Pill class="h-6 w-6" />
            <span class="">CapsuleLogs</span>
          </a>
          <Button 
            variant="outline" 
            size="icon" 
            class="ml-auto h-8 w-8"
            @click="requestNotificationPermission"
            :class="{
              'bg-green-100 hover:bg-green-200': notificationStatus === 'granted',
              'bg-red-100 hover:bg-red-200': notificationStatus === 'denied'
            }"
          >
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                item.active ? 'bg-muted text-primary' : 'text-muted-foreground'
              ]"
              @click.prevent="handleNavigation(item)"
            >
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.name }}
              <Badge v-if="item.badge" class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {{ item.badge }}
              </Badge>
            </a>
          </nav>
        </div>
        <div class="mt-auto p-4">
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="grid gap-2 text-lg font-medium">
          <a
            href="#"
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :class="[
              'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
              item.active ? 'bg-muted text-foreground' : 'text-muted-foreground'
            ]"
            @click.prevent="handleNavigation(item)"
          >
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.name }}
            <Badge v-if="item.badge" class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {{ item.badge }}
            </Badge>
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup>
import { Bell, Home, ShoppingCart, Package, Users, LineChart, Package2, Menu, LogOut, Calendar, Table, Pill } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { logout } from '@/firebaseConfig'

const router = useRouter()

const navItems = [
  { name: 'Dashboard', icon: Table, href: '/home' },
  { name: 'Make an Appointment', icon: Calendar, href: '/appointment' },
  { name: 'Location', icon: Users, href: '/location' },
  { name: 'Analytics', icon: LineChart, href: '/analytics' },
  { name: 'Logout', icon: LogOut, href: '#', action: 'logout' }
]

const notificationStatus = ref('default')
const toast = useToast()

const requestNotificationPermission = async () => {
  console.log('Requesting notification permission...')
  if (!('Notification' in window)) {
    toast({
      title: 'Error',
      description: 'This browser does not support desktop notification',
      variant: 'destructive',
    })
    return
  }

  if (Notification.permission === 'granted') {
    toast({
      title: 'Notifications',
      description: 'Notifications are already enabled',
    })
    notificationStatus.value = 'granted'
    return
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      toast({
        title: 'Success',
        description: 'Notification permission granted!',
      })
      notificationStatus.value = 'granted'
    } else {
      toast({
        title: 'Notice',
        description: 'Notification permission was not granted.',
        variant: 'warning',
      })
      notificationStatus.value = 'denied'
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    toast({
      title: 'Error',
      description: 'There was an error requesting notification permission',
      variant: 'destructive',
    })
  }
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
    toast.success('Successfully logged out.')
  } catch (error) {
    console.error('Logout failed:', error)
    toast.error('Logout failed. Please try again.')
  }
}

const handleNavigation = (item) => {
  if (item.action === 'logout') {
    handleLogout()
  } else {
    router.push(item.href)
  }
}

const mode = useColorMode()
</script>