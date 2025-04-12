<template>
  <SchemaLayout>
    <div class="slds-tabs_default">
      <SchemaTabs v-model="activeTab" />

      <div :class="{ 'slds-show': activeTab === 'visual', 'slds-hide': activeTab !== 'visual' }">
        <div class="slds-p-around_medium">
          <SchemaHeader :schema="resolvedSchema" />

          <div class="slds-m-top_medium">
            <component
              :is="schemaComponent"
              v-if="schemaComponent"
              :schema="resolvedSchema"
              :rootSchema="rootSchema"
              :compositionType="compositionType"
              @navigate-to-definition="handleNavigateToDefinition"
            />
            <NoPropertiesMessage v-else />

            <SchemaEnum
              v-if="resolvedSchema.enum"
              :values="resolvedSchema.enum"
              class="slds-m-top_medium"
            />
          </div>
        </div>
      </div>

      <div :class="{ 'slds-show': activeTab === 'plain', 'slds-hide': activeTab !== 'plain' }">
        <div class="slds-p-around_medium">
          <PlainSchemaView :schema="resolvedSchema" />
        </div>
      </div>
    </div>
  </SchemaLayout>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import { schemaUtils } from '@/utils/schemaRegistry';
import SchemaLayout from '../layout/SchemaLayout.vue';
import SchemaTabs from './SchemaTabs.vue';
import SchemaHeader from './SchemaHeader.vue';
import PlainSchemaView from './PlainSchemaView.vue';
import SchemaEnum from './SchemaEnum.vue';
import NoPropertiesMessage from './NoPropertiesMessage.vue';

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  rootSchema: {
    type: Object,
    default: null
  },
  isRoot: {
    type: Boolean,
    default: true
  }
});

// State for active tab
const activeTab = ref('visual');

// If this is the root component, use the schema as the rootSchema
const rootSchema = computed(() => props.isRoot ? props.schema : props.rootSchema);

// Resolve all references in the schema
const resolvedSchema = computed(() => {
  return schemaUtils.resolveReferences(props.schema, rootSchema.value);
});

// Provide the rootSchema to all child components
provide('rootSchema', rootSchema);

// Get the appropriate component for the schema type
const schemaComponent = computed(() => schemaUtils.getComponentForSchema(resolvedSchema.value));

// Get composition type if applicable
const compositionType = computed(() => schemaUtils.getCompositionType(resolvedSchema.value));

// Function to handle navigation to definition
const handleNavigateToDefinition = (data) => {
  const definitionElement = document.getElementById(`definition-${data.definitionName}`);

  if (definitionElement) {
    definitionElement.scrollIntoView({ behavior: 'smooth' });
    definitionElement.classList.add('highlight');
    setTimeout(() => {
      definitionElement.classList.remove('highlight');
    }, 2000);
  }
};
</script>

<style>
/* Add any custom styles here if needed */
</style>