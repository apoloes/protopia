import { shallowMount } from '@vue/test-utils'
import ResponseRate from '../src/components/ResponseRate'

describe('ResponseRate.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(ResponseRate);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(ResponseRate);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
