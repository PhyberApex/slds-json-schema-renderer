<script setup>
defineProps({
  schema: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Boolean schema
    </div>
    <span class="slds-badge" :class="schema ? 'slds-badge_success' : 'slds-badge_inverse'">
      {{ schema ? 'Any value is allowed' : 'No value is allowed' }}
    </span>
  </div>
</template>
