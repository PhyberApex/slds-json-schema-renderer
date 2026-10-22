import { describe, expect, it } from 'vitest'
import ArraySchema from '@/components/schema/ArraySchema.vue'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import ConstSchema from '@/components/schema/ConstSchema.vue'
import EnumSchema from '@/components/schema/EnumSchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import { schemaUtils } from '@/utils/schemaRegistry.js'

describe('schemaUtils.getComponentForSchema', () => {
  it.each([
    [{ type: 'object' }, ObjectSchema],
    [{ type: 'array' }, ArraySchema],
    [{ type: 'string' }, PrimitiveSchema],
    [{ type: 'integer' }, PrimitiveSchema],
    [{ enum: ['a', 'b'] }, EnumSchema],
    [{ const: 1 }, ConstSchema],
    [{ oneOf: [{ type: 'string' }] }, CompositionSchema],
  ])('picks the component for %j', (schema, component) => {
    expect(schemaUtils.getComponentForSchema(schema)).toBe(component)
  })
})
