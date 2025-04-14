<script setup>
defineProps({
  title: {
    type: String,
    default: 'JSON Schema Documentation',
  },
})
</script>

<template>
  <header class="slds-page-header">
    <div class="slds-page-header__row">
      <div class="slds-page-header__col-title">
        <div class="slds-media">
          <div class="slds-media__figure">
            <span class="slds-icon_container slds-icon-standard-account">
              <img
                src="@slds/icons/standard/code_playground.svg"
                class="slds-icon slds-icon_small"
                alt=""
              >
            </span>
          </div>
          <div class="slds-media__body">
            <div class="slds-page-header__name">
              <div class="slds-page-header__name-title">
                <h1 class="slds-page-header__title slds-truncate" :title="title">
                  {{ title }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
/* Add any custom styles here if needed */
</style>
