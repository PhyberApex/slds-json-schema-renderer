// schema-utils.js
/**
 * Utility functions for handling JSON Schema objects
 */

/**
 * Resolves a schema reference within the definitions
 * @param {Object} schema - The full schema object
 * @param {String} ref - The reference path (e.g. "#/definitions/Target")
 * @returns {Object} The resolved schema object
 */
export function resolveRef(schema, ref) {
    if (!ref.startsWith('#/')) {
        console.warn('External references not supported:', ref);
        return { type: 'object', description: `External reference: ${ref}` };
    }

    const path = ref.substring(2).split('/');
    let result = schema;

    try {
        for (const segment of path) {
            result = result[segment];
        }
        return result || {};
    } catch (e) {
        console.error('Failed to resolve reference:', ref, e);
        return {};
    }
}

/**
 * Normalizes a schema type that might be an array of types
 * @param {String|Array} type - The type or array of types
 * @returns {String} A normalized type string
 */
export function normalizeType(type) {
    if (Array.isArray(type)) {
        // Filter out null and join with pipe
        const types = type.filter(t => t !== 'null');
        return types.length ? types.join(' | ') : 'any';
    }
    return type || 'any';
}

/**
 * Extracts properties from a schema that might use oneOf/anyOf/allOf
 * @param {Object} schema - The schema object
 * @returns {Object} The extracted properties
 */
export function extractProperties(schema) {
    if (schema.properties) {
        return schema.properties;
    }

    // Handle oneOf/anyOf/allOf
    const combiners = ['oneOf', 'anyOf', 'allOf'];
    for (const combiner of combiners) {
        if (schema[combiner] && Array.isArray(schema[combiner])) {
            // For demo purposes, just use the first option's properties
            // A more complete solution would merge properties from all options
            const firstOption = schema[combiner][0];
            if (firstOption.properties) {
                return firstOption.properties;
            }
        }
    }

    return {};
}

/**
 * Flattens a schema with oneOf/anyOf into a more display-friendly format
 * @param {Object} schema - The schema object
 * @returns {Object} A flattened schema suitable for display
 */
export function flattenSchema(schema) {
    const result = { ...schema };

    if (!result.properties) {
        result.properties = {};
    }

    // Convert oneOf/anyOf variants to properties for display
    const combiners = ['oneOf', 'anyOf'];
    for (const combiner of combiners) {
        if (schema[combiner] && Array.isArray(schema[combiner])) {
            schema[combiner].forEach((variant, index) => {
                if (variant.title) {
                    // Create a virtual property for this variant
                    result.properties[variant.title] = {
                        type: 'object',
                        description: `${variant.title} variant ${variant.description || ''}`.trim(),
                        isVariant: true,
                        variantSchema: variant
                    };
                }
            });
        }
    }

    return result;
}

/**
 * Gets all definitions from a schema
 * @param {Object} schema - The schema object
 * @returns {Object} The definitions object
 */
export function getDefinitions(schema) {
    return schema.definitions || {};
}

/**
 * Resolves all references in a schema recursively
 * @param {Object} schema - The schema object to resolve
 * @param {Object} rootSchema - The root schema containing all definitions
 * @returns {Object} The resolved schema
 */
export function resolveReferences(schema, rootSchema) {
  if (!schema) return schema;

  // If this is a reference, resolve it
  if (schema.$ref) {
    const parts = schema.$ref.split('/');
    let resolved = rootSchema;
    
    // Skip the first empty part and '#'
    for (let i = 1; i < parts.length; i++) {
      if (!resolved) return schema;
      resolved = resolved[parts[i]];
    }
    
    // Recursively resolve any references in the resolved schema
    return resolveReferences(resolved, rootSchema);
  }

  // Handle arrays
  if (Array.isArray(schema)) {
    return schema.map(item => resolveReferences(item, rootSchema));
  }

  // Handle objects
  if (typeof schema === 'object') {
    const resolved = {};
    for (const [key, value] of Object.entries(schema)) {
      // Skip $ref as we've already handled it
      if (key === '$ref') continue;
      resolved[key] = resolveReferences(value, rootSchema);
    }
    return resolved;
  }

  return schema;
}