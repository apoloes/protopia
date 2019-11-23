import { shallowMount } from '@vue/test-utils'
import Content from '../src/components/Content'

describe('Content.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(Content);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(Content);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
