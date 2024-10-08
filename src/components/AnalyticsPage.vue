<template>
  <div class="flex h-screen">
    <SideNavigation />
    <div class="flex-1 bg-white p-4 overflow-auto">
      <h1 class="text-2xl font-bold mb-4 flex items-center">
        Analytics
        <LineChart class="ml-2 h-6 w-6" />
      </h1>
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
            <BarChart />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import SideNavigation from "@/components/SideNavigation.vue";
import BarChart from "@/components/BarChartProp.vue";
import { LineChart } from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
</script>