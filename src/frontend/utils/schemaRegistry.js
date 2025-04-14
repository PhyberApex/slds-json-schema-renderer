import ArraySchema from '@/components/schema/ArraySchema.vue'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import ReferenceResolver from '@/components/schema/ReferenceResolver.vue'
import { resolveReferences } from './schema-utils'

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
  hasReference: schema => !!schema.$ref,

  hasComposition: schema => !!(schema.anyOf || schema.oneOf || schema.allOf),

  getCompositionType: (schema) => {
    if (schema.anyOf)
      return 'anyOf'
    if (schema.oneOf)
      return 'oneOf'
    if (schema.allOf)
      return 'allOf'
    return null
  },

  isPrimitiveType: (schema) => {
    const primitiveTypes = ['string', 'number', 'integer', 'boolean', 'null']
    return primitiveTypes.includes(schema.type)
  },

  getComponentForSchema: (schema) => {
    if (schemaUtils.hasReference(schema)) {
      return ReferenceResolver
    }

    if (schemaUtils.hasComposition(schema)) {
      return CompositionSchema
    }

    return schemaTypeComponents[schema.type] || null
  },

  resolveReferences,
}
