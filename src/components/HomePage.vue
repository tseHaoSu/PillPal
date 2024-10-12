<template>
  <MainLayout title="Dashboard" :icon="Table">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable :data="medicationData" :columns="columns" />
          </CardContent>
        </Card>
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Log Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <InputData />
          </CardContent>
          <CardHeader>
            <CardTitle>Send Email</CardTitle>
          </CardHeader>
          <CardContent>
            <SendEmail />
          </CardContent>
        </Card>
    </div>
      </MainLayout>     
</template>

<script setup>
import  DataTable  from '@/components/DataTable.vue'
import { ref, onMounted } from 'vue'
import { Table } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import InputData from '@/components/InputData.vue'
import MainLayout from '@/components/MainLayout.vue'
import SendEmail from '@/components/SendEmail.vue'

const columns = [
  { key: "medicationName", label: "Medication Name" },
  { key: "medicationType", label: "Medication Type" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date Taken" },
  { key: "amount", label: "Amount" },
]

const medicationData = ref([])

const fetchMedications = async () => {
  try {
    const response = await fetch('https://us-central1-fit5032-79317.cloudfunctions.net/getMedications');
    if (response.ok) {
      medicationData.value = await response.json();
    } else {
      console.error('Error fetching medications:', await response.text());
    }
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
};

onMounted(fetchMedications);
</script>