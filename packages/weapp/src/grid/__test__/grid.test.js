const path = require('path');
const simulate = require('miniprogram-simulate');

describe('test component', () => {
  const id = simulate.load(path.resolve(__dirname, './index'), {
    rootPath: path.join(process.cwd(), 'packages/weapp', 'src')
  });

  it('should render success', async () => {
    const clickCallback = jest.fn();
    const container = simulate.render(id);
    container.addEventListener('itemClick', clickCallback);

    container.attach(document.createElement('parent-wrapper'));
    await simulate.sleep(0);
    expect(container.toJSON()).toMatchSnapshot();

    const item = container.querySelector('.item').querySelector('.titian-grid-item');
    item.dispatchEvent('tap');
    await simulate.sleep(0);
    expect(clickCallback).toBeCalled();
  });
});
