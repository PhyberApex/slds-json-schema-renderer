import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'

describe('headerLayout', () => {
  it('renders the documentation title as the page heading', () => {
    const wrapper = mount(HeaderLayout, { props: { title: 'My Docs' } })
    expect(wrapper.get('h1').text()).toBe('My Docs')
    expect(wrapper.get('h1').attributes('title')).toBe('My Docs')
  })
})
