<template>
  <div class="schema-property slds-box slds-box_small slds-theme_default slds-m-vertical_x-small">
    <div
      class="slds-grid slds-grid_align-spread slds-p-bottom_x-small slds-border_bottom slds-m-bottom_x-small property-header"
    >
      <div class="slds-col">
        <span class="slds-text-title_bold slds-text-color_default">{{ name }}</span>
        <span v-if="required" class="slds-text-color_error slds-m-left_xx-small">*</span>
      </div>
      <div class="slds-col slds-text-align_right">
        <span class="slds-badge">{{ displayType }}</span>
      </div>
    </div>

    <div
      v-if="schema.description"
      class="slds-text-body_small slds-p-bottom_small property-description"
    >
      {{ schema.description }}
    </div>

    <SchemaConstraints v-if="hasConstraints" :schema="schema" />

    <SchemaEnum v-if="schema.enum" :values="schema.enum" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue';
import SchemaEnum from '@/components/schema/SchemaEnum.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  schema: {
    type: Object,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

// Get display type
const displayType = computed(() => {
  if (Array.isArray(props.schema.type)) {
    return props.schema.type.join(' | ');
  }
  return props.schema.type || 'any';
});

// Check if schema has constraints
const hasConstraints = computed(() => {
  const constraintProps = [
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'minLength',
    'maxLength',
    'pattern',
    'format',
    'multipleOf',
    'default',
    'minItems',
    'maxItems',
    'uniqueItems',
    'minProperties',
    'maxProperties',
  ];

  return constraintProps.some(prop => prop in props.schema);
});
</script>
