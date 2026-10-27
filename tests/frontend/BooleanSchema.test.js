import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ArraySchema from '@/components/schema/ArraySchema.vue'
import BooleanSchema from '@/components/schema/BooleanSchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import { schemaUtils } from '@/utils/schemaRegistry.js'

describe('boolean subschemas', () => {
  it.each([true, false])('registry resolves %s to BooleanSchema without throwing', (schema) => {
    expect(schemaUtils.isEnum(schema)).toBe(false)
    expect(schemaUtils.isConst(schema)).toBe(false)
    expect(schemaUtils.hasComposition(schema)).toBe(false)
    expect(schemaUtils.isRef(schema)).toBe(false)
    expect(schemaUtils.getComponentForSchema(schema)).toBe(BooleanSchema)
  })

  it('renders true as allowing any value and false as allowing none', () => {
    expect(mount(BooleanSchema, {
      props: { schema: true },
    }).text()).toMatch(/any value/i)
    expect(mount(BooleanSchema, {
      props: { schema: false },
    }).text()).toMatch(/no value/i)
  })

  it('keeps the whole properties table when one property is a boolean schema', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        extra: true,
      },
    }
    const wrapper = mount(ObjectSchema, {
      props: { schema },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.map(row => row.find('td').text())).toEqual(['name', 'extra'])
    expect(rows[1].text()).toMatch(/any/i)
  })

  it('renders an array whose items are a boolean schema', () => {
    const schema = { type: 'array', items: true }
    const wrapper = mount(ArraySchema, {
      props: { schema },
    })
    expect(wrapper.text()).toMatch(/any value/i)
  })

  it('renders an array whose items schema is false', () => {
    const schema = { type: 'array', items: false }
    const wrapper = mount(ArraySchema, {
      props: { schema },
    })
    expect(wrapper.text()).toMatch(/no value/i)
  })
})
