import { shallowMount } from '@vue/test-utils'
import DailyAskRate from '../src/components/DailyAskRate'

describe('DailyAskRate.vue', () => {
  const wrapper = shallowMount(DailyAskRate);
  it('renders item in props.items', () => {
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  })
})
