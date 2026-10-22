import AnySchema from '@/components/schema/AnySchema.vue'
import ArraySchema from '@/components/schema/ArraySchema.vue'
import BooleanSchema from '@/components/schema/BooleanSchema.vue'
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

const STRUCTURAL_KEYWORDS = {
  object: ['properties', 'patternProperties', 'additionalProperties', 'required', 'minProperties', 'maxProperties', 'propertyNames', 'dependencies', 'dependentRequired', 'dependentSchemas'],
  array: ['items', 'prefixItems', 'additionalItems', 'contains', 'minItems', 'maxItems', 'uniqueItems', 'minContains', 'maxContains'],
  string: ['minLength', 'maxLength', 'pattern', 'format', 'contentMediaType', 'contentEncoding'],
  number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf'],
}

/**
 * Types implied by structural keywords when the schema declares no `type`.
 */
export function inferTypes(schema) {
  if (!isSchemaObject(schema) || normalizeTypes(schema).length > 0)
    return []
  return Object.entries(STRUCTURAL_KEYWORDS)
    .filter(([, keywords]) => keywords.some(keyword => keyword in schema))
    .map(([type]) => type)
}

const COMPOSITION_KEYWORDS = ['allOf', 'anyOf', 'oneOf']

/**
 * Composition keywords present on the schema, in a stable order.
 */
export function compositionKeywords(schema) {
  if (!isSchemaObject(schema))
    return []
  return COMPOSITION_KEYWORDS.filter(keyword => Array.isArray(schema[keyword]))
}

const APPLICATOR_KEYWORDS = ['not', 'if', 'then', 'else', 'dependencies', 'dependentRequired', 'dependentSchemas', 'propertyNames']

/**
 * Applicator keywords (other than composition) present on the schema.
 */
export function applicatorKeywords(schema) {
  if (!isSchemaObject(schema))
    return []
  return APPLICATOR_KEYWORDS.filter(keyword => keyword in schema)
}

export function effectiveTypes(schema) {
  const declared = normalizeTypes(schema)
  return declared.length > 0 ? declared : inferTypes(schema)
}

export function isTypeInferred(schema) {
  return normalizeTypes(schema).length === 0 && inferTypes(schema).length > 0
}

export function formatType(schema) {
  return normalizeTypes(schema).join(' | ')
}

/**
 * Human-readable type label, e.g. `string | null` or `object (inferred)`.
 */
export function formatTypeLabel(schema) {
  const label = effectiveTypes(schema).join(' | ')
  return isTypeInferred(schema) ? `${label} (inferred)` : label
}

export function isNullable(schema) {
  const types = normalizeTypes(schema)
  return types.length > 1 && types.includes('null')
}

function componentForTypes(types, schema) {
  if (types.length === 0) {
    const hasOtherKeywords = compositionKeywords(schema).length > 0 || applicatorKeywords(schema).length > 0
    return hasOtherKeywords ? null : AnySchema
  }
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
  hasComposition: schema => compositionKeywords(schema).length > 0,
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

    if (schemaUtils.isEnum(schema)) {
      return EnumSchema
    }

    if (schemaUtils.isConst(schema)) {
      return ConstSchema
    }

    return componentForTypes(effectiveTypes(schema), schema)
  },
}
