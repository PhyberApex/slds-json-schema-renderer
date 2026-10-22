<script setup>
import { computed, ref } from 'vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import Tabs from '@/components/schema/Tabs.vue'
import { formatTypeLabel } from '@/utils/schemaRegistry.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
    validator: value => ['allOf', 'anyOf', 'oneOf'].includes(value),
  },
})

const COMPOSITION_DISPLAY = {
  oneOf: { label: 'One Of (Choose One)', badgeClass: 'slds-badge_success' },
  anyOf: { label: 'Any Of (Choose Any)', badgeClass: 'slds-badge_warning' },
  allOf: { label: 'All Of (Must Match All)', badgeClass: 'slds-badge_inverse' },
}

const display = computed(() => COMPOSITION_DISPLAY[props.keyword])
const stacked = computed(() => props.keyword === 'allOf')

const activeTab = ref(0)

const schemas = computed(() => props.schema[props.keyword] || [])

const tabs = computed(() =>
  schemas.value.map((subSchema, index) => ({ id: index, label: getTabTitle(subSchema, index), schema: subSchema })),
)

// Branches that declare no type inherit the parent's for display only
function getSchemaType(schema) {
  return formatTypeLabel(schema) || formatTypeLabel(props.schema) || 'any'
}

function getTabTitle(schema, index) {
  if (schema?.title) {
    return schema.title
  }
  return `${stacked.value ? 'Part' : 'Option'} ${index + 1}`
}
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      <span class="slds-badge" :class="display.badgeClass">{{ display.label }}</span>
    </div>

    <div v-if="stacked">
      <div v-for="(subSchema, index) in schemas" :key="index" class="slds-m-bottom_medium">
        <div class="slds-text-title_caps slds-m-bottom_x-small">
          {{ getTabTitle(subSchema, index) }} · {{ getSchemaType(subSchema) }}
        </div>
        <SchemaViewer :schema="subSchema" :is-root="false" />
      </div>
    </div>

    <Tabs v-else v-model="activeTab" :tabs="tabs" class="composition-tabs">
      <template #panel="{ tab }">
        <div class="slds-p-around_medium">
          <div class="slds-text-title_caps slds-m-bottom_small">
            Schema Type: {{ getSchemaType(tab.schema) }}
          </div>
          <SchemaViewer :schema="tab.schema" :is-root="false" />
        </div>
      </template>
    </Tabs>
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
