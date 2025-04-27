<script setup>
import { motion } from 'motion-v'
import { ref } from 'vue'

const props = defineProps({
  schemas: {
    type: Array,
    required: true,
  },
  selectedSchema: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['selectSchema'])
const selectedSchemaId = ref(props.selectedSchema?.fileName || null)

function selectSchema(schema) {
  selectedSchemaId.value = schema.fileName
  emit('selectSchema', schema)
}

function getSchemaTitle(schema) {
  return schema.schema?.title || schema.fileName || 'Untitled Schema'
}
</script>

<template>
  <div class="slds-navigation-list--vertical">
    <div class="slds-navigation-list__item">
      <div class="slds-navigation-list__item-content">
        <div class="slds-navigation-list__item-title">
          <span class="slds-text-heading_small">Schemas</span>
        </div>
      </div>
    </div>
    <div v-for="schema in schemas" :key="schema.fileName" class="slds-navigation-list__item">
      <div class="slds-navigation-list__item-content">
        <div class="slds-navigation-list__item-title">
          <motion.button
            :while-hover="{ scale: 1.05 }"
            :while-press="{ scale: 0.95 }"
            class="slds-button slds-button_neutral slds-button_stretch"
            :class="{ 'slds-is-active': selectedSchemaId === schema.fileName }"
            @click="selectSchema(schema)"
          >
            {{ getSchemaTitle(schema) }}
          </motion.button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slds-navigation-list--vertical {
  padding: 0.5rem;
}

.slds-navigation-list__item {
  margin-bottom: 0.25rem;
}

.slds-button_stretch {
  text-align: left;
  justify-content: flex-start;
}

.slds-is-active {
  background-color: #f3f2f2;
  color: #0176d3;
}
</style>
