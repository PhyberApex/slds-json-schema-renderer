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

const constValue = computed(() => props.schema.const)
const isComposite = computed(() => isCompositeLiteral(constValue.value))
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Const Value
    </div>
    <pre v-if="isComposite" class="slds-box slds-m-vertical_xx-small"><code>{{ formatLiteral(constValue) }}</code></pre>
    <div v-else class="slds-badge slds-badge_inverse">
      {{ formatLiteral(constValue) }}
    </div>
  </div>
</template>
