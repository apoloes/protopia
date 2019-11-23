import { shallowMount } from '@vue/test-utils'
import HourlyAskRate from '../src/components/HourlyAskRate'

describe('HourlyAskRate.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(HourlyAskRate);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(HourlyAskRate);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
