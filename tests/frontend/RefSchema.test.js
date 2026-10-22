import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RefSchema from '@/components/schema/RefSchema.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import { schemaUtils } from '@/utils/schemaRegistry.js'

describe('refSchema', () => {
  it('is chosen for a schema that still carries a $ref', () => {
    expect(schemaUtils.getComponentForSchema({ $ref: '#', _circular: true })).toBe(RefSchema)
  })

  it('labels a circular marker as a recursive reference to its target', () => {
    const wrapper = mount(RefSchema, { props: { schema: { $ref: '#/definitions/node', _circular: true } } })
    expect(wrapper.text()).toMatch(/recursive/i)
    expect(wrapper.text()).toContain('#/definitions/node')
  })

  it('labels an unresolved $ref as a reference', () => {
    const wrapper = mount(RefSchema, { props: { schema: { $ref: 'other.json#/x' } } })
    expect(wrapper.text()).not.toMatch(/recursive/i)
    expect(wrapper.text()).toContain('other.json#/x')
  })

  it('does not recurse when a recursive array item points back at the root', () => {
    const schema = {
      title: 'Tree',
      type: 'object',
      properties: { children: { type: 'array', items: { $ref: '#', _circular: true } } },
    }
    const wrapper = mount(SchemaViewer, { props: { schema, isRoot: true } })
    expect(wrapper.text()).toContain('Tree')
  })
})
