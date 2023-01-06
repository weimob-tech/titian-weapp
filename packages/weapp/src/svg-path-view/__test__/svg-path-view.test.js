const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', async () => {
    const comp = getComponent('svg-path-view', { name: 'checkbox' });

    const clickCallback = jest.fn();
    comp.addEventListener('click', clickCallback);

    expect(comp).toMatchSnapshot();
    comp.setData({ name: 'close-double', fills: null });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();

    comp.setData({ name: 'close-double', fills: ['#000', '#ccc'] });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();
    comp.querySelector('.titian-svg-path-view').dispatchEvent('tap');
    await Promise.resolve();
    expect(clickCallback).toHaveBeenCalled();
    clickCallback.mockClear();

    comp.setData({ name: 'checkbox', fills: ['#000', '#ccc'] });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();

    comp.setData({ name: 'checkbox', fills: 'rgba(0,0,0,1)' });
    await Promise.resolve();
    expect(comp).toMatchSnapshot();
    comp.querySelector('.titian-svg-path-view').dispatchEvent('tap');
    await Promise.resolve();
    expect(clickCallback).toHaveBeenCalled();
    clickCallback.mockClear();
  });
});
