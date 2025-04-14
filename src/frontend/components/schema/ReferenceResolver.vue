<script setup>
import NestedSchemaContainer from '@/components/schema/NestedSchemaContainer.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
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

const emit = defineEmits(['navigateToDefinition'])

// Extract the name from the reference
function getRefName(ref) {
  const parts = ref.split('/')
  return parts[parts.length - 1]
}

// Resolve the reference in the schema
const resolvedSchema = computed(() => {
  if (!props.schema.$ref)
    return null

  const parts = props.schema.$ref.split('/')
  let current = props.rootSchema

  // Skip the first empty part and '#'
  for (let i = 1; i < parts.length; i++) {
    if (!current)
      return null
    current = current[parts[i]]
  }

  return current
})

function handleNavigate() {
  emit('navigateToDefinition', {
    definitionName: getRefName(props.schema.$ref),
  })
}
</script>

<template>
  <div>
    <div>
      <span>Reference</span>
      <button :title="schema.$ref" @click="handleNavigate">
        {{ getRefName(schema.$ref) }}
      </button>
    </div>

    <div v-if="resolvedSchema">
      <NestedSchemaContainer>
        <SchemaViewer :schema="resolvedSchema" :root-schema="rootSchema" :is-root="false" />
      </NestedSchemaContainer>
    </div>

    <div v-else>
      <div>
        <div>
          <span>
            <img src="@slds/icons/utility/warning.svg" class="warning-icon" alt="">
          </span>
        </div>
        <div>
          <h3>Reference Not Found</h3>
          <p>Could not resolve reference: {{ schema.$ref }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warning-icon {
  width: 1rem;
  height: 1rem;
  filter: brightness(0);
}
</style>
