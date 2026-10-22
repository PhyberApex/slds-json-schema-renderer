import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SchemaHeader from '@/components/schema/SchemaHeader.vue'

describe('schemaHeader', () => {
  it('uses the schema title as the heading tooltip', () => {
    const wrapper = mount(SchemaHeader, { props: { schema: { title: 'Product' } } })
    expect(wrapper.get('h1').attributes('title')).toBe('Product')
  })

  it('falls back to "Schema" when there is no title', () => {
    const wrapper = mount(SchemaHeader, { props: { schema: {} } })
    expect(wrapper.get('h1').attributes('title')).toBe('Schema')
    expect(wrapper.get('h1').text()).toBe('Schema')
  })
})
