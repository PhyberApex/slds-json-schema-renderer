import ArraySchema from '@/components/schema/ArraySchema.vue'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'

// Registry of schema type components
export const schemaTypeComponents = {
  object: ObjectSchema,
  array: ArraySchema,
  string: PrimitiveSchema,
  number: PrimitiveSchema,
  integer: PrimitiveSchema,
  boolean: PrimitiveSchema,
  null: PrimitiveSchema,
}

// Schema type checking utilities
export const schemaUtils = {
  hasComposition: schema => !!(schema.anyOf || schema.oneOf || schema.allOf),

  getComponentForSchema: (schema) => {
    if (schemaUtils.hasComposition(schema)) {
      return CompositionSchema
    }

    return schemaTypeComponents[schema.type] || null
  },
}
