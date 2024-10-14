<template>
  <MainLayout title="Dashboard" :icon="Table">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle> Hello {{ user.email }} ! </CardTitle>
            <CardTitle> Medication data </CardTitle>
            <Button @click="exportToPDF" class="mt-4">Export to PDF</Button>
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
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const user = authStore.user

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

const exportToPDF = () => {
  const doc = new jsPDF()

  // Add title 
  doc.text('Medication Data', 14, 15)

  // Prepare the data 
  const tableData = medicationData.value.map(item => [
    item.medicationName,
    item.medicationType,
    item.status,
    item.date,
    item.amount
  ])

  // Add the table to the PDF
  doc.autoTable({
    head: [columns.map(col => col.label)],
    body: tableData,
    startY: 20,
  })

  // Save the PDF
  doc.save('medication_data.pdf')
}

onMounted(fetchMedications);
</script>