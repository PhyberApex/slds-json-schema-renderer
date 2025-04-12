<template>
  <div class="slds-box slds-m-top_small">
    <div class="slds-text-heading_small slds-m-bottom_small">Type Information</div>
    <div class="slds-box slds-theme_shade">
      <div class="slds-text-body_regular">
        <div class="slds-grid slds-gutters">
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">Type</div>
            <div class="slds-badge">{{ schema.type }}</div>
          </div>
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">Description</div>
            <div>{{ schema.description || 'No description' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SchemaConstraints from "@/components/schema/SchemaConstraints.vue";

const props = defineProps({
  schema: {
    type: Object,
    required: true
  }
});

// Check if schema has constraints
const hasConstraints = computed(() => {
  const constraintProps = {
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf'],
    integer: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf']
  };

  const typeConstraints = constraintProps[props.schema.type] || [];
  return typeConstraints.some(prop => prop in props.schema);
});

// Get CSS class for type badge
const typeClass = computed(() => {
  const typeClasses = {
    string: 'type-string',
    number: 'type-number',
    integer: 'type-integer',
    boolean: 'type-boolean',
    null: 'type-null'
  };
  return typeClasses[props.schema.type] || '';
});

// Format value for display
const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  return value.toString();
};
</script>

<style>
/* Add any custom styles here if needed */
</style>