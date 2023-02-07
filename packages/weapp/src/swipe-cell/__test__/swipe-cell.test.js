const simulate = require('miniprogram-simulate');
const { getComponent, getComponentId } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('swipe-cell');
    expect(comp).toMatchSnapshot();
  });

  it('should basic', (done) => {
    const swipeCell = getComponentId('swipe-cell');
    const comp = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-swipe-cell': swipeCell
        },
        template: `
          <ti-swipe-cell id='swiper-cell' visible='{{visible}}' left-width='{{100}}' right-width='{{100}}'>
            <view slot='left'>
              <text>left</text>
            </view>
            <view>center</view>
            <view slot='right'>
              <text>right</text>
            </view>
          </ti-swipe-cell>
        `,
        data: {
          visible: false
        }
      })
    );
    comp.attach(document.createElement('parent-wrapper'));
    Promise.resolve()
      .then(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          })
      )
      .then(() => {
        expect(comp.toJSON()).toMatchSnapshot();
        comp.setData({ visible: true });
      })
      .then(() => {
        expect(comp.toJSON()).toMatchSnapshot();
        comp.setData({ visible: false });
      })
      .then(() => {
        const swipeCellComp = comp.querySelector('#swiper-cell');
        const chooseImg = swipeCellComp.querySelector('.titian-swipe-cell');
        chooseImg.dispatchEvent('touchstart');
        chooseImg.dispatchEvent('touchmove');
        chooseImg.dispatchEvent('touchend');
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      })
      .then(() => {
        comp.detach();
        done();
      });
  });
});
