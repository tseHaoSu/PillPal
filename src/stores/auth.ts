// src/stores/auth.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthUser {
  email: string;
  // Add other properties that you expect in the user object
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() =>
    user.value?.email === "admin@example.com" ? "admin" : "user"
  );

  function setUser(newUser: AuthUser | null) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  }

  function checkAuth() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser) as AuthUser);
    }

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const authUser: AuthUser = {
          email: firebaseUser.email || "",
          // Map other properties from firebaseUser to AuthUser as needed
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }

  return { user, isAuthenticated, userRole, setUser, checkAuth };
});
