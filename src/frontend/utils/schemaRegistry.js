import ArraySchema from '@/components/schema/ArraySchema.vue'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import EnumSchema from '@/components/schema/EnumSchema.vue'
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
  isEnum: schema => schema.enum && Array.isArray(schema.enum),

  getComponentForSchema: (schema) => {
    if (schemaUtils.hasComposition(schema)) {
      return CompositionSchema
    }

    if (schemaUtils.isEnum(schema)) {
      return EnumSchema
    }

    return schemaTypeComponents[schema.type] || null
  },
}
