<template>
  <div class="slds-box slds-theme_shade">
    <div class="slds-text-heading_small slds-m-bottom_small">Enum Values</div>
    <div class="slds-grid slds-wrap slds-gutters">
      <div v-for="(value, index) in values" :key="index" class="slds-col slds-size_1-of-3 slds-p-around_xx-small">
        <div class="slds-badge slds-badge_inverse">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  values: {
    type: Array,
    required: true
  }
});

const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  return value.toString();
};

const getValueTypeClass = (value) => {
  if (value === null) return 'type-null';
  if (typeof value === 'string') return 'type-string';
  if (typeof value === 'number') return 'type-number';
  if (typeof value === 'boolean') return 'type-boolean';
  return '';
};
</script>

<style>
.enum-container {
  margin-top: 1rem;
  border: 1px solid #dddbda;
  border-radius: 4px;
  background-color: #fff;
}

.enum-header {
  padding: 0.75rem;
  border-bottom: 1px solid #dddbda;
}

.enum-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.enum-body {
  padding: 0.75rem;
}

.enum-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.enum-item {
  display: inline-flex;
}

.enum-value {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
}

.type-string {
  background-color: #c9e7f2;
  color: #014486;
}

.type-number {
  background-color: #d8e6c2;
  color: #2e844a;
}

.type-boolean {
  background-color: #f2d4c9;
  color: #ba3e2e;
}

.type-null {
  background-color: #e0e5ee;
  color: #3e3e3c;
}
</style>