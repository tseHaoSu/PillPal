<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label"
                >Confirm password</label
              >
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  required
                />
                <label class="form-check-label" for="isAustralian"
                  >Australian Resident?</label
                >
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => friendInReason(true)"
              @input="() => friendInReason(false)"
              v-model="formData.reason"
              required
            ></textarea>
            <div
              v-if="errors.reason"
              :class="{
                'text-success': errors.reason === 'Great to have a friend',
                'text-danger': errors.reason !== 'Great to have a friend',
              }"
            >
              {{ errors.reason }}
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">
            Australian Resident: {{ card.isAustralian ? "Yes" : "No" }}
          </li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
        </ul>
      </div>
    </div>
    <div>
      <p class="spaced-text"></p>
    </div>
    <DataTable
      :value="submittedCards"
      tableStyle="max-width: 50rem; margin: auto;"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
      </Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" readonly />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

const formData = ref({
  username: "",
  password: "",
  confirmPassword: "",
  isAustralian: false,
  reason: "",
  gender: "",
});

const submittedCards = ref([]);

// const submitForm = () => {
//     submittedCards.value.push({
//         ...formData.value
//     });
// };

const clearForm = () => {
  formData.value = {
    username: "",
    password: "",
    isAustralian: false,
    reason: "",
    gender: "",
  };

  submittedCards.value = [];
};

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
});

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur)
      errors.value.username = "Username must be at least 3 characters long";
  } else {
    errors.value.username = null;
  }
};

const columns = ref([
  { field: "username", header: "Username" },
  { field: "password", header: "Password" },
  { field: "isAustralian", header: "Australian Resident" },
  { field: "gender", header: "Gender" },
  { field: "reason", header: "Reason" },
]);

const submitForm = () => {
  validateName(true);
  if (!errors.value.username && !errors.value.password) {
    submittedCards.value.push({
      ...formData.value,
    });
    formData.value = {
      username: "",
      password: "",
      isAustralian: false,
      reason: "",
      gender: "",
    };
    errors.value.reason = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minlength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

  if (password.length < minlength) {
    if (blur)
      errors.value.password = `Password must be at least ${minlength} characters long`;
  } else if (!hasUppercase) {
    if (blur)
      errors.value.password =
        "Password must contain at least one uppercase letter";
  } else if (!hasLowercase) {
    if (blur)
      errors.value.password =
        "Password must contain at least one lowercase letter";
  } else if (!hasNumber) {
    if (blur)
      errors.value.password = "Password must contain at least one number";
  } else if (!hasSpecialChar) {
    if (blur)
      errors.value.password =
        "Password must contain at least one special character";
  } else {
    errors.value.password = null;
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = "Passwords do not match";
  } else {
    errors.value.confirmPassword = null;
  }
};

// modify so it at least have 10 characters

const friendInReason = (blur) => {
  if (formData.value.reason.length < 10) {
    if (blur) {
      errors.value.reason = "Reason must be at least 10 characters long";
    } else {
      errors.value.reason = null;
    }
  } else if (formData.value.reason.toLowerCase().includes("friend")) {
    if (blur) {
      errors.value.reason = "Great to have a friend";
    } else {
      errors.value.reason = null;
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.card-padding {
  padding: 1rem;
}

.spaced-text {
  min-height: 60px; /* Adjust as needed */
  min-width: 20px; /* Adjust as needed */
}
</style>
