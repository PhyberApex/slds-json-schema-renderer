<script setup>
import NoPropertiesMessage from '@/components/schema/NoPropertiesMessage.vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
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

// Check if schema has constraints
const hasConstraints = computed(() => {
  const constraintProps = ['minItems', 'maxItems', 'uniqueItems']
  return constraintProps.some(prop => prop in props.schema)
})

// Get the type of items in the array
const getItemsType = computed(() => {
  if (!props.schema.items)
    return 'Not defined'
  if (Array.isArray(props.schema.items))
    return 'Tuple'
  return props.schema.items.type || 'Not specified'
})
</script>

<template>
  <div class="array-schema">
    <div class="slds-box slds-theme_shade">
      <div class="slds-grid slds-gutters">
        <div class="slds-col">
          <div class="slds-text-title_caps slds-m-bottom_xx-small">
            Type
          </div>
          <div class="slds-badge">
            array
          </div>
        </div>
        <div v-if="schema.items" class="slds-col">
          <div class="slds-text-title_caps slds-m-bottom_xx-small">
            Items Type
          </div>
          <div class="slds-badge">
            {{ getItemsType }}
          </div>
        </div>
      </div>
    </div>

    <SchemaConstraints v-if="hasConstraints" :schema="schema" />

    <div v-if="schema.items" class="slds-m-top_medium">
      <div class="slds-text-heading_small slds-m-bottom_small">
        Items Schema
      </div>
      <!-- Handle tuple validation (items is an array) -->
      <template v-if="Array.isArray(schema.items)">
        <div v-for="(itemSchema, index) in schema.items" :key="index" class="slds-m-bottom_medium">
          <div class="slds-text-title_caps slds-m-bottom_xx-small">
            Index {{ index }}
          </div>
          <SchemaViewer :schema="itemSchema" :root-schema="rootSchema" :is-root="false" />
        </div>
      </template>

      <!-- Handle single schema for all items -->
      <template v-else>
        <SchemaViewer :schema="schema.items" :root-schema="rootSchema" :is-root="false" />
      </template>
    </div>
    <NoPropertiesMessage
      v-else
      title="No Items Defined"
      message="This array doesn't have any items defined in the schema."
    />

    <div v-if="schema.contains" class="slds-m-top_medium">
      <div class="slds-text-heading_small slds-m-bottom_small">
        Contains
      </div>
      <SchemaViewer :schema="schema.contains" :root-schema="rootSchema" :is-root="false" />
    </div>

    <div v-if="schema.additionalItems !== undefined && Array.isArray(schema.items)" class="slds-m-top_medium">
      <div class="slds-text-heading_small slds-m-bottom_small">
        Additional Items
      </div>
      <div v-if="typeof schema.additionalItems === 'boolean'" class="slds-m-top_xx-small">
        <span :class="schema.additionalItems ? 'status-allowed' : 'status-denied'">
          {{ schema.additionalItems ? 'Allowed' : 'Not allowed' }}
        </span>
      </div>
      <SchemaViewer v-else :schema="schema.additionalItems" :root-schema="rootSchema" :is-root="false" />
    </div>
  </div>
</template>

<style>
.array-schema {
  padding: 0.5rem;
}

.status-allowed {
  color: #1589ee;
  font-weight: bold;
}

.status-denied {
  color: #c23934;
  font-weight: bold;
}
</style>
