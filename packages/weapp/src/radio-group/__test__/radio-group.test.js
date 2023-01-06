const path = require('path');
const simulate = require('miniprogram-simulate');

const { getSystemInfoSync } = wx;

global.wx.getSystemInfoSync = () => {
  const res = getSystemInfoSync();
  return {
    ...res,
    SDKVersion: '2.9.3'
  };
};

describe('test component', () => {
  const id = simulate.load(path.resolve(__dirname, './index'), {
    rootPath: path.join(process.cwd(), 'packages/weapp', 'src')
  });

  it('should render success', async () => {
    const container = simulate.render(id);
    container.attach(document.createElement('parent-wrapper'));
    await simulate.sleep(40);
    expect(container.toJSON()).toMatchSnapshot();

    const radioIconWrap = container.querySelector('.radio >>> .titian-radio-icon-wrap');
    const radio2IconWrap = container.querySelector('.radio2 >>> .titian-radio-icon-wrap');

    radioIconWrap.dispatchEvent('tap');
    await simulate.sleep(80);
    expect(container.data.selectValue).toBe('1');
    expect(container.toJSON()).toMatchSnapshot();

    radio2IconWrap.dispatchEvent('tap');
    await simulate.sleep(80);
    expect(container.data.selectValue).toBe('2');
    expect(container.toJSON()).toMatchSnapshot();
  });
});
