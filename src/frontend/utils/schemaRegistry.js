import ArraySchema from '@/components/schema/ArraySchema.vue'
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
export const schemaUtils = {
  hasComposition: schema => !!(schema.anyOf || schema.oneOf || schema.allOf),
  isEnum: schema => 'enum' in schema && Array.isArray(schema.enum),
  isConst: schema => 'const' in schema,
  isRef: schema => typeof schema.$ref === 'string',

  getComponentForSchema: (schema) => {
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

    return schemaTypeComponents()[schema.type] || null
  },
}
