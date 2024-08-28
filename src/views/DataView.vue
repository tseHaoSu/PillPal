<template>
  <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <h1 class="text-center mb-5">Medication Data</h1>
      <div class="form-grid">
        <FloatLabel class="float-label">
          <InputText id="username" v-model="value" class="w-full input-width"/>
          <label for="username">ID</label>
        </FloatLabel>
        <FloatLabel class="float-label">
          <InputText id="username" v-model="value" class="w-full input-width"/>
          <label for="username">Name</label>
        </FloatLabel>
      </div>
      <div class="form-grid">
        <FloatLabel class="float-label">
          <InputText id="username" v-model="value" class="w-full input-width"/>
          <label for="username">Price</label>
        </FloatLabel>
        <FloatLabel class="float-label">
          <InputText id="username" v-model="value" class="w-full input-width"/>
          <label for="username">Category</label>
        </FloatLabel>
        </div>
         <div class="button-container">
        <Button label="Submit" class="p-button p-button-primary" @click="handleSubmit" />
        <Button label="Clear" class="p-button p-button-secondary" @click="clearForm" />
      </div>
        <DataTable
          :value="products"
          showGridlines="true"
          class="datatable-container"
        >
          <Column
            v-for="col in columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          />
        </DataTable>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: "Product A", price: 100, category: "Category 1" },
        { id: 2, name: "Product B", price: 150, category: "Category 2" },
        { id: 3, name: "Product C", price: 200, category: "Category 3" },
      ],
      columns: [
        { field: "id", header: "ID" },
        { field: "name", header: "Name" },
        { field: "price", header: "Price" },
        { field: "category", header: "Category" },
        { field: "rating", header: "Reviews" },
      ],
      value: null,
    };
  },
};
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}
.surface-card {
  background-color: #ffffff;
  min-height: 80vh; /* Set a minimum height for the card */
}
.datatable-container {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
}

.float-label {
  margin-bottom: 16px;
  border-radius: 20px;
  width: 100%;
  flex:1
}

.form-grid {
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.button-container {
  display: flex;
  gap: 10px; /* Add gap between buttons */
  justify-content: center; /* Align buttons to the start */
  margin-top: 20px;
}



</style>
