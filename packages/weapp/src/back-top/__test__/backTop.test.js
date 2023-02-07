const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('back-top');
    expect(comp).toMatchSnapshot();
  });

  it('should use slot success', () => {
    const comp = getComponent('back-top', {
      useSlot: true
    });

    expect(comp).toMatchSnapshot();
  });

  it('should has text success', () => {
    const TEXT = '返回顶部';

    const comp = getComponent('back-top', {
      text: TEXT
    });
    expect(comp).toMatchSnapshot();
    expect(comp.querySelector('.titian-back-top-text').dom.innerHTML).toEqual(TEXT);
  });

  it('should trigger component attach lifeItems success', () => {
    const comp = getComponent('back-top');
    const onPageScroll = jest.fn();
    const currentPage = {
      onPageScroll
    };

    global.getCurrentPages = jest.fn(() => [currentPage]);
    comp.triggerLifeTime('attached');

    expect(global.getCurrentPages).toHaveBeenCalled();

    currentPage.onPageScroll({ scrollTop: 400 });

    expect(onPageScroll).toBeCalledTimes(1);
    expect(comp.instance.data.show).toBeTruthy();

    comp.setData({ visibilityHeight: 300 });
    expect(comp.instance.data.visibilityHeight).toBe(300);

    currentPage.onPageScroll({ scrollTop: 200 });
    expect(onPageScroll).toBeCalledTimes(2);
    expect(comp.instance.data.show).toBeFalsy();

    currentPage.onPageScroll({ scrollTop: 250 });
    expect(onPageScroll).toBeCalledTimes(3);
    expect(comp.instance.data.show).toBeFalsy();
  });

  it('should trigger click success', (done) => {
    const duration = 300;

    const pageScrollTo = jest.fn((e) => {
      expect(e.scrollTop).toBe(0);
      expect(e.duration).toBe(duration);
    });

    wx.pageScrollTo = pageScrollTo;

    const comp = getComponent('back-top', {
      duration
    });

    const onClick = jest.fn();
    comp.addEventListener('click', onClick);

    comp.querySelector('.titian-back-top').dispatchEvent('tap');

    Promise.resolve().then(() => {
      expect(onClick).toHaveBeenCalled();
      done();
    });
  });
});
