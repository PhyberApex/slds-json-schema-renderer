<template>
  <div class="slds-box slds-m-top_small">
    <div class="slds-text-heading_small slds-m-bottom_small">Type Information</div>
    <div class="slds-box slds-theme_shade">
      <div class="slds-text-body_regular">
        <div class="slds-grid slds-gutters">
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">Type</div>
            <div class="slds-badge">{{ schema.type }}</div>
          </div>
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">Description</div>
            <div>{{ schema.description || 'No description' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  schema: {
    type: Object,
    required: true,
  },
});
</script>

<style>
/* Add any custom styles here if needed */
</style>
