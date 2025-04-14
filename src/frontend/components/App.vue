<script setup>
import { ref } from 'vue'
import FooterLayout from './layout/FooterLayout.vue'
import HeaderLayout from './layout/HeaderLayout.vue'
import SidebarLayout from './layout/SidebarLayout.vue'
import SchemaViewer from './schema/SchemaViewer.vue'

// Props definitions
const props = defineProps({
  title: {
    type: String,
    default: 'JSON Schema Documentation',
  },
  description: {
    type: String,
    default: '',
  },
  schemas: {
    type: Array,
    default: () => [],
  },
  generatedAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
})

// Initialize with first schema if available
const selectedSchema = ref(props.schemas.length > 0 ? props.schemas[0] : null)

function handleSelectSchema(schema) {
  selectedSchema.value = schema
}
</script>

<template>
  <div class="slds-grid slds-grid_vertical">
    <HeaderLayout :title="title" />

    <div class="slds-grid slds-gutters slds-grid_vertical-fill">
      <div class="slds-col slds-size_2-of-12">
        <SidebarLayout
          :schemas="schemas"
          :selected-schema="selectedSchema"
          @select-schema="handleSelectSchema"
        />
      </div>

      <div class="slds-col slds-size_10-of-12">
        <SchemaViewer v-if="selectedSchema" :schema="selectedSchema.schema" :is-root="true" />
        <div v-else class="slds-p-around_medium">
          <div class="slds-text-align_center">
            <!-- Placeholder illustration -->
            <svg viewBox="0 0 454 272" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <circle
                  vector-effect="non-scaling-stroke"
                  cx="150"
                  cy="150"
                  r="40"
                  fill="#F9F9F9"
                />
                <circle
                  vector-effect="non-scaling-stroke"
                  cx="150"
                  cy="150"
                  r="30"
                  fill="#ECEBEA"
                />
                <circle
                  vector-effect="non-scaling-stroke"
                  cx="150"
                  cy="150"
                  r="20"
                  fill="#D9D7D5"
                />
              </g>
            </svg>
          </div>
          <div class="slds-text-align_center slds-m-top_medium">
            <h3 class="slds-text-heading_medium">
              No Schema Selected
            </h3>
            <p class="slds-text-body_regular slds-m-top_small">
              Select a schema from the sidebar to view its documentation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <FooterLayout :description="description" :generated-at="generatedAt" :schema-count="schemas.length" />
  </div>
</template>
