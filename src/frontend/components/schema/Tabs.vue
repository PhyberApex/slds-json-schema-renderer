<script setup>
import { computed, ref, useId } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: tabs => tabs.every(tab => tab.id !== undefined && typeof tab.label === 'string'),
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const uid = useId()
const tabButtons = ref([])

const activeIndex = computed(() => props.tabs.findIndex(tab => tab.id === props.modelValue))

function tabElementId(tab) {
  return `${uid}-tab-${tab.id}`
}

function panelElementId(tab) {
  return `${uid}-panel-${tab.id}`
}

function activate(index) {
  const count = props.tabs.length
  const nextIndex = (index + count) % count
  emit('update:modelValue', props.tabs[nextIndex].id)
  tabButtons.value[nextIndex]?.focus()
}

const KEY_HANDLERS = {
  ArrowRight: index => activate(index + 1),
  ArrowLeft: index => activate(index - 1),
  Home: () => activate(0),
  End: () => activate(props.tabs.length - 1),
}

function onKeydown(event, index) {
  const handler = KEY_HANDLERS[event.key]
  if (handler) {
    event.preventDefault()
    handler(index)
  }
}
</script>

<template>
  <div class="slds-tabs_default">
    <ul class="slds-tabs_default__nav" role="tablist">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="slds-tabs_default__item"
        :class="{ 'slds-is-active': index === activeIndex }"
        role="presentation"
      >
        <button
          :id="tabElementId(tab)"
          ref="tabButtons"
          type="button"
          class="slds-tabs_default__link"
          role="tab"
          :tabindex="index === activeIndex ? 0 : -1"
          :aria-selected="index === activeIndex"
          :aria-controls="panelElementId(tab)"
          @click="activate(index)"
          @keydown="onKeydown($event, index)"
        >
          <span class="slds-tabs_default__title">{{ tab.label }}</span>
        </button>
      </li>
    </ul>

    <div
      v-for="(tab, index) in tabs"
      :id="panelElementId(tab)"
      :key="tab.id"
      class="slds-tabs_default__content"
      :class="index === activeIndex ? 'slds-show' : 'slds-hide'"
      role="tabpanel"
      :aria-labelledby="tabElementId(tab)"
      :hidden="index !== activeIndex"
    >
      <slot name="panel" :tab="tab" :active="index === activeIndex" />
    </div>
  </div>
</template>

<style>
.slds-tabs_default__link[role='tab'] {
  background: none;
  border: 0;
  font: inherit;
  cursor: pointer;
}
</style>
