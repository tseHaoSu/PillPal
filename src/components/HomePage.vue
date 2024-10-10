<template>
  <MainLayout title="Dashboard" :icon="Table">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable :data="tableData" :columns="columns" />
          </CardContent>
        </Card>
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Log Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <InputData />
          </CardContent>
        </Card>
    </div>
      </MainLayout>     
</template>

<script setup>
import  DataTable  from '@/components/DataTable.vue'
import { ref } from 'vue'
import { Table } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import InputData from '@/components/InputData.vue'
import MainLayout from '@/components/MainLayout.vue'

const columns = [
  { key: "customer", label: "Customer" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
]

const tableData = ref([
  {
    id: 1,
    customer: 'Liam Johnson',
    email: 'liam@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-06-23',
    amount: '$250.00',
    highlighted: true
  },
  {
    id: 2,
    customer: 'Emma Rodriguez',
    email: 'emma@example.com',
    type: 'Refund',
    status: 'Pending',
    date: '2023-06-24',
    amount: '$120.50',
    highlighted: false
  },
  {
    id: 3,
    customer: 'Oliver Chang',
    email: 'oliver@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-06-25',
    amount: '$340.00',
    highlighted: false
  },
  {
    id: 4,
    customer: 'Sophia Patel',
    email: 'sophia@example.com',
    type: 'Subscription',
    status: 'Active',
    date: '2023-06-26',
    amount: '$15.99',
    highlighted: false
  },
  {
    id: 5,
    customer: 'Noah Kim',
    email: 'noah@example.com',
    type: 'Sale',
    status: 'Shipped',
    date: '2023-06-27',
    amount: '$180.75',
    highlighted: true
  },
  {
    id: 6,
    customer: 'Ava Nguyen',
    email: 'ava@example.com',
    type: 'Refund',
    status: 'Processed',
    date: '2023-06-28',
    amount: '$95.20',
    highlighted: false
  },
  {
    id: 7,
    customer: 'Ethan Singh',
    email: 'ethan@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-06-29',
    amount: '$220.00',
    highlighted: false
  },
  {
    id: 8,
    customer: 'Isabella Lopez',
    email: 'isabella@example.com',
    type: 'Subscription',
    status: 'Canceled',
    date: '2023-06-30',
    amount: '$10.99',
    highlighted: true
  },
  {
    id: 9,
    customer: 'Mason Taylor',
    email: 'mason@example.com',
    type: 'Sale',
    status: 'Processing',
    date: '2023-07-01',
    amount: '$450.50',
    highlighted: false
  },
  {
    id: 10,
    customer: 'Mia Wilson',
    email: 'mia@example.com',
    type: 'Refund',
    status: 'Declined',
    date: '2023-07-02',
    amount: '$75.00',
    highlighted: false
  },
  {
    id: 11,
    customer: 'William Garcia',
    email: 'william@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-07-03',
    amount: '$300.25',
    highlighted: true
  },
  {
    id: 12,
    customer: 'Charlotte Brown',
    email: 'charlotte@example.com',
    type: 'Subscription',
    status: 'Active',
    date: '2023-07-04',
    amount: '$20.99',
    highlighted: false
  },
  {
    id: 13,
    customer: 'James Lee',
    email: 'james@example.com',
    type: 'Sale',
    status: 'Shipped',
    date: '2023-07-05',
    amount: '$190.00',
    highlighted: false
  },
  {
    id: 14,
    customer: 'Amelia Davis',
    email: 'amelia@example.com',
    type: 'Refund',
    status: 'Processed',
    date: '2023-07-06',
    amount: '$85.75',
    highlighted: true
  },
  {
    id: 15,
    customer: 'Benjamin Martinez',
    email: 'benjamin@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-07-07',
    amount: '$280.50',
    highlighted: false
  },
  {
    id: 16,
    customer: 'Evelyn Anderson',
    email: 'evelyn@example.com',
    type: 'Subscription',
    status: 'Active',
    date: '2023-07-08',
    amount: '$12.99',
    highlighted: false
  },
  {
    id: 17,
    customer: 'Daniel Thomas',
    email: 'daniel@example.com',
    type: 'Sale',
    status: 'Processing',
    date: '2023-07-09',
    amount: '$410.00',
    highlighted: true
  },
  {
    id: 18,
    customer: 'Harper White',
    email: 'harper@example.com',
    type: 'Refund',
    status: 'Pending',
    date: '2023-07-10',
    amount: '$150.25',
    highlighted: false
  },
  {
    id: 19,
    customer: 'Michael Jackson',
    email: 'michael@example.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-07-11',
    amount: '$320.75',
    highlighted: false
  },
  {
    id: 20,
    customer: 'Abigail Harris',
    email: 'abigail@example.com',
    type: 'Subscription',
    status: 'Canceled',
    date: '2023-07-12',
    amount: '$18.99',
    highlighted: true
  }
])
</script>

