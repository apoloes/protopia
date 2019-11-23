import { shallowMount } from '@vue/test-utils'
import TopPos from '../src/components/TopPos'

describe('TopPos.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(TopPos);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(TopPos);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
