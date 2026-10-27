import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SidebarLayout from '@/components/layout/SidebarLayout.vue'

const schemas = [
  {
    file: '/schemas/a.json',
    schema: {
      title: 'Alpha',
      _metadata: { fileName: 'a.json' },
    },
  },
  {
    file: '/schemas/b.json',
    schema: {
      _metadata: { fileName: 'b.json' },
    },
  },
  { file: '/schemas/sub/c.json', schema: {} },
]

function activeLabels(wrapper) {
  return wrapper.findAll('button.slds-is-active').map(button => button.text())
}

describe('sidebarLayout', () => {
  it('highlights the initially selected schema', () => {
    const wrapper = mount(SidebarLayout, {
      props: { schemas, selectedSchema: schemas[0] },
    })
    expect(activeLabels(wrapper)).toEqual(['Alpha'])
  })

  it('falls back to the file name when a schema has no title', () => {
    const wrapper = mount(SidebarLayout, {
      props: { schemas, selectedSchema: null },
    })
    expect(wrapper.findAll('button').map(button => button.text())).toEqual(['Alpha', 'b.json', 'c.json'])
  })

  it('emits the clicked schema and highlights exactly one button after the parent updates', async () => {
    const wrapper = mount(SidebarLayout, {
      props: { schemas, selectedSchema: schemas[0] },
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('selectSchema')[0]).toEqual([schemas[1]])

    await wrapper.setProps({ selectedSchema: schemas[1] })
    expect(activeLabels(wrapper)).toEqual(['b.json'])

    await wrapper.findAll('button')[2].trigger('click')
    await wrapper.setProps({ selectedSchema: schemas[2] })
    expect(activeLabels(wrapper)).toEqual(['c.json'])
  })
})
