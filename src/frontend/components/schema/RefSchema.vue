<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  rootSchema: {
    type: Object,
    default: null,
  },
})

const isCircular = computed(() => props.schema._circular === true)
</script>

<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">
      {{ isCircular ? 'Recursive reference' : 'Reference' }}
    </div>
    <p class="slds-text-body_regular slds-m-bottom_x-small">
      <template v-if="isCircular">
        This schema refers back to one of its ancestors, so it is not expanded again.
      </template>
      <template v-else>
        This reference could not be resolved and is shown as written.
      </template>
    </p>
    <span class="slds-badge" :class="isCircular ? 'slds-badge_lightest' : 'slds-badge_inverse'">
      <code>{{ schema.$ref }}</code>
    </span>
  </div>
</template>
