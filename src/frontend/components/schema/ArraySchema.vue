<template>
  <div>
    <div>
      <span>Type: array</span>
    </div>

    <SchemaConstraints v-if="hasConstraints" :schema="schema" />

    <div v-if="schema.items">
      <div>Items:</div>
      <NestedSchemaContainer>
        <!-- Handle tuple validation (items is an array) -->
        <template v-if="Array.isArray(schema.items)">
          <div v-for="(itemSchema, index) in schema.items" :key="index">
            <div>Index {{ index }}:</div>
            <SchemaViewer :schema="itemSchema" :root-schema="rootSchema" :is-root="false" />
          </div>
        </template>

        <!-- Handle single schema for all items -->
        <template v-else>
          <SchemaViewer :schema="schema.items" :root-schema="rootSchema" :is-root="false" />
        </template>
      </NestedSchemaContainer>
    </div>
    <NoPropertiesMessage
      v-else
      title="No Items Defined"
      message="This array doesn't have any items defined in the schema."
    />

    <div v-if="schema.contains">
      <div>Contains:</div>
      <NestedSchemaContainer>
        <SchemaViewer :schema="schema.contains" :root-schema="rootSchema" :is-root="false" />
      </NestedSchemaContainer>
    </div>

    <div v-if="schema.additionalItems !== undefined && Array.isArray(schema.items)">
      <div>Additional Items:</div>
      <div v-if="typeof schema.additionalItems === 'boolean'">
        <span :class="schema.additionalItems ? 'status-allowed' : 'status-denied'">
          {{ schema.additionalItems ? 'Allowed' : 'Not allowed' }}
        </span>
      </div>
      <NestedSchemaContainer v-else>
        <SchemaViewer :schema="schema.additionalItems" :root-schema="rootSchema" :is-root="false" />
      </NestedSchemaContainer>
    </div>

    <div v-if="schema.items" class="slds-box slds-m-top_small">
      <div class="slds-text-heading_small slds-m-bottom_small">Array Items</div>
      <div class="slds-box slds-theme_shade">
        <div class="slds-text-body_regular">
          <div class="slds-grid slds-gutters">
            <div class="slds-col">
              <div class="slds-text-title_caps slds-m-bottom_xx-small">Type</div>
              <div class="slds-badge">{{ schema.items.type }}</div>
            </div>
            <div class="slds-col">
              <div class="slds-text-title_caps slds-m-bottom_xx-small">Description</div>
              <div>{{ schema.items.description || 'No description' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SchemaViewer from '@/components/schema/SchemaViewer.vue';
import NestedSchemaContainer from '@/components/schema/NestedSchemaContainer.vue';
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue';
import NoPropertiesMessage from '@/components/schema/NoPropertiesMessage.vue';

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    required: true,
  },
});

// Check if schema has constraints
const hasConstraints = computed(() => {
  const constraintProps = ['minItems', 'maxItems', 'uniqueItems'];
  return constraintProps.some(prop => prop in props.schema);
});
</script>

<style>
/* Add any custom styles here if needed */
</style>
