<template>
    <div class="border rounded-lg shadow-sm overflow-hidden p-4">
  <form class="space-y-8" @submit="onSubmit">
    <FormField name="medication">
      <FormItem class="flex flex-col">
        <FormLabel>Medication Name</FormLabel>
        <Input
          type="medication"
          placeholder="Medicine name"
          class="w-[240px]"
        />
      </FormItem>
      <FormItem class="flex flex-col">
        <FormLabel>Type</FormLabel>
        <Select>
          <SelectTrigger class="w-[240px]">
            <SelectValue placeholder="Select a medication" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>My Medication</SelectLabel>
              <SelectItem value="aspirin">Aspirin</SelectItem>
              <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
              <SelectItem value="acetaminophen">Acetaminophen</SelectItem>
              <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormItem>
      <FormItem class="flex flex-col">
        <FormLabel>Status</FormLabel>
        <Select>
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
      </FormItem> 
      <FormItem class="flex flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="[
                  'w-[240px] ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                ]"
              >
                <span>{{
                  value ? df.format(toDate(value)) : "Pick a date"
                }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="value"
              calendar-label="Date of birth"
              initial-focus
              :min-value="minDate"
              :max-value="maxDate"
              @update:model-value="handleDateUpdate"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Submit </Button>
  </form>
  </div>
</template>

<script setup>
import { computed, h, ref } from "vue";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
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

const df = new DateFormatter("en-US", { dateStyle: "long" });

const formSchema = toTypedSchema(
  z.object({
    dob: z
      .string()
      .refine((v) => v, { message: "A date of birth is required." }),
  })
);

const placeholder = ref();
const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
});

const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: (val) => val,
});

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});

const handleDateUpdate = (v) => {
  if (v) {
    setFieldValue("dob", v.toString());
  } else {
    setFieldValue("dob", undefined);
  }
};

const minDate = new CalendarDate(1900, 1, 1);
const maxDate = today(getLocalTimeZone());
</script>
