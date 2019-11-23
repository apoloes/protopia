import { render } from '@vue/test-utils'
import StatusDist from '../src/components/StatusDist'

describe('StatusDist.vue', () => {
  it('renders item in props.items', () => {
    const wrapper = render(StatusDist);
    expect(wrapper.vm.$options._propKeys).toHaveLength(1)
  })


  it('matches snapshot', () => {
    const wrapper = render(StatusDist);
    expect(wrapper.html()).toMatchSnapshot();
  })
})
