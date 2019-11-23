import { shallowMount } from '@vue/test-utils'
import Students from '../src/components/Students'

describe('Students.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = shallowMount(Students);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = shallowMount(Students);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
