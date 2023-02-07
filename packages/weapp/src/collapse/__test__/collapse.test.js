const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');
const { data } = require('./mock/index');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('collapse');
    expect(comp).toMatchSnapshot();
  });
  test.each(data)(`options $label `, async (item) => {
    const comp = getComponent('collapse', item.props);
    const changeCallback = jest.fn();
    const openCallback = jest.fn();
    const closeCallback = jest.fn();

    comp.addEventListener('change', changeCallback);
    comp.addEventListener('open', openCallback);
    comp.addEventListener('close', closeCallback);

    comp.triggerLifeTime('attached');
    await simulate.sleep(0);
    const children = comp.querySelectorAll('.internal_children');
    const dilation = children.filter((child) => child.querySelector('.titian-collapse-item-dilation'))[0];
    const unDilation = children.filter((child) => !child.querySelector('.titian-collapse-item-dilation'))[0];
    expect(dilation.data.title).toBe(item.expect[0]);

    // 点击 初始化未选中面板
    unDilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[1]);
    expect(openCallback.mock.calls[0][0].detail).toStrictEqual(item.open[0]);
    changeCallback.mockClear();

    // 再次点击 初始化未选中面板
    unDilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[2]);
    expect(closeCallback.mock.calls[0][0].detail).toStrictEqual(item.close[0]);

    changeCallback.mockClear();
    openCallback.mockClear();
    closeCallback.mockClear();

    // 点击 初始化选中面板
    dilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[3]);

    if (item.props.repel) {
      expect(openCallback.mock.calls[0][0].detail).toStrictEqual(item.open[1]);
    } else {
      expect(closeCallback.mock.calls[0][0].detail).toStrictEqual(item.close[1]);
    }
  });

  test.each(data)(`组合 $label `, async (item) => {
    const comp = getComponent('collapse', {
      value: item.props.value,
      repel: item.props.repel || false
    });
    const changeCallback = jest.fn();
    const openCallback = jest.fn();
    const closeCallback = jest.fn();

    comp.addEventListener('change', changeCallback);
    comp.addEventListener('open', openCallback);
    comp.addEventListener('close', closeCallback);

    const children = item.props.options.map((props) => getComponent('collapse-item', props));
    comp.instance.getRelationNodes = jest.fn(() => children.map((child) => child.instance));
    children.forEach((child) => {
      child.instance.getRelationNodes = jest.fn(() => [comp.instance]);
    });

    comp.triggerLifeTime('attached');
    children.forEach((child) => {
      child.triggerLifeTime('attached');
    });
    await simulate.sleep(0);

    const dilation = children.filter((child) => child.data.status === 'un_fold')[0];
    const unDilation = children.filter((child) => child.data.status === 'fold')[0];
    expect(dilation.data.title).toBe(item.expect[0]);

    // 点击 初始化未选中面板
    unDilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[1]);
    expect(openCallback.mock.calls[0][0].detail).toStrictEqual(item.open[0]);
    changeCallback.mockClear();

    // 再次点击 初始化未选中面板
    unDilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[2]);
    expect(closeCallback.mock.calls[0][0].detail).toStrictEqual(item.close[0]);

    changeCallback.mockClear();
    openCallback.mockClear();
    closeCallback.mockClear();

    // 点击 初始化选中面板
    dilation.querySelector('.titian-collapse-item >>> .titian-cell').dispatchEvent('tap');
    await simulate.sleep(0);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[3]);

    if (item.props.repel) {
      expect(openCallback.mock.calls[0][0].detail).toStrictEqual(item.open[1]);
    } else {
      expect(closeCallback.mock.calls[0][0].detail).toStrictEqual(item.close[1]);
    }
  });
});
