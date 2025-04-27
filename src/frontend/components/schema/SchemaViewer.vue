<script setup>
import { schemaUtils } from '@/utils/schemaRegistry'
import { computed, provide, ref } from 'vue'
import SchemaLayout from '../layout/SchemaLayout.vue'
import NoPropertiesMessage from './NoPropertiesMessage.vue'
import PlainSchemaView from './PlainSchemaView.vue'
import SchemaEnum from './SchemaEnum.vue'
import SchemaHeader from './SchemaHeader.vue'
import SchemaTabs from './SchemaTabs.vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    default: null,
  },
  isRoot: {
    type: Boolean,
    default: true,
  },
})

// State for active tab
const activeTab = ref('visual')

// If this is the root component, use the schema as the rootSchema
const rootSchema = computed(() => (props.isRoot ? props.schema : props.rootSchema))

// Provide the rootSchema to all child components
provide('rootSchema', rootSchema)

// Get the appropriate component for the schema type
const schemaComponent = computed(() => schemaUtils.getComponentForSchema(props.schema))
</script>

<template>
  <SchemaLayout>
    <div class="slds-tabs_default">
      <SchemaTabs v-model="activeTab" />

      <div :class="{ 'slds-show': activeTab === 'visual', 'slds-hide': activeTab !== 'visual' }">
        <div class="slds-p-around_medium">
          <SchemaHeader :schema="schema" />

          <div class="slds-m-top_medium">
            <component
              :is="schemaComponent"
              v-if="schemaComponent"
              :schema="schema"
              :root-schema="rootSchema"
            />
            <NoPropertiesMessage v-else />

            <SchemaEnum
              v-if="schema.enum"
              :values="schema.enum"
              class="slds-m-top_medium"
            />
          </div>
        </div>
      </div>

      <div :class="{ 'slds-show': activeTab === 'plain', 'slds-hide': activeTab !== 'plain' }">
        <div class="slds-p-around_medium">
          <PlainSchemaView :schema="schema" />
        </div>
      </div>
    </div>
  </SchemaLayout>
</template>

<style>
/* Add any custom styles here if needed */
</style>
