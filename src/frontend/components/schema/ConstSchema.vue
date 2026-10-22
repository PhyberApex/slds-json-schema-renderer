<script setup>
import { computed } from 'vue'
import LiteralValue from '@/components/schema/LiteralValue.vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'
import { formatTypeLabel } from '@/utils/schemaRegistry.js'

const props = defineProps({
  schema: {
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
      <span v-if="formatTypeLabel(schema)" class="slds-badge slds-m-left_x-small">{{ formatTypeLabel(schema) }}</span>
    </div>
    <LiteralValue :value="constValue" />

    <SchemaConstraints :schema="schema" :exclude="['const']" />
  </div>
</template>
