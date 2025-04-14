<script setup>
// No props or logic needed for now
</script>

<template>
  <div class="slds-grid slds-grid_vertical">
    <div class="slds-col slds-size_1-of-1">
      <div class="slds-card">
        <div class="slds-card__body slds-card__body_inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add any custom styles here if needed */
</style>
