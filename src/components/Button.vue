<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  style: {
    type: String,
    default: "filled",
  },
});

const emits = defineEmits(["click"]);

const buttonClasses = computed(() => {
  let classes = ["btn"];

  // Add color class
  classes.push(`btn-${props.color}`);

  // Add size class
  if (props.size === "small") {
    classes.push("btn-sm");
  } else if (props.size === "large") {
    classes.push("btn-lg");
  }

  // Add style class
  if (props.style === "outlined") {
    classes.push("btn-outline");
  }

  return classes.join(" ");
});

const handleClick = (event) => {
  if (!props.disabled) {
    emits("click", event);
    props.onClick(event);
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
