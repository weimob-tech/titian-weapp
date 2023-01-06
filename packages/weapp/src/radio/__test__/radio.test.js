const simulate = require('miniprogram-simulate');
const { getComponentId } = require('../../common/test/getComponent');

describe('test component', () => {
  const radio = getComponentId('radio');
  it('should defaultValue setting success', async () => {
    const onChange = jest.fn();
    const container = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-radio': radio
        },
        template: `
          <ti-radio id='radio' bind:change='onChange' value='1' checked='{{checked}}' defaultChecked='{{defaultChecked}}'>a</ti-radio>
        `,
        data: {
          defaultChecked: false,
          checked: null
        },
        methods: {
          onChange
        }
      })
    );

    container.attach(document.createElement('parent-wrapper'));
    await simulate.sleep(40);
    expect(container.toJSON()).toMatchSnapshot();
    const radioIconWrap = container.querySelector('#radio').querySelector('.titian-radio-icon-wrap');
    const radioLabelWrap = container.querySelector('#radio').querySelector('.titian-radio-label');

    {
      radioIconWrap.dispatchEvent('tap');
      await simulate.sleep(40);
      expect(container.toJSON()).toMatchSnapshot();
      expect(onChange).toBeCalledTimes(1);

      radioLabelWrap.dispatchEvent('tap');
      await simulate.sleep(40);
      expect(onChange).toBeCalledTimes(2);
    }
  });

  it('should checked control component success', async () => {
    const onChange = jest.fn();
    const container = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-radio': radio
        },
        template: `
          <ti-radio id='radio' value='1' checked='{{checked}}'>a</ti-radio>
        `,
        data: {
          checked: false
        },
        methods: {
          onChange
        }
      })
    );

    container.attach(document.createElement('parent-wrapper'));
    await simulate.sleep(40);
    expect(container.toJSON()).toMatchSnapshot();

    const radioIconWrap = container.querySelector('#radio').querySelector('.titian-radio-icon-wrap');

    {
      radioIconWrap.dispatchEvent('tap');
      await simulate.sleep(40);
      expect(onChange).not.toBeCalled();

      expect(
        container.querySelector('#radio').querySelector('.titian-radio').dom.className.includes('titian-radio-checked')
      ).toBe(false);
    }

    {
      container.setData({
        checked: true
      });
      radioIconWrap.dispatchEvent('tap');
      await simulate.sleep(40);
      expect(onChange).not.toBeCalled();

      expect(
        container.querySelector('#radio').querySelector('.titian-radio').dom.className.includes('titian-radio-checked')
      ).toBe(true);
    }
  });
});
