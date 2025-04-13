<template>
  <div class="slds-grid slds-grid_vertical">
    <Header :title="title" />

    <div class="slds-grid slds-gutters slds-grid_vertical-fill">
      <div class="slds-col slds-size_2-of-12">
        <Sidebar
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
                ></circle>
                <circle
                  vector-effect="non-scaling-stroke"
                  cx="150"
                  cy="150"
                  r="30"
                  fill="#ECEBEA"
                ></circle>
                <circle
                  vector-effect="non-scaling-stroke"
                  cx="150"
                  cy="150"
                  r="20"
                  fill="#D9D7D5"
                ></circle>
              </g>
            </svg>
          </div>
          <div class="slds-text-align_center slds-m-top_medium">
            <h3 class="slds-text-heading_medium">No Schema Selected</h3>
            <p class="slds-text-body_regular slds-m-top_small">
              Select a schema from the sidebar to view its documentation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer :description="description" :generated-at="generatedAt" :schema-count="schemas.length" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './layout/Header.vue';
import Sidebar from './layout/Sidebar.vue';
import Footer from './layout/Footer.vue';
import SchemaViewer from './schema/SchemaViewer.vue';

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
});

// Initialize with first schema if available
const selectedSchema = ref(props.schemas.length > 0 ? props.schemas[0] : null);

const handleSelectSchema = schema => {
  selectedSchema.value = schema;
};
</script>
