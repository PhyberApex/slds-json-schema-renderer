<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
})

const formattedSchema = computed(() => {
  // Create a deep copy of the schema
  const schemaCopy = JSON.parse(JSON.stringify(props.schema))

  // Remove _metadata if it exists in the copy
  if (schemaCopy._metadata) {
    delete schemaCopy._metadata
  }

  // Return the formatted JSON without _metadata
  return JSON.stringify(schemaCopy, null, 2)
})
</script>

<template>
  <div class="slds-box">
    <div class="slds-text-heading_small slds-m-bottom_small">
      Schema in plain with all <code>$ref</code> references already resolved
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
