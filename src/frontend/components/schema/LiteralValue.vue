<script setup>
import { formatLiteral, isCompositeLiteral } from '@/utils/formatLiteral.js'

defineProps({
  value: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <pre v-if="isCompositeLiteral(value)" class="slds-box slds-m-vertical_xx-small"><code>{{ formatLiteral(value) }}</code></pre>
  <div v-else class="slds-badge slds-badge_inverse">
    {{ formatLiteral(value) }}
  </div>
</template>
