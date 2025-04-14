<script setup>
defineProps({
  schema: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="slds-page-header">
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
                <h1
                  class="slds-page-header__title slds-truncate"
                  title="{{ schema.title || 'Schema' }}"
                >
                  {{ schema.title || 'Schema' }}
                </h1>
              </div>
            </div>
            <div class="slds-page-header__meta-text">
              {{ schema.description || 'No description provided' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add any custom styles here if needed */
</style>
