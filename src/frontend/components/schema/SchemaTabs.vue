<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <ul class="slds-tabs_default__nav" role="tablist">
    <li
      class="slds-tabs_default__item"
      :class="{ 'slds-is-active': modelValue === 'visual' }"
      role="presentation"
    >
      <a
        class="slds-tabs_default__link"
        role="tab"
        tabindex="0"
        aria-selected="true"
        aria-controls="visual-tab"
        @click="$emit('update:modelValue', 'visual')"
      >
        <span class="slds-tabs_default__title">Visual</span>
      </a>
    </li>
    <li
      class="slds-tabs_default__item"
      :class="{ 'slds-is-active': modelValue === 'plain' }"
      role="presentation"
    >
      <a
        class="slds-tabs_default__link"
        role="tab"
        tabindex="0"
        aria-selected="true"
        aria-controls="plain-tab"
        @click="$emit('update:modelValue', 'plain')"
      >
        <span class="slds-tabs_default__title">Plain JSON</span>
      </a>
    </li>
  </ul>
</template>

<style>
/* Add any custom styles here if needed */
</style>
