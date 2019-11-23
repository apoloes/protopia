import { shallowMount } from '@vue/test-utils'
import TopNeg from '../src/components/TopNeg'

describe('TopNeg.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(TopNeg);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(TopNeg);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
