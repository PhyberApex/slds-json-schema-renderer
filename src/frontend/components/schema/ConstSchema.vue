<script setup>
import { computed } from 'vue'

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

const constValue = computed(() => props.schema.const)
const isObject = computed(() => typeof constValue.value === 'object' && constValue.value !== null)
const prettyConstValue = computed(() => {
  if (isObject.value) {
    return JSON.stringify(constValue.value, null, 2)
  }
  return constValue.value
})
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Const Value
    </div>
    <div class="slds-grid slds-wrap slds-gutters">
      <div class="slds-col slds-size_1-of-1 slds-p-around_xx-small">
        <template v-if="isObject">
          <pre class="slds-box slds-theme_shade slds-m-vertical_xx-small"><code>{{ prettyConstValue }}</code></pre>
        </template>
        <template v-else>
          <div class="slds-badge slds-badge_inverse">
            {{ prettyConstValue }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
