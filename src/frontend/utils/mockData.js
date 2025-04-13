// This function dynamically imports all JSON files from a directory
export default {
  title: 'JSON Schema Documentation (Dev)',
  description: 'Development mode with Vite',

  // Uses Vite's import.meta.glob to dynamically import all JSON files
  schemas: (() => {
    // Use import.meta.glob to get all JSON files from the test directory
    const jsonFiles = import.meta.glob('../../../test/*.json', { eager: true });

    // Transform the imported files into the required format
    return Object.entries(jsonFiles).map(([path, schema]) => {
      // Extract filename from path
      const fileName = path.split('/').pop();

      return {
        fileName,
        schema: schema.default || schema, // Handle both default exports and direct exports
      };
    });
  })(),

  generatedAt: new Date().toISOString(),
};
