const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');
const { data } = require('./mock/index');

describe('test component', () => {
  test.each(data)(`options $label `, async (item) => {
    const comp = getComponent('tabbar', item.props);
    const selectCallback = jest.fn();
    comp.addEventListener('select', selectCallback);
    comp.triggerLifeTime('attached');
    await simulate.sleep(0);
    const children = comp.querySelectorAll('.internal_children');

    const dilation = children.find((child) => child.data.status === 'select');
    const unDilation = children.find((child) => child.data.status === 'no_select');
    expect(dilation.data.title).toBe(item.expect[0]);
    unDilation.querySelector('.titian-tab-bar-item').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(selectCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[1]);
  });

  test.each(data)(`组合 $label `, async (item) => {
    const comp = getComponent('tabbar', item.props);
    const selectCallback = jest.fn();
    comp.addEventListener('select', selectCallback);

    const children = item.props.options.map((props) => getComponent('tabbar-item', props));

    comp.instance.getRelationNodes = jest.fn(() => children.map((child) => child.instance));
    children.forEach((child) => {
      child.instance.getRelationNodes = jest.fn(() => [comp.instance]);
    });
    comp.triggerLifeTime('attached');
    children.forEach((child) => {
      child.triggerLifeTime('attached');
    });
    await simulate.sleep(0);
    const dilation = children.find((child) => child.data.status === 'select');
    const unDilation = children.find((child) => child.data.status === 'no_select');
    expect(dilation.data.title).toBe(item.expect[0]);
    unDilation.querySelector('.titian-tab-bar-item').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(selectCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[1]);
  });
});
