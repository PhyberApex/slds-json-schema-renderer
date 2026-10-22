<script setup>
defineProps({
  schema: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Type Information
    </div>
    <span class="slds-badge">any</span>
    <p class="slds-text-body_small slds-text-color_weak slds-m-top_x-small">
      This schema declares no type and no structural constraints, so any JSON value is accepted.
    </p>
  </div>
</template>
