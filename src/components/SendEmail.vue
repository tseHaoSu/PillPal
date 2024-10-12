<template>
  <div class="border rounded-lg shadow-sm overflow-hidden p-4">
    <form class="space-y-8" @submit="onSubmit">
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
                      'w-[280px] justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{
                    field.value
                      ? df.format(parseDate(field.value).toDate(getLocalTimeZone()))
                      : "Pick a date"
                  }}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                :model-value="field.value ? parseDate(field.value) : undefined"
                @update:model-value="
                  (date) => field.onChange(date ? date.toString() : undefined)
                "
                initial-focus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="email">
        <FormItem class="flex flex-col">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <div class="flex w-full max-w-sm items-center gap-1.5">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                v-bind="field"
              />
            </div>
          </FormControl>
          <FormMessage />
          <FormDescription>
          The email address where the med data will be sent.
        </FormDescription>
        </FormItem>
      </FormField>
      <Button type="submit">Send</Button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const df = new DateFormatter("en-US", { dateStyle: "long" });

const formSchema = toTypedSchema(
  z.object({
    date: z.string().min(1, "A date is required."),
    email: z.string().email("Invalid email address."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted with values:", values);
  // Handle form submission here
});
</script>