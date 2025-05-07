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

const constValue = computed(() => props.schema.const)
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Const Value
    </div>
    <div class="slds-grid slds-wrap slds-gutters">
      <div class="slds-col slds-size_1-of-1 slds-p-around_xx-small">
        <div class="slds-badge slds-badge_inverse">
          {{ constValue }}
        </div>
      </div>
    </div>
  </div>
</template>
