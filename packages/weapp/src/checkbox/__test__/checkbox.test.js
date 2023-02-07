const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  const { getSystemInfoSync } = global.wx;
  const VALUE = 'value';
  beforeAll(() => {
    global.wx.getSystemInfoSync = () => ({
      ...getSystemInfoSync(),
      SDKVersion: '2.10.0'
    });
  });

  afterAll(() => {
    global.wx.getSystemInfoSync = getSystemInfoSync;
  });

  it('should render success', () => {
    const comp = getComponent('checkbox');
    expect(comp).toMatchSnapshot();
  });

  it('should render label, icon, color, size, shape props success', async () => {
    const LABEL = 'label';
    const ICON = 'icon';

    const comp = getComponent('checkbox', {
      label: LABEL,
      icon: ICON,
      color: 'red',
      size: '64',
      shape: '0'
    });
    comp.triggerLifeTime('attached');

    await simulate.sleep(40);

    const expectProps = (selector, expectValue) => {
      expect(comp.querySelector(selector).dom.innerHTML).toEqual(expectValue);
    };

    expectProps('.titian-checkbox-label', LABEL);

    expect(comp).toMatchSnapshot();
  });

  it('should checked do success', (done) => {
    const mockFn = jest.fn();
    const comp = getComponent('checkbox', {
      checked: true
    });

    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();

    comp.addEventListener('change', mockFn);

    Promise.resolve()
      .then(() => {
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).toBeCalled();
        comp.querySelector('.titian-checkbox-label').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).toBeCalled();
        done();
      });
  });

  it('should defaultChecked do success', (done) => {
    let defaultChecked = true;
    const mockFn = jest.fn((e) => {
      defaultChecked = !defaultChecked;
      expect(e.detail).toBe(defaultChecked);
    });

    const comp = getComponent('checkbox', {
      defaultChecked,
      value: VALUE
    });

    comp.triggerLifeTime('attached');
    comp.addEventListener('change', mockFn);

    Promise.resolve()
      .then(async () => {
        await simulate.sleep(40);
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
        await simulate.sleep(40);
      })
      .then(async () => {
        expect(mockFn).toBeCalledTimes(1);
        comp.querySelector('.titian-checkbox-label').dispatchEvent('tap');
        await simulate.sleep(40);
      })
      .then(() => {
        expect(mockFn).toBeCalledTimes(2);
        done();
      });
  });

  it('should disabled do success', (done) => {
    const mockFn = jest.fn();
    const comp = getComponent('checkbox', {
      disabled: true
    });

    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();

    comp.addEventListener('change', mockFn);

    Promise.resolve()
      .then(() => {
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).not.toBeCalled();
        comp.querySelector('.titian-checkbox-label').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).not.toBeCalled();
        done();
      });
  });

  it('should labelDisabled do success', (done) => {
    const mockFn = jest.fn();
    const comp = getComponent('checkbox', {
      labelDisabled: true
    });

    expect(comp).toMatchSnapshot();

    comp.triggerLifeTime('attached');
    comp.addEventListener('change', mockFn);

    Promise.resolve()
      .then(() => {
        comp.instance.updateDataFromParent();
        comp.querySelector('.titian-checkbox-label').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).not.toBeCalled();
        done();
      });
  });

  it('should trigger parent change method success', (done) => {
    const mockFn = jest.fn((e) => {
      expect(e.detail).toStrictEqual([VALUE]);
    });

    const comp = getComponent('checkbox', {
      value: VALUE
    });

    const parent = getComponent('checkbox-group', {
      max: 1
    });

    parent.triggerLifeTime('attached');
    comp.triggerLifeTime('attached');
    parent.addEventListener('change', mockFn);

    Promise.resolve()
      .then(() => {
        comp.instance.setParent(parent.instance);
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
      })
      .then(() => {
        expect(mockFn).toBeCalled();
        done();
      });
  });

  it('should select glt max not success', (done) => {
    const mockFn = jest.fn();
    const comp = getComponent('checkbox', {
      value: VALUE
    });

    const parent = getComponent('checkbox-group', {
      max: 2,
      defaultValue: ['placeholder1', 'placeholder2']
    });

    parent.triggerLifeTime('attached');
    comp.triggerLifeTime('attached');
    parent.addEventListener('handleMax', mockFn);

    Promise.resolve()
      .then(async () => {
        comp.instance.setParent(parent.instance);
        comp.instance.updateDataFromParent();
        await simulate.sleep(40);
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
        await simulate.sleep(40);
      })
      .then(() => {
        expect(mockFn).toBeCalled();
        done();
      });
  });

  it('should control checked by parent value success', (done) => {
    const mockFn = jest.fn();

    const comp = getComponent('checkbox', {
      value: VALUE
    });

    const parent = getComponent('checkbox-group', {
      max: 2,
      value: ['placeholder1', 'placeholder2', VALUE]
    });

    parent.triggerLifeTime('attached');
    comp.triggerLifeTime('attached');
    parent.addEventListener('change', mockFn);
    Promise.resolve()
      .then(async () => {
        comp.instance.setParent(parent.instance);
        comp.instance.updateDataFromParent();
        await simulate.sleep(40);
        comp.querySelector('.titian-checkbox-icon-wrap').dispatchEvent('tap');
        await simulate.sleep(40);
      })
      .then(() => {
        expect(mockFn).toBeCalled();
        done();
      });
  });
});
