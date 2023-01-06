const simulate = require('miniprogram-simulate');
const { getComponent, getComponentId } = require('../../common/test/getComponent');

describe('test component', () => {
  const col = getComponentId('col');
  const row = getComponentId('row');

  it('should render success', () => {
    const comp = getComponent('col');
    expect(comp).toMatchSnapshot();
  });

  it('basic', () => {
    const comp = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-row': row,
          'ti-col': col
        },
        template: `
        <view>
          <ti-row>
            <ti-col span='{{8}}'>
              <view>1</view>
            </ti-col>
            <ti-col span='{{8}}'>
              <view>2</view>
            </ti-col>
            <ti-col span='{{8}}'>
              <view>3</view>
            </ti-col>
          </ti-row>
        </view>
      `
      })
    );
    comp.attach(document.createElement('parent-wrapper'));
    expect(comp.toJSON()).toMatchSnapshot();
  });
});
