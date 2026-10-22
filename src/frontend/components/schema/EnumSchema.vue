<script setup>
import { computed } from 'vue'
import { formatLiteral, isCompositeLiteral } from '@/utils/formatLiteral.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    default: null,
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
        class="slds-col slds-p-around_xx-small"
        :class="isCompositeLiteral(value) ? 'slds-size_1-of-1' : 'slds-size_1-of-3'"
      >
        <pre v-if="isCompositeLiteral(value)" class="slds-box slds-m-vertical_xx-small"><code>{{ formatLiteral(value) }}</code></pre>
        <div v-else class="slds-badge slds-badge_inverse">
          {{ formatLiteral(value) }}
        </div>
      </div>
    </div>
  </div>
</template>
