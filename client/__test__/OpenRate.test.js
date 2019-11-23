
import { shallowMount } from '@vue/test-utils'
import OpenRate from '../src/components/OpenRate'

describe('OpenRate.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(OpenRate);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(OpenRate);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
