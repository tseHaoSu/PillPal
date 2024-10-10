<template>
  <MainLayout title="Analytics" :icon="LineChart">
      <Card class="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
            <BarChart />
        </CardContent>
      </Card>
  </MainLayout>
</template>

<script setup>
import SideNavigation from "@/components/SideNavigation.vue";
import BarChart from "@/components/BarChartProp.vue";
import { LineChart } from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout.vue";
</script>