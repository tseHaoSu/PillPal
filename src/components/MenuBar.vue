<template>
  <div v-if="isAuthenticated" class="menubar-wrapper">
    <Menubar :model="computedItems" class="menubar-custom" v-ripple />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const isAuthenticated = ref(false);
const userEmail = ref(localStorage.getItem("userEmail") || "");
const unsubscribe = ref(null);

onMounted(() => {
  unsubscribe.value = onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    if (user) {
      sessionStorage.setItem("isAuthenticated", "true");
      userEmail.value = user.email;
      localStorage.setItem("userEmail", user.email);
    } else {
      sessionStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      userEmail.value = "";
      router.push("/login");
    }
  });
});

onUnmounted(() => {
  if (unsubscribe.value) unsubscribe.value();
});

//handle logout and clear local storage
const handleLogout = async () => {
  try {
    await auth.signOut();
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    userEmail.value = "";
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const computedItems = computed(() => [
  {
    label: "About",
    icon: "pi pi-fw pi-info",
    command: () => router.push("/about"),
  },
  {
    label: "User info",
    icon: "pi pi-fw pi-user",
    command: () => router.push("/home"),
  },
  {
    label: "Data",
    icon: "pi pi-fw pi-table",
    command: () => router.push("/data"),
  },
  {
    label: "Logout",
    icon: "pi pi-fw pi-power-off",
    command: handleLogout,
    class: "logout-item",
  },
  {
    label: `Hello ${userEmail.value}`,
    icon: "pi pi-fw pi-user",
  },
]);
</script>

<style scoped>
.menubar-wrapper {
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.menubar-custom {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  color: #3b82f6;
  font-weight: 600;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem
  > .p-menuitem-link
  .p-menuitem-icon {
  color: #3b82f6;
  margin-right: 0.75rem;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem
  > .p-menuitem-link:hover
  .p-menuitem-icon {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem:last-child
  > .p-menuitem-link {
  background-color: #ef4444;
  color: #ffffff;
  border-radius: 4px;
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem:last-child
  > .p-menuitem-link:hover {
  background-color: #dc2626;
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem:last-child
  > .p-menuitem-link
  .p-menuitem-icon {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
}

.menubar-custom
  .p-menubar-root-list
  > .p-menuitem:last-child
  > .p-menuitem-link:hover
  .p-menuitem-icon {
  background-color: rgba(255, 255, 255, 0.3);
}

.menubar-custom :deep(.p-menubar-root-list) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.menubar-custom :deep(.logout-item) {
  margin-left: auto;
}
</style>
