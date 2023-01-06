const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('switch');
    comp.triggerLifeTime('attached');

    expect(comp).toMatchSnapshot();
  });

  it('should render success props', async () => {
    const comp = getComponent('switch', {
      value: true
    });
    comp.triggerLifeTime('attached');

    expect(comp).toMatchSnapshot();
    comp.setData({ value: false });
    await simulate.sleep(0);
    expect(comp).toMatchSnapshot();
  });
});
