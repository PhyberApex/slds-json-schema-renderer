<script setup>
import { computed } from 'vue'
import LiteralValue from '@/components/schema/LiteralValue.vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'
import { isCompositeLiteral } from '@/utils/formatLiteral.js'
import { formatTypeLabel } from '@/utils/schemaRegistry.js'

const props = defineProps({
  schema: {
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
      <span v-if="formatTypeLabel(schema)" class="slds-badge slds-m-left_x-small">{{ formatTypeLabel(schema) }}</span>
    </div>
    <div class="slds-grid slds-wrap slds-gutters">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="slds-col slds-p-around_xx-small"
        :class="isCompositeLiteral(value) ? 'slds-size_1-of-1' : 'slds-size_1-of-3'"
      >
        <LiteralValue :value="value" />
      </div>
    </div>

    <SchemaConstraints :schema="schema" />
  </div>
</template>
