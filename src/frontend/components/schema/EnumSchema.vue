<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    required: true,
  },
})

const values = computed(() => props.schema.enum)
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Enum Values
    </div>
    <div class="slds-grid slds-wrap slds-gutters">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="slds-col slds-size_1-of-3 slds-p-around_xx-small"
      >
        <div class="slds-badge slds-badge_inverse">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
