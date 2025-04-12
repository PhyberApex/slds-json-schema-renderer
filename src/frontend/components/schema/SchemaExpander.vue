<template>
  <div class="schema-expander slds-section" :class="{ 'slds-is-open': expanded }">
    <h3 class="slds-section__title">
      <button
          class="slds-button slds-section__title-action"
          @click="toggleExpanded"
          aria-controls="expander-content"
          :aria-expanded="expanded"
      >
        <img src="@slds/icons/utility/switch.svg" class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" alt="" />
        <span class="slds-truncate" title="{{ title }}">{{ title }}</span>
      </button>
    </h3>
    <div id="expander-content" v-if="expanded" class="slds-section__content" :aria-hidden="!expanded">
      <div class="slds-p-horizontal_medium">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  initiallyExpanded: {
    type: Boolean,
    default: false
  }
});

const expanded = ref(props.initiallyExpanded);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<style scoped>
.slds-section__title-action-icon {
  filter: brightness(0);
}
</style>