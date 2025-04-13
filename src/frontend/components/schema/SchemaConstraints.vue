<template>
  <div class="slds-box slds-m-top_small">
    <div class="slds-text-heading_small slds-m-bottom_small">Constraints</div>
    <div class="slds-box slds-theme_shade">
      <dl class="slds-dl_horizontal slds-wrap">
        <template v-for="(value, key) in constraints" :key="key">
          <dt class="slds-size_1-of-3 slds-p-around_xx-small">
            <div class="slds-text-title_caps">{{ formatKey(key) }}</div>
          </dt>
          <dd class="slds-size_2-of-3 slds-p-around_xx-small">
            <div class="slds-text-body_regular">{{ formatValue(value) }}</div>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

const constraints = computed(() => {
  const result = {};
  const constraintKeys = [
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'minLength',
    'maxLength',
    'pattern',
    'minItems',
    'maxItems',
    'uniqueItems',
    'minProperties',
    'maxProperties',
  ];

  constraintKeys.forEach(key => {
    if (props.schema[key] !== undefined) {
      result[key] = props.schema[key];
    }
  });

  return result;
});

const formatKey = key => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const formatValue = value => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};
</script>

<style>
/* Add any custom styles here if needed */
</style>
