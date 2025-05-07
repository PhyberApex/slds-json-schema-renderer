<script setup>
import NoPropertiesMessage from '@/components/schema/NoPropertiesMessage.vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import { schemaUtils } from '@/utils/schemaRegistry.js'
import { computed, ref } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    required: true,
  },
})

// Track which properties are expanded
const expandedProperties = ref({})

// Check if schema has properties
const hasProperties = computed(() => {
  return (
    (props.schema.properties && Object.keys(props.schema.properties).length > 0)
    || (props.schema.patternProperties && Object.keys(props.schema.patternProperties).length > 0)
  )
})

// Check if a property is required
function isRequired(propName) {
  return props.schema.required && props.schema.required.includes(propName)
}

function getTypeLabel(property) {
  if (property.type)
    return property.type
  if (schemaUtils.hasComposition(property))
    return 'composition'
  if (schemaUtils.isEnum(property))
    return 'enum'
  if (schemaUtils.isConst(property))
    return 'const'
  return 'No type found'
}

// Toggle property expansion
function toggleProperty(name) {
  expandedProperties.value[name] = !expandedProperties.value[name]
}
</script>

<template>
  <div>
    <div>
      <div>Type: object</div>
    </div>

    <SchemaConstraints :schema="schema" />

    <div v-if="schema.required && schema.required.length > 0">
      <span>Required properties:</span>
      <span>{{ schema.required.join(', ') }}</span>
    </div>

    <div v-if="hasProperties">
      <div class="slds-box slds-m-top_small">
        <div class="slds-text-heading_small slds-m-bottom_small">
          Properties
        </div>
        <div class="slds-table_container">
          <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead>
              <tr class="slds-line-height_reset">
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Property">
                    Property
                  </div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Type">
                    Type
                  </div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Description">
                    Description
                  </div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Required">
                    Required
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(property, name) in schema.properties" :key="name">
                <tr class="slds-hint-parent is-interactive" @click="toggleProperty(name)">
                  <td>
                    <div class="slds-truncate" :title="name">
                      <img
                        src="@slds/icons/utility/switch.svg"
                        class="slds-button__icon"
                        :class="{
                          expanded: expandedProperties[name],
                        }"
                        alt=""
                      >
                      {{ name }}
                    </div>
                  </td>
                  <td>
                    <div class="slds-truncate">
                      <span class="slds-badge">{{ getTypeLabel(property) }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="slds-truncate" :title="property.description">
                      {{ property.description || 'No description' }}
                    </div>
                  </td>
                  <td>
                    <div class="slds-truncate">
                      <span v-if="isRequired(name)" class="slds-badge slds-badge_success">Required</span>
                      <span v-else class="slds-badge slds-badge_inverse">Optional</span>
                    </div>
                  </td>
                </tr>
                <Transition>
                  <tr v-if="expandedProperties[name]">
                    <td colspan="4" class="slds-p-around_medium">
                      <div class="slds-box slds-theme_shade">
                        <SchemaViewer :schema="property" :root-schema="rootSchema" :is-root="false" />
                      </div>
                    </td>
                  </tr>
                </Transition>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="schema.patternProperties">
      <div>Pattern Properties</div>
      <div>
        <div v-for="(propSchema, pattern) in schema.patternProperties" :key="pattern">
          <div>
            <div>
              <span>Pattern:</span>
              <code>{{ pattern }}</code>
            </div>
          </div>
          <SchemaViewer :schema="propSchema" :root-schema="rootSchema" :is-root="false" />
        </div>
      </div>
    </div>

    <div v-if="schema.additionalProperties !== undefined">
      <div>Additional Properties</div>
      <div v-if="typeof schema.additionalProperties === 'boolean'">
        <span :class="schema.additionalProperties ? 'status-allowed' : 'status-denied'">
          {{ schema.additionalProperties ? 'Allowed' : 'Not allowed' }}
        </span>
      </div>

      <SchemaViewer
        v-else
        :schema="schema.additionalProperties"
        :root-schema="rootSchema"
        :is-root="false"
      />
    </div>

    <!-- No properties message -->
    <NoPropertiesMessage v-if="!hasProperties" />
  </div>
</template>

<style>
/* Icon rotation animation */
.slds-button__icon {
  width: 0.75rem;
  height: 0.75rem;
  filter: brightness(0);
  transition: transform 0.2s ease-in-out;
}

.slds-button__icon.expanded {
  transform: rotate(180deg);
}

/* Interactive cursor */
.is-interactive {
  cursor: pointer;
}

/* Transition for the expanding/collapsing row */
.v-enter-active {
  transition: all 0.3s ease-out;
  max-height: 500px; /* Set a reasonable max height */
  overflow: hidden;
}

.v-leave-active {
  transition: all 0.2s ease-in;
  max-height: 500px;
  overflow: hidden;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Optional: Add hover effect for better UX */
.slds-hint-parent.is-interactive:hover {
  background-color: #f3f3f3;
}

/* Optional: Add subtle shadow to expanded content */
.slds-box.slds-theme_shade {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
}
</style>
