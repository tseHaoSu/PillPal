<template>
    <div id="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">Medication Data</div>
  <DataTable :value="products" showGridlines="grids" tableStyle="min-width: 50rem margin: auto">
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
        { id: 1, name: 'Product A', price: 100, category: 'Category 1' },
        { id: 2, name: 'Product B', price: 150, category: 'Category 2' },
        { id: 3, name: 'Product C', price: 200, category: 'Category 3' },
      ],
      columns: [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' },
        { field: 'rating', header: 'Reviews' },
        
      ],
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
</style>
