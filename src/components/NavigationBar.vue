<template>
  <!-- Using Bootstrap's Header template -->
  <div v-if="isAuthenticated" class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            to="/home"
            class="nav-link"
            active-class="active"
            aria-current="page"
          >
            Home
          </router-link>
        </li>
        <!-- Show About link only if the user is authenticated -->
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active"
            >About</router-link
          >
        </li>
        <!-- Show Logout button if user is authenticated -->
        <li class="nav-item">
          <button class="nav-link btn btn-link" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
  <!-- Show Login link if user is not authenticated -->
  <!-- <div v-else class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div> -->
</template>

<script>
import { computed } from "vue";

export default {
  name: "NavigationBar",
  setup() {
    // Computed property to check if the user is authenticated
    const isAuthenticated = computed(
      () => localStorage.getItem("isAuthenticated") === "true",
    );

    // Logout method to remove authentication and redirect to login page
    const logout = () => {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/"; // Redirect to the login page after logout
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
