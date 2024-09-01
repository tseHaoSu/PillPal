<template>
  <div id="container-data">
    <div class="surface-card p-6 shadow-2 border-round w-full lg:w-8">
      <h1 class="text-3xl font-bold text-primary mb-4 text-center">
        Medication Data
      </h1>
      <div class="form-grid">
        <FloatLabel v-for="field in fields" :key="field.id" class="float-label">
          <InputText
            :id="field.id"
            v-model="formData[field.id]"
            class="w-full input-width custom-input"
            :type="field.id === 'price' ? 'number' : 'text'"
            :step="field.id === 'price' ? '0.1' : undefined"
          />
          <label :for="field.id">{{ field.label }}</label>
        </FloatLabel>
        <div class="float-label">
          <label class="rating-label">Please give a rating!</label>
          <div class="custom-input star-rating-wrapper">
            <star-rating
              v-model:rating="formData.rating"
              :star-size="30"
              :increment="1"
              :active-color="'#3b82f6'"
            ></star-rating>
          </div>
        </div>
      </div>
      <div class="button-container">
        <Button
          label="Submit"
          class="p-button-primary custom-button"
          @click="handleSubmit"
        />
        <Button
          label="Clear"
          class="p-button-secondary custom-button"
          @click="clearForm"
        />
      </div>
      <div class="datatable-wrapper">
        <DataTable
          :value="products"
          :paginator="true"
          :rows="5"
          showGridlines
          class="datatable-container mt-6 shadow-3d"
        >
          <Column
            v-for="col in columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          >
            <template #body="slotProps" v-if="col.field === 'price'">
              ${{ slotProps.data[col.field].toFixed(2) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import productsData from "@/assets/json/products.json";
import StarRating from "vue-star-rating";

const products = ref([]);
const columns = ref([
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "price", header: "$ Price" },
  { field: "category", header: "Category" },
  { field: "rating", header: "Rating" },
]);
const fields = ref([
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "category", label: "Category" },
]);
const formData = ref({
  id: null,
  name: null,
  price: null,
  category: null,
  rating: 0,
});

onMounted(() => {
  //Initialize the local storage with json data
  const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
  products.value = [...productsData, ...storedProducts];
  saveToLocalStorage();
});

const handleSubmit = () => {
  const newProduct = {
    ...formData.value,
    id:
      products.value.length > 0
        ? Math.max(...products.value.map((p) => p.id)) + 1
        : 1,
    rating: parseFloat(formData.value.rating) || 0,
    price: parseFloat(formData.value.price) || 0,
  };
  products.value.unshift(newProduct);
  saveToLocalStorage();
  clearForm();
};

const clearForm = () => {
  Object.keys(formData.value).forEach((key) => (formData.value[key] = null));
};

const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};
</script>

<style scoped>
#container-data {
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.float-label {
  margin-bottom: 0.5rem;
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.custom-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 7px 14px rgba(50, 50, 93, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.08);
}

.custom-button:active {
  transform: translateY(1px);
}

.p-button-primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

.p-button-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.p-button-secondary {
  background-color: #64748b;
  border-color: #64748b;
  color: #ffffff;
}

.p-button-secondary:hover {
  background-color: #475569;
  border-color: #475569;
}

.custom-button:focus {
  box-shadow:
    0 0 0 2px #ffffff,
    0 0 0 4px #3b82f6;
  outline: none;
}

.datatable-container {
  margin-top: 2rem;
}

.datatable-wrapper {
  perspective: 1000px;
  padding: 20px 0;
}

.shadow-3d {
  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.1);
  transform: rotateX(2deg);
  transition: all 0.3s ease;
}

.shadow-3d:hover {
  transform: rotateX(0deg);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.15),
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 30px 60px rgba(0, 0, 0, 0.15);
}

.rating-label {
  position: absolute;
  top: -0.5rem;
  left: 0.75rem;
  padding: 0 0.25rem;
  background-color: #fff;
  font-size: 0.75rem;
  color: #6c757d;
  transition: all 0.2s;
}

:deep(.p-datatable) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: bold;
  border-bottom: 2px solid #2563eb;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background-color: #f8fafc;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #e6f0ff;
}

:deep(.p-paginator) {
  background-color: #f1f5f9;
  border-top: 1px solid #e2e8f0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background-color: #3b82f6;
  color: #ffffff;
}

.star-rating-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0rem 0.75rem;
}

:deep(.vue-star-rating-star) {
  margin-right: 2px;
}

:deep(.vue-star-rating-star svg) {
  vertical-align: middle;
}

.float-label {
  position: relative;
}

.star-rating-wrapper {
  min-height: 60px;
}

/* Responsive styles */
@media screen and (max-width: 576px) {
  .surface-card {
    padding: 1rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .button-container {
    flex-direction: column;
  }

  .custom-button {
    width: 100%;
  }

  :deep(.p-datatable .p-datatable-thead > tr > th),
  :deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.5rem;
  }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
  .surface-card {
    width: 90%;
    max-width: none;
  }

  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .surface-card {
    width: 80%;
    max-width: none;
  }

  .form-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 993px) and (max-width: 1200px) {
  .surface-card {
    width: 70%;
    max-width: none;
  }
}

@media screen and (min-width: 1201px) {
  .surface-card {
    width: 60%;
    max-width: 1200px;
  }
}
</style>
