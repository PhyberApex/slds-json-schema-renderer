<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
})

const constraints = computed(() => {
  const result = {}
  const constraintKeys = [
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'minLength',
    'maxLength',
    'pattern',
    'minItems',
    'maxItems',
    'uniqueItems',
    'minProperties',
    'maxProperties',
  ]

  constraintKeys.forEach((key) => {
    if (props.schema[key] !== undefined) {
      result[key] = props.schema[key]
    }
  })

  return result
})

function formatKey(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (typeof value === 'string' && value.startsWith('^')) {
    return `Pattern: ${value}`
  }
  return value
}

function getBadgeClass(value) {
  if (typeof value === 'boolean') {
    return value ? 'slds-badge_success' : 'slds-badge_inverse'
  }
  if (typeof value === 'number') {
    return 'slds-badge_warning'
  }
  if (typeof value === 'string' && value.startsWith('^')) {
    return 'slds-badge_info'
  }
  return ''
}
</script>

<template>
  <div class="slds-m-top_medium">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Constraints
    </div>
    <div class="slds-box slds-theme_shade">
      <div class="slds-grid slds-wrap slds-gutters">
        <template v-for="(value, key) in constraints" :key="key">
          <div class="slds-col slds-size_1-of-2 slds-p-around_xx-small">
            <div class="constraint-item">
              <div class="slds-text-title_caps slds-text-color_default">
                {{ formatKey(key) }}
              </div>
              <div class="slds-text-body_regular slds-m-top_xx-small">
                <span class="slds-badge" :class="getBadgeClass(value)">{{ formatValue(value) }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.constraint-item {
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #f3f2f2;
}

.constraint-item:hover {
  background-color: #eef1f6;
}
</style>
