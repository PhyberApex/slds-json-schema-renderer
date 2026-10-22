<script setup>
import { computed, provide, ref } from 'vue'
import { applicatorKeywords, compositionKeywords, isSchemaObject, schemaUtils } from '@/utils/schemaRegistry'
import SchemaLayout from '../layout/SchemaLayout.vue'
import ApplicatorsSection from './ApplicatorsSection.vue'
import CompositionSchema from './CompositionSchema.vue'
import PlainSchemaView from './PlainSchemaView.vue'
import SchemaHeader from './SchemaHeader.vue'
import Tabs from './Tabs.vue'
import UnknownSchemaMessage from './UnknownSchemaMessage.vue'

const props = defineProps({
  schema: {
    type: [Object, Boolean],
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

const VIEW_TABS = [
  { id: 'visual', label: 'Visual' },
  { id: 'plain', label: 'Plain JSON' },
]
const activeTab = ref('visual')

// If this is the root component, use the schema as the rootSchema
const rootSchema = computed(() => (props.isRoot ? props.schema : props.rootSchema))

// Provide the rootSchema to all child components
provide('rootSchema', rootSchema)

// Get the appropriate component for the schema type
const schemaComponent = computed(() => schemaUtils.getComponentForSchema(props.schema))
const compositions = computed(() => compositionKeywords(props.schema))
const ANNOTATION_KEYWORDS = ['readOnly', 'writeOnly', 'deprecated', '$comment']
const hasApplicators = computed(() =>
  applicatorKeywords(props.schema).length > 0
  || ANNOTATION_KEYWORDS.some(keyword => isSchemaObject(props.schema) && keyword in props.schema),
)
const isUnknown = computed(() => !schemaComponent.value && compositions.value.length === 0 && !hasApplicators.value)
const schemaKeywords = computed(() => (isSchemaObject(props.schema) ? Object.keys(props.schema).filter(key => key !== '_metadata') : []))
</script>

<template>
  <SchemaLayout>
    <Tabs v-model="activeTab" :tabs="VIEW_TABS">
      <template #panel="{ tab }">
        <div v-if="tab.id === 'visual'" class="slds-p-around_medium">
          <SchemaHeader :schema="schema" />

          <div class="slds-m-top_medium">
            <component
              :is="schemaComponent"
              v-if="schemaComponent"
              :schema="schema"
              :root-schema="rootSchema"
            />
            <UnknownSchemaMessage v-else-if="isUnknown" :keywords="schemaKeywords" />
          </div>

          <div v-for="keyword in compositions" :key="keyword" class="slds-m-top_medium">
            <CompositionSchema :schema="schema" :keyword="keyword" :root-schema="rootSchema" />
          </div>

          <ApplicatorsSection v-if="hasApplicators" :schema="schema" :root-schema="rootSchema" />
        </div>

        <div v-else class="slds-p-around_medium">
          <PlainSchemaView :schema="schema" />
        </div>
      </template>
    </Tabs>
  </SchemaLayout>
</template>

<style>
/* Add any custom styles here if needed */
</style>
