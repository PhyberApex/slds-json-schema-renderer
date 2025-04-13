<template>
  <div
    class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_warning"
    role="alert"
  >
    <span class="slds-assistive-text">warning</span>
    <span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small">
      <img
        src="@slds/icons/utility/warning.svg"
        class="slds-icon slds-icon_x-small warning-icon"
        alt=""
      />
    </span>
    <h2>{{ title }}</h2>
    <div class="slds-notify__content">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No Properties Defined',
  },
  message: {
    type: String,
    default: "This object doesn't have any properties defined in the schema.",
  },
});
</script>

<style scoped>
.slds-notify_alert {
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 1rem;
}

.slds-icon_x-small {
  width: 1rem;
  height: 1rem;
}

.warning-icon {
  filter: brightness(0);
}

h2 {
  font-weight: 700;
  margin-right: 0.5rem;
}
</style>
