const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', async () => {
    const comp = getComponent('empty');
    const clickCallback = jest.fn();
    comp.addEventListener('click', clickCallback);

    expect(comp).toMatchSnapshot();

    comp.querySelector('.titian-empty').dispatchEvent('tap');
    await simulate.sleep(0);

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });
});
