import { render } from '@vue/test-utils'
import PosNeg from '../src/components/PosNeg'

describe('PosNeg.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = render(PosNeg);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = render(PosNeg);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
