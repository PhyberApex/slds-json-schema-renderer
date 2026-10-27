<script setup>
import { computed } from 'vue'
import { formatLiteral } from '@/utils/formatLiteral.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  exclude: {
    type: Array,
    default: () => [],
  },
})

const LITERAL_KEYWORDS = ['const', 'default', 'examples']
const CODE_KEYWORDS = ['pattern']
const CONSTRAINT_KEYWORDS = [
  'format',
  'const',
  'default',
  'examples',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'multipleOf',
  'minLength',
  'maxLength',
  'pattern',
  'contentMediaType',
  'contentEncoding',
  'minItems',
  'maxItems',
  'uniqueItems',
  'minContains',
  'maxContains',
  'minProperties',
  'maxProperties',
]

function formatKey(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatValue(key, value) {
  if (key === 'examples' && Array.isArray(value))
    return value.map(formatLiteral).join('\n')
  if (LITERAL_KEYWORDS.includes(key))
    return formatLiteral(value)
  if (typeof value === 'boolean')
    return value ? 'Yes' : 'No'
  return String(value)
}

function badgeClass(key, value) {
  if (typeof value === 'boolean')
    return value ? 'slds-badge_success' : 'slds-badge_inverse'
  if (key === 'format')
    return 'slds-badge_lightest'
  if (typeof value === 'number')
    return 'slds-badge_warning'
  return ''
}

// Draft-04 expresses exclusivity as a boolean next to minimum/maximum.
function boundLabel(key, exclusiveKey) {
  return props.schema[exclusiveKey] === true
    ? `${formatKey(key)} (exclusive)`
    : formatKey(key)
}

const constraints = computed(() =>
  CONSTRAINT_KEYWORDS
    .filter(key => props.schema[key] !== undefined && !props.exclude.includes(key))
    .filter(key => !(key === 'exclusiveMinimum' && typeof props.schema[key] === 'boolean'))
    .filter(key => !(key === 'exclusiveMaximum' && typeof props.schema[key] === 'boolean'))
    .map((key) => {
      const value = props.schema[key]
      const label = key === 'minimum'
        ? boundLabel('minimum', 'exclusiveMinimum')
        : key === 'maximum'
          ? boundLabel('maximum', 'exclusiveMaximum')
          : formatKey(key)
      const kind = LITERAL_KEYWORDS.includes(key) || CODE_KEYWORDS.includes(key)
        ? 'code'
        : 'badge'
      return {
        key,
        label,
        kind,
        text: formatValue(key, value),
        badgeClass: badgeClass(key, value),
      }
    }),
)

const hasConstraints = computed(() => constraints.value.length > 0)
</script>

<template>
  <div v-if="hasConstraints" class="slds-m-top_medium">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Constraints
    </div>
    <div class="slds-box slds-theme_shade">
      <div class="slds-grid slds-wrap slds-gutters">
        <div
          v-for="constraint in constraints"
          :key="constraint.key"
          class="slds-col slds-p-around_xx-small"
          :class="constraint.kind === 'code' ? 'slds-size_1-of-1' : 'slds-size_1-of-2'"
        >
          <div class="constraint-item">
            <div class="constraint-label slds-text-title_caps slds-text-color_default">
              {{ constraint.label }}
            </div>
            <div class="constraint-value slds-text-body_regular slds-m-top_xx-small">
              <pre v-if="constraint.kind === 'code'" class="constraint-code"><code>{{ constraint.text }}</code></pre>
              <span v-else class="slds-badge" :class="constraint.badgeClass">{{ constraint.text }}</span>
            </div>
          </div>
        </div>
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

.constraint-code {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
