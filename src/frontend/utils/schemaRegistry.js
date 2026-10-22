import ArraySchema from '@/components/schema/ArraySchema.vue'
import BooleanSchema from '@/components/schema/BooleanSchema.vue'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import ConstSchema from '@/components/schema/ConstSchema.vue'
import EnumSchema from '@/components/schema/EnumSchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import RefSchema from '@/components/schema/RefSchema.vue'

// Resolved lazily: the components import SchemaViewer, which imports this
// module, so an eager map would capture `undefined` for whichever component
// happens to be first in the import cycle.
function schemaTypeComponents() {
  return {
    object: ObjectSchema,
    array: ArraySchema,
    string: PrimitiveSchema,
    number: PrimitiveSchema,
    integer: PrimitiveSchema,
    boolean: PrimitiveSchema,
    null: PrimitiveSchema,
  }
}

// Schema type checking utilities
export function isSchemaObject(schema) {
  return schema !== null && typeof schema === 'object' && !Array.isArray(schema)
}

/**
 * The declared `type` keyword as an array; empty when the schema declares none.
 */
export function normalizeTypes(schema) {
  if (!isSchemaObject(schema) || schema.type === undefined)
    return []
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

export function formatType(schema) {
  return normalizeTypes(schema).join(' | ')
}

export function isNullable(schema) {
  const types = normalizeTypes(schema)
  return types.length > 1 && types.includes('null')
}

function componentForTypes(types) {
  const components = schemaTypeComponents()
  const concreteTypes = types.length > 1 ? types.filter(type => type !== 'null') : types
  if (concreteTypes.length === 1)
    return components[concreteTypes[0]] || null
  if (concreteTypes.length > 1 && concreteTypes.every(type => components[type] === PrimitiveSchema))
    return PrimitiveSchema
  return null
}

export const schemaUtils = {
  isSchemaObject,
  isBooleanSchema: schema => typeof schema === 'boolean',
  hasComposition: schema => isSchemaObject(schema) && !!(schema.anyOf || schema.oneOf || schema.allOf),
  isEnum: schema => isSchemaObject(schema) && Array.isArray(schema.enum),
  isConst: schema => isSchemaObject(schema) && 'const' in schema,
  isRef: schema => isSchemaObject(schema) && typeof schema.$ref === 'string',

  getComponentForSchema: (schema) => {
    if (schemaUtils.isBooleanSchema(schema)) {
      return BooleanSchema
    }

    if (!isSchemaObject(schema)) {
      return null
    }

    if (schemaUtils.isRef(schema)) {
      return RefSchema
    }

    if (schemaUtils.hasComposition(schema)) {
      return CompositionSchema
    }

    if (schemaUtils.isEnum(schema)) {
      return EnumSchema
    }

    if (schemaUtils.isConst(schema)) {
      return ConstSchema
    }

    return componentForTypes(normalizeTypes(schema))
  },
}
