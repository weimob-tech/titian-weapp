const path = require('path');
const { getBehavior } = require('../../common/test/getBehavior');
const { getComponent } = require('../../common/test/getComponent');

describe('test behavior link', () => {
  const stack = [];
  const { getCurrentPages } = global;

  beforeAll(() => {
    global.getCurrentPages = jest.fn(() => stack);
  });

  afterAll(() => {
    global.getCurrentPages = getCurrentPages;
  });

  it('test link navigateTo, props success', (done) => {
    const behavior = getBehavior(path.join(__dirname, '../link.ts'));
    const mockNavigateToFn = jest.fn();
    const mockRedirectToFn = jest.fn();
    const { navigateTo, redirectTo } = global.wx;

    global.wx.navigateTo = () => {
      stack.push('navigateTo');
      mockNavigateToFn();
    };

    global.wx.redirectTo = async () => {
      stack.push('redirectTo');
      return mockRedirectToFn();
    };

    const comp = getComponent(
      {
        template: '<view class="test" bind:tap="jumpToLink">{{link}}</view>',
        behaviors: [behavior]
      },
      {
        link: 'pages/root/index'
      }
    );

    for (let i = 0; i <= 10; i += 1) {
      comp.querySelector('.test').dispatchEvent('tap');
    }

    Promise.resolve().then(() => {
      expect(comp).toMatchSnapshot();
      expect(mockNavigateToFn).toBeCalledTimes(10);
      expect(mockRedirectToFn).toBeCalledTimes(1);
      expect(stack).toEqual([
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'navigateTo',
        'redirectTo'
      ]);
      global.wx.navigateTo = navigateTo;
      global.wx.redirectTo = redirectTo;
      done();
    });
  });
});
