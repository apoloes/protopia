import { shallowMount } from '@vue/test-utils'
import AskSentiment from '../src/components/AskSentiment'

describe('AskSentiment.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(AskSentiment);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(AskSentiment);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
