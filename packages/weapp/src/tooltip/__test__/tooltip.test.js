const simulate = require('miniprogram-simulate');
const { getComponentId } = require('../../common/test/getComponent');

async function render(wrapper, comp, data) {
  comp.dispatchEvent('tap');
  await Promise.resolve();
  wrapper.setData(data);
  await Promise.resolve();
  comp.dispatchEvent('tap');
  await Promise.resolve();
  expect(wrapper).toMatchSnapshot();
}

describe('test component', () => {
  it('should render success', async () => {
    const tooltip = getComponentId('tooltip');
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-tooltip': tooltip
        },
        data: {
          closeOnClick: true,
          direction: 'bottom',
          left: '0px',
          top: '0px',
          content: '每行文字限制十二个中文字每行文'
        },
        template: `<view id='tooltip' style="margin-left:{{ left }};margin-top:{{ top }}">
                      <ti-tooltip close-on-click="{{ closeOnClick }}" direction="{{  direction }}"
                        content="{{ content }}"
                      >每行文字限制十二</ti-tooltip>
                    </view>`
      })
    );
    wrapper.attach(document.createElement('parent-wrapper'));
    const comp = wrapper.querySelector('#tooltip >>> .titian-tooltip');

    const renderData = [];
    [true, false].forEach((closeOnClick) =>
      ['bottom', 'top'].forEach((direction) =>
        ['0px', '80vw'].forEach((left) =>
          ['每行文字限制十二个中文字每行文', '每行文字限'].forEach((content) =>
            ['0px', '99vh'].forEach((top) =>
              ['flex-start', 'center', 'flex-end'].forEach((justify) =>
                renderData.push({
                  justify,
                  direction,
                  closeOnClick,
                  top,
                  left,
                  content
                })
              )
            )
          )
        )
      )
    );
    await renderData.reduce((promise, data) => promise.then(() => render(wrapper, comp, data)), Promise.resolve());
  });
});
