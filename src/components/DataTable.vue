<template>
  <div class="border rounded-lg shadow-sm overflow-hidden">
    <div class="p-4 bg-muted/50 border-b">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="relative">
          <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
          placeholder="Search..."
          @input="(e) => handleSearch(e.target.value)"
          class="pl-8"
        />
        </div>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="column in columns"
            :key="column.key"
            @click="toggleSort(column.key)"
            class="cursor-pointer"
          >
            {{ column.label }}
            <span v-if="sortColumn === column.key">
              {{ sortDirection === "asc" ? "▲" : "▼" }}
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="row in paginatedData"
          :key="row.id"
          :class="{ 'bg-accent': row.highlighted }"
        >
          <TableCell v-for="column in columns" :key="column.key">
          <template v-if="column.key === 'status'">
            <Badge class="text-xs" :variant="getStatusBadgeVariant(row[column.key])">
              {{ row[column.key] }}
            </Badge>
          </template>
          <template v-else-if="column.key === 'amount'">
            ${{ row[column.key] }}
          </template>
          <template v-else>
            {{ row[column.key] }}
          </template>
        </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    
    <div class="flex items-center justify-between px-2 py-4">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing <span class="font-semibold">{{ (currentPage - 1) * rowsPerPage + 1 }}</span> to 
        <span class="font-semibold">{{ Math.min(currentPage * rowsPerPage, filteredAndSortedData.length) }}</span> of 
        <span class="font-semibold">{{ filteredAndSortedData.length }}</span> entries
      </span>
      <div class="flex space-x-2">
        <Button @click="previousPage" :disabled="currentPage === 1" variant="outline" size="sm">
          <ChevronLeft class="h-4 w-4" />
          Previous
        </Button>
        <Button @click="nextPage" :disabled="currentPage === totalPages" variant="outline" size="sm">
          Next
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const props = defineProps({
  data: Array,
  columns: Array,
});


const sortColumn = ref("");
const sortDirection = ref("asc");
const currentPage = ref(1);
const rowsPerPage = 10;
const searchQuery = ref('');

const filteredAndSortedData = computed(() => {
  let result = props.data;

  // Apply single search filter across all columns
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(row => 
      columns.some(column => 
        String(row[column.key]).toLowerCase().includes(query) ||
        (column.key === 'customer' && row.email.toLowerCase().includes(query))
      )
    );
  }
  // Apply sorting
  if (sortColumn.value) {
    result.sort((a, b) => {
      if (a[sortColumn.value] < b[sortColumn.value])
        return sortDirection.value === "asc" ? -1 : 1;
      if (a[sortColumn.value] > b[sortColumn.value])
        return sortDirection.value === "asc" ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredAndSortedData.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredAndSortedData.value.length / rowsPerPage));

const toggleSort = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "fulfilled":
      return "secondary";
    case "declined":
      return "outline";
    default:
      return "default";
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

//reset to the first page when searching
const handleSearch = (value) => {
  searchQuery.value = value;
  currentPage.value = 1;
};
</script>

