<script setup>
import { computed } from 'vue'
import CollapsibleSection from '@/components/schema/CollapsibleSection.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})

const conditional = computed(() =>
  ['if', 'then', 'else'].filter(keyword => keyword in props.schema),
)

const dependencyEntries = computed(() => {
  const sources = ['dependencies', 'dependentRequired', 'dependentSchemas']
  return sources.flatMap(keyword =>
    Object.entries(props.schema[keyword] ?? {}).map(([property, value]) => ({
      keyword,
      property,
      requiredProperties: Array.isArray(value) ? value : null,
      schema: Array.isArray(value) ? null : value,
    })),
  )
})

const annotationBadges = computed(() =>
  [
    ['readOnly', 'read-only'],
    ['writeOnly', 'write-only'],
    ['deprecated', 'deprecated'],
  ]
    .filter(([keyword]) => props.schema[keyword] === true)
    .map(([, label]) => label),
)

const hasAnnotations = computed(
  () => annotationBadges.value.length > 0 || typeof props.schema.$comment === 'string',
)

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
</script>

<template>
  <div class="applicators">
    <div v-if="hasAnnotations" class="annotations slds-m-top_medium">
      <span v-for="label in annotationBadges" :key="label" class="slds-badge slds-badge_inverse slds-m-right_xx-small">
        {{ label }}
      </span>
      <p v-if="schema.$comment" class="slds-text-body_small slds-text-color_weak slds-m-top_x-small">
        <code>$comment</code>: {{ schema.$comment }}
      </p>
    </div>

    <CollapsibleSection v-if="'not' in schema" title="Not" :initially-expanded="expanded" class="slds-m-top_medium">
      <template #badge>
        <span class="slds-badge slds-badge_error slds-m-left_x-small">must not match</span>
      </template>
      <SchemaViewer :schema="schema.not" :is-root="false" />
    </CollapsibleSection>

    <CollapsibleSection v-if="conditional.length > 0" title="Conditional" :initially-expanded="expanded" class="slds-m-top_medium">
      <div class="slds-grid slds-gutters slds-wrap">
        <div v-for="keyword in conditional" :key="keyword" class="slds-col slds-size_1-of-1 slds-large-size_1-of-3">
          <div class="slds-text-title_caps slds-m-bottom_x-small">
            {{ capitalize(keyword) }}
          </div>
          <SchemaViewer :schema="schema[keyword]" :is-root="false" />
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection v-if="dependencyEntries.length > 0" title="Dependencies" :initially-expanded="expanded" class="dependencies slds-m-top_medium">
      <table class="slds-table slds-table_cell-buffer slds-table_bordered">
        <thead>
          <tr class="slds-line-height_reset">
            <th class="slds-text-title_caps" scope="col">
              When present
            </th>
            <th class="slds-text-title_caps" scope="col">
              Requires
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in dependencyEntries" :key="`${entry.keyword}:${entry.property}`">
            <td><code>{{ entry.property }}</code></td>
            <td>
              <template v-if="entry.requiredProperties">
                {{ entry.requiredProperties.join(', ') }}
              </template>
              <SchemaViewer v-else :schema="entry.schema" :is-root="false" />
            </td>
          </tr>
        </tbody>
      </table>
    </CollapsibleSection>

    <CollapsibleSection v-if="'propertyNames' in schema" title="Property Names" :initially-expanded="expanded" class="slds-m-top_medium">
      <SchemaViewer :schema="schema.propertyNames" :is-root="false" />
    </CollapsibleSection>
  </div>
</template>
