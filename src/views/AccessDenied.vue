<!-- src/views/AccessDeniedView.vue -->
<template>
  <div class="access-denied">
    <h1>Access Denied</h1>
    <p>You must be logged in to view this page.</p>
    <button @click="redirectToLogin" class="btn btn-primary">
      login again
    </button>
  </div>
</template>

<script>
export default {
  name: "AccessDeniedView",
  methods: {
    redirectToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.access-denied {
  text-align: center;
  margin-top: 50px;
}

.btn {
  margin-top: 20px;
}
</style>
