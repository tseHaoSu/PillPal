<template>
  <div class="border rounded-lg shadow-sm overflow-hidden p-4">
    <form class="space-y-8" @submit="onSubmit">
      <FormField v-slot="{ field }" name="medicationName">
        <FormItem class="flex flex-col">
          <FormLabel>Medication Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Medicine name"
              class="w-[240px]"
              v-bind="field"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ field }" name="medicationType">
        <FormItem class="flex flex-col">
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select v-bind="field">
              <SelectTrigger class="w-[240px]">
                <SelectValue placeholder="Select a medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="antihypertensive"
                    >Antihypertensive (Blood Pressure)</SelectItem
                  >
                  <SelectItem value="statin"
                    >Statin (Cholesterol-Lowering)</SelectItem
                  >
                  <SelectItem value="anticoagulant"
                    >Anticoagulant (Blood Thinner)</SelectItem
                  >
                  <SelectItem value="analgesic"
                    >Analgesic (Pain Reliever)</SelectItem
                  >
                  <SelectItem value="antidiabetic">Anti-Diabetic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="status">
        <FormItem class="flex flex-col">
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select v-bind="field">
              <SelectTrigger class="w-[240px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>My Medication</SelectLabel>
                  <SelectItem value="taken">taken</SelectItem>
                  <SelectItem value="pending">not now</SelectItem>
                  <SelectItem value="canceled">canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="amount">
        <FormItem class="flex flex-col">
          <FormControl>
            <NumberField
              id="amount"
              :default-value="50"
              :format-options="{
                style: 'currency',
                currency: 'AUD',
                currencyDisplay: 'code',
                currencySign: 'accounting',
              }"
              class="w-[240px]"
              v-bind="field"
            >
              <Label for="amount">Amount</Label>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="date">
        <FormItem class="flex flex-col">
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-[240px] ps-3 text-start font-normal',
                      !field.value && 'text-muted-foreground'
                    )
                  "
                >
                  <span>{{
                    field.value ? formatDate(field.value) : "Pick a date"
                  }}</span>
                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                :model-value="field.value ? parseDate(field.value) : undefined"
                @update:model-value="
                  (date) => field.onChange(date ? date.toString() : undefined)
                "
                calendar-label="Medication Date"
                initial-focus
                :min-value="minDate"
                :max-value="maxDate"
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            The date when the medication was or will be taken.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  </div>
</template>

<script setup>
import { h } from "vue";
import axios from "axios";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";
import { toDate } from "radix-vue/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const df = new DateFormatter("en-US", { dateStyle: "long" });

const formatDate = (date) => {
  if (date) {
    return df.format(toDate(parseDate(date)));
  }
  return "";
};

const formSchema = toTypedSchema(
  z.object({
    medicationName: z.string().min(1, "Medication name is required."),
    medicationType: z.string().min(1, "Medication type is required."),
    status: z.string().min(1, "Status is required."),
    amount: z.number().min(0, "Amount should be positive."),
    date: z.string().min(1, "A date is required."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  // initialValues: {
  //   medicationName: "",
  //   medicationType: "",
  //   status: "",
  //   amount: 50,
  //   date: "",
  // },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axios.post('https://us-central1-fit5032-79317.cloudfunctions.net/logMedication', values);  
    toast({
      title: "Data submitted and imported successfully",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(response.data, null, 2))
      ),
    });
  } catch (error) {
    console.error('Error submitting and importing data:', error);
    let errorMessage = "An unexpected error occurred. Please try again.";
    toast({
      title: "Error submitting",
      variant: "destructive",
    });
  }
});

const minDate = new CalendarDate(1900, 1, 1);
const maxDate = today(getLocalTimeZone());
</script>
