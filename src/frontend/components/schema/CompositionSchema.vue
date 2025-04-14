<script setup>
import NestedSchemaContainer from '@/components/schema/NestedSchemaContainer.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  compositionType: {
    type: String,
    required: true,
    validator: value => ['anyOf', 'oneOf', 'allOf'].includes(value),
  },
  rootSchema: {
    type: Object,
    required: true,
  },
})

// Track active tab
const activeTab = ref(0)

// Get the array of schemas based on composition type
const schemas = computed(() => {
  return props.schema[props.compositionType] || []
})

// Get the label for the composition type
const compositionTypeLabel = computed(() => {
  switch (props.compositionType) {
    case 'oneOf':
      return 'One Of (Choose One)'
    case 'anyOf':
      return 'Any Of (Choose Any)'
    case 'allOf':
      return 'All Of (Must Match All)'
    default:
      return props.compositionType
  }
})

// Get the CSS class for the composition type badge
const compositionTypeClass = computed(() => {
  switch (props.compositionType) {
    case 'oneOf':
      return 'slds-badge_success'
    case 'anyOf':
      return 'slds-badge_warning'
    case 'allOf':
      return 'slds-badge_inverse'
    default:
      return ''
  }
})

// Get the schema type for display
function getSchemaType(schema) {
  if (Array.isArray(schema.type)) {
    return schema.type.join(' | ')
  }
  return schema.type || 'object'
}

// Get the tab title for a schema
function getTabTitle(schema, index) {
  if (schema.title) {
    return schema.title
  }
  return `Option ${index + 1}`
}
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      <span class="slds-badge" :class="compositionTypeClass">{{ compositionTypeLabel }}</span>
    </div>

    <div class="slds-tabs_default">
      <ul class="slds-tabs_default__nav" role="tablist">
        <li
          v-for="(subSchema, index) in schemas"
          :key="index"
          class="slds-tabs_default__item"
          :class="{ 'slds-is-active': activeTab === index }"
          role="presentation"
        >
          <a
            class="slds-tabs_default__link"
            role="tab"
            tabindex="0"
            :aria-selected="activeTab === index"
            :aria-controls="`tab-${index}`"
            @click="activeTab = index"
          >
            <span class="slds-tabs_default__title">{{ getTabTitle(subSchema, index) }}</span>
          </a>
        </li>
      </ul>

      <div
        v-for="(subSchema, index) in schemas"
        :id="`tab-${index}`"
        :key="index"
        class="slds-tabs_default__content"
        :class="{ 'slds-show': activeTab === index, 'slds-hide': activeTab !== index }"
        role="tabpanel"
      >
        <div class="slds-p-around_medium">
          <div class="slds-text-title_caps slds-m-bottom_small">
            Schema Type: {{ getSchemaType(subSchema) }}
          </div>
          <NestedSchemaContainer>
            <SchemaViewer :schema="subSchema" :root-schema="rootSchema" :is-root="false" />
          </NestedSchemaContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slds-tabs_default__content {
  border: 1px solid #dddbda;
  border-top: 0;
  border-radius: 0 0 0.25rem 0.25rem;
  background-color: #fff;
}
</style>
