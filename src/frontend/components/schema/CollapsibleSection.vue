<script setup>
import { ref, useId } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  initiallyExpanded: {
    type: Boolean,
    default: true,
  },
})

const expanded = ref(props.initiallyExpanded)
const contentId = `${useId()}-content`
</script>

<template>
  <div class="slds-section" :class="{ 'slds-is-open': expanded }">
    <h3 class="slds-section__title">
      <button
        type="button"
        class="slds-button slds-section__title-action"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        @click="expanded = !expanded"
      >
        <img
          src="@slds/icons/utility/switch.svg"
          class="slds-section__title-action-icon slds-button__icon slds-button__icon_left"
          alt=""
        >
        <span class="slds-truncate" :title="title">{{ title }}</span>
        <slot name="badge" />
      </button>
    </h3>
    <div v-if="expanded" :id="contentId" class="slds-section__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slds-section__title-action-icon {
  filter: brightness(0);
}
</style>
