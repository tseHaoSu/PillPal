<template>
  <MainLayout title="Appointment" :icon="Calendar">
        <Card class="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Make a booking here</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentProp />
        </CardContent> 
        </Card>  
      </MainLayout>     
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MainLayout from '@/components/MainLayout.vue'
import { Calendar } from 'lucide-vue-next'
import AppointmentProp from '@/components/AppointmentProp.vue'

</script>