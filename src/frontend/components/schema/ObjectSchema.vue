<template>
  <div>
    <div>
      <div>Type: object</div>
    </div>

    <SchemaConstraints v-if="hasConstraints" :schema="schema" />

    <div v-if="schema.required && schema.required.length > 0">
      <span>Required properties:</span>
      <span>{{ schema.required.join(', ') }}</span>
    </div>

    <div v-if="hasProperties">
      <div class="slds-box slds-m-top_small">
        <div class="slds-text-heading_small slds-m-bottom_small">Properties</div>
        <div class="slds-table_container">
          <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead>
              <tr class="slds-line-height_reset">
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Property">Property</div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Type">Type</div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Description">Description</div>
                </th>
                <th class="slds-text-title_caps" scope="col">
                  <div class="slds-truncate" title="Required">Required</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(property, name) in schema.properties" :key="name">
                <tr class="slds-hint-parent">
                  <td>
                    <div class="slds-truncate" :title="name">{{ name }}</div>
                  </td>
                  <td>
                    <div class="slds-truncate">
                      <span class="slds-badge">{{ property.type }}</span>
                      <button
                        v-if="isExpandable(property)"
                        class="slds-button slds-button_icon slds-button_icon_small slds-m-left_x-small"
                        :title="expandedProperties[name] ? 'Collapse' : 'Expand'"
                        @click="toggleProperty(name)"
                      >
                        <img
                          src="@slds/icons/utility/switch.svg"
                          class="slds-button__icon"
                          alt=""
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="slds-truncate" :title="property.description">
                      {{ property.description || 'No description' }}
                    </div>
                  </td>
                  <td>
                    <div class="slds-truncate">
                      <span v-if="isRequired(name)" class="slds-badge slds-badge_success"
                        >Required</span
                      >
                      <span v-else class="slds-badge slds-badge_inverse">Optional</span>
                    </div>
                  </td>
                </tr>
                <tr v-if="isExpandable(property) && expandedProperties[name]">
                  <td colspan="4" class="slds-p-around_medium">
                    <div class="slds-box slds-theme_shade">
                      <SchemaViewer :schema="property" :root-schema="rootSchema" :is-root="false" />
                    </div>
                  </td>
                </tr>
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
          <NestedSchemaContainer>
            <div>
              <div>
                <span>Pattern:</span>
                <code>{{ pattern }}</code>
              </div>
            </div>
            <SchemaViewer :schema="propSchema" :root-schema="rootSchema" :is-root="false" />
          </NestedSchemaContainer>
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
      <NestedSchemaContainer v-else>
        <SchemaViewer
          :schema="schema.additionalProperties"
          :root-schema="rootSchema"
          :is-root="false"
        />
      </NestedSchemaContainer>
    </div>
    
    <!-- No properties message -->
    <NoPropertiesMessage v-if="!hasProperties" />

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue';
import NestedSchemaContainer from '@/components/schema/NestedSchemaContainer.vue';
import SchemaViewer from '@/components/schema/SchemaViewer.vue';
import NoPropertiesMessage from '@/components/schema/NoPropertiesMessage.vue';

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    required: true,
  },
});

// Track which properties are expanded
const expandedProperties = ref({});

// Check if schema has constraints
const hasConstraints = computed(() => {
  const constraintProps = ['minProperties', 'maxProperties'];
  return constraintProps.some(prop => prop in props.schema);
});

// Check if schema has properties
const hasProperties = computed(() => {
  return (props.schema.properties && Object.keys(props.schema.properties).length > 0) || (props.schema.patternProperties && Object.keys(props.schema.patternProperties).length > 0);
});

// Check if a property is required
const isRequired = propName => {
  return props.schema.required && props.schema.required.includes(propName);
};

// Check if a property is expandable (object or array)
const isExpandable = property => {
  return (
    property.type === 'object' ||
    property.type === 'array' ||
    (Array.isArray(property.type) &&
      (property.type.includes('object') || property.type.includes('array')))
  );
};

// Toggle property expansion
const toggleProperty = name => {
  expandedProperties.value[name] = !expandedProperties.value[name];
};
</script>

<style>
.slds-button_icon_small {
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
}

.slds-button_icon_small .slds-button__icon {
  width: 0.75rem;
  height: 0.75rem;
  filter: brightness(0);
}
</style>
