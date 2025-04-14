<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
})

const formattedSchema = computed(() => {
  return JSON.stringify(props.schema, null, 2)
})
</script>

<template>
  <div class="slds-box">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Raw JSON Schema
    </div>
    <pre class="slds-box slds-theme_shade"><code>{{ formattedSchema }}</code></pre>
  </div>
</template>

<style>
pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
