import { shallowMount } from '@vue/test-utils'
import CommunityDist from '../src/components/CommunityDist'

describe('CommunityDist.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(CommunityDist);

    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(CommunityDist);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
