const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', async () => {
    const comp = getComponent('icon', { name: 'checkbox' });

    const clickCallback = jest.fn();
    comp.addEventListener('click', clickCallback);

    expect(comp).toMatchSnapshot();

    comp.querySelector('.titian-icon').dispatchEvent('tap');
    await Promise.resolve();
    expect(clickCallback).toHaveBeenCalled();
    clickCallback.mockClear();

    comp.setData({ name: 'rotate', color: ['#000', '#ccc'] });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();

    comp.setData({ name: 'rotate', color: 'rgba(0,0,0,1)' });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();
    comp.querySelector('.titian-icon').dispatchEvent('tap');
    await Promise.resolve();
    expect(clickCallback).toHaveBeenCalled();
    clickCallback.mockClear();
  });
});
