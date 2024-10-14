<template>
  <MainLayout title="My Location" :icon="Users">
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationProp />
        </CardContent> 
        </Card>  
      </MainLayout>     
</template>

<script setup>
import  DataTable  from '@/components/DataTable.vue'
import { ref, onMounted } from 'vue'
import { Table } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MainLayout from '@/components/MainLayout.vue'
import LocationProp from '@/components/LocationProp.vue';

</script>