const path = require('path');
const simulate = require('miniprogram-simulate');

describe('test component', () => {
  jest.setTimeout(15000);
  const id = simulate.load(path.resolve(__dirname, './index'), {
    rootPath: path.join(process.cwd(), 'packages/weapp', 'src')
  });

  it('should render success', async () => {
    const callback = jest.fn((fn) => {
      process.nextTick(fn);
    });
    global.wx.nextTick = callback;
    const container = simulate.render(id);
    container.attach(document.createElement('parent-wrapper'));
    const menu = container.querySelector('.menu').querySelectorAll('.titian-dropdown-menu-title >>> .titian-button');

    {
      // title click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.toJSON()).toMatchSnapshot();
      expect(container.data.visible).toBe(true);
    }

    {
      // cell tap => 选中
      const cell = container.querySelector('.item1').querySelector('.titian-dropdown-item >>> .titian-cell');
      cell.dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.changeValue).toBe(''); // 为啥会触发多次？？？
      expect(container.data.visible).toBe(true);
      expect(
        container
          .querySelector('.menu')
          .querySelectorAll('.titian-dropdown-menu-title >>> .titian-button')[0]
          .dom.innerHTML.indexOf('选项1') > -1
      ).toBe(true);

      // title click => 关闭
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(false);

      // title click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);

      // submit

      const btn = container.querySelector('.item1').querySelector('.titian-dropdown-item >>> #titian-button');
      btn.dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.value).toBe(''); // 为啥会触发多次？？？
      expect(container.data.visible).toBe(false);
    }

    {
      // title click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);

      // cell tap => 取消选中
      const cell = container.querySelector('.item1').querySelector('.titian-dropdown-item >>> .titian-cell');
      cell.dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.changeValue).toBe('');

      // submit
      const btn = container.querySelector('.item1').querySelector('.titian-dropdown-item >>> .titian-button');
      btn.dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.value).toBe('');
      expect(container.data.visible).toBe(false);
    }

    {
      // title1 click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);

      // title2 click => 展开， title1 关闭
      menu[1].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(false);
    }
  });

  it('should multiple mode do success', async () => {
    const callback = jest.fn((fn) => {
      process.nextTick(fn);
    });
    global.wx.nextTick = callback;
    const container = simulate.render(id);
    container.setData({ multiple: true });
    container.attach(document.createElement('parent-wrapper'));
    const menu = container.querySelector('.menu').querySelectorAll('.titian-dropdown-menu-title >>> .titian-button');

    {
      // title click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.toJSON()).toMatchSnapshot();
      expect(container.data.visible).toBe(true);
    }
    const cells = container.querySelector('.item1').querySelectorAll('.titian-dropdown-item >>> .titian-cell');
    const btn = container.querySelector('.item1').querySelector('.titian-dropdown-item >>> .titian-button');

    {
      // cell tap => 选中
      cells[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);
      expect(container.data.changeValue).toStrictEqual(['']);

      // cell2 tap => 选中
      cells[1].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);
      expect(container.data.changeValue).toStrictEqual(['']);

      // submit
      btn.dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.value).toStrictEqual(['']);
      expect(container.data.visible).toBe(false);
    }

    {
      // title click => 展开
      menu[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      // expect(container.toJSON()).toMatchSnapshot();
      expect(container.data.visible).toBe(true);

      // cell tap => 取消选中
      cells[0].dispatchEvent('tap');
      await simulate.sleep(1000);
      expect(container.data.visible).toBe(true);
      expect(container.data.changeValue).toStrictEqual(['1']);
    }
  });
});
