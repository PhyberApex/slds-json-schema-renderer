<template>
  <footer class="slds-p-around_medium slds-theme_shade slds-text-align_center slds-text-body_small slds-mt-auto">
    <div class="slds-grid slds-grid_align-spread slds-wrap">
      <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-p-vertical_x-small">
        <span v-if="description" class="slds-text-color_weak">{{ description }}</span>
      </div>

      <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-p-vertical_x-small">
        <span class="slds-text-color_weak">
          {{ schemaCount }} schema{{ schemaCount !== 1 ? 's' : '' }} documented
        </span>
      </div>

      <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-p-vertical_x-small">
        <span class="slds-text-color_weak">
          Generated at: {{ formatDate(generatedAt) }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    default: ''
  },
  generatedAt: {
    type: String,
    default: () => new Date().toISOString()
  },
  schemaCount: {
    type: Number,
    default: 0
  }
});

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString();
};
</script>