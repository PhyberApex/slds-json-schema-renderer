<script setup>
import { motion } from 'motion-v'

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

function schemaKey(entry) {
  return entry.file
}

function isSelected(entry) {
  return props.selectedSchema !== null && schemaKey(props.selectedSchema) === schemaKey(entry)
}

function fileName(entry) {
  return entry.schema?._metadata?.fileName ?? entry.file.split(/[\\/]/).pop()
}

function getSchemaTitle(entry) {
  return entry.schema?.title || fileName(entry)
}
</script>

<template>
  <nav class="slds-navigation-list--vertical" aria-label="Schemas">
    <div class="slds-navigation-list__item">
      <div class="slds-navigation-list__item-content">
        <div class="slds-navigation-list__item-title">
          <span class="slds-text-heading_small">Schemas</span>
        </div>
      </div>
    </div>
    <div v-for="schema in schemas" :key="schemaKey(schema)" class="slds-navigation-list__item">
      <div class="slds-navigation-list__item-content">
        <div class="slds-navigation-list__item-title">
          <motion.button
            :while-hover="{ scale: 1.05 }"
            :while-press="{ scale: 0.95 }"
            class="slds-button slds-button_neutral slds-button_stretch"
            :class="{ 'slds-is-active': isSelected(schema) }"
            @click="emit('selectSchema', schema)"
          >
            {{ getSchemaTitle(schema) }}
          </motion.button>
        </div>
      </div>
    </div>
  </nav>
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
