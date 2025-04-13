import { createApp } from 'vue';
import App from './components/App.vue';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';

/**
 * Initialize the Vue application
 * This runs in the browser to mount the app
 */
async function init() {
  // Get the app data from the window object
  const appData =
    import.meta.env.MODE === 'development'
      ? (await import('./utils/mockData.js')).default
      : window.__JSON_SCHEMA_DOCS_DATA__ || {
          title: 'JSON Schema Documentation',
          description: '',
          schemas: [],
          generatedAt: new Date().toISOString(),
        };

  // Find the app container
  const container = document.getElementById('app');

  if (container) {
    // Create the Vue app with the data
    const app = createApp(App, appData);
    app.mount('#app');
  }
}

// Run initialization when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for library usage
export { createApp, App };
