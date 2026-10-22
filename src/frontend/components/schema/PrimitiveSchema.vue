<script setup>
import { computed } from 'vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'
import { isNullable, normalizeTypes } from '@/utils/schemaRegistry.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
})

const concreteTypes = computed(() => normalizeTypes(props.schema).filter(type => type !== 'null'))
const nullable = computed(() => isNullable(props.schema))
</script>

<template>
  <div class="slds-box slds-m-top_small">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Type Information
    </div>
    <div class="slds-box slds-theme_shade">
      <div class="slds-text-body_regular">
        <div class="slds-grid slds-gutters">
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">
              Type
            </div>
            <span v-for="type in concreteTypes" :key="type" class="slds-badge slds-m-right_xx-small">
              {{ type }}
            </span>
            <span v-if="nullable" class="slds-badge slds-badge_lightest">nullable</span>
          </div>
          <div class="slds-col">
            <div class="slds-text-title_caps slds-m-bottom_xx-small">
              Description
            </div>
            <div>{{ schema.description || 'No description' }}</div>
          </div>
        </div>
      </div>
    </div>

    <SchemaConstraints :schema="schema" />
  </div>
</template>
