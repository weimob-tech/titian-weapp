const simulate = require('miniprogram-simulate');
const { getComponent, getComponentId } = require('../../common/test/getComponent');

const mockToday = '2022-02-27';
jest.setSystemTime(new Date(mockToday));
const { data } = require('./mock/index');

beforeAll(() => {
  jest.useFakeTimers('modern');
});
describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('datetime-picker');
    expect(comp).toMatchSnapshot();
  });

  it('should render success', async () => {
    const { props } = data[6];
    const datetimePicker = getComponentId('datetime-picker');
    const changeCallback = jest.fn();

    const propStr = Object.keys(props).reduce((target, key) => {
      const lineKey = key.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
      return ` ${target}   ${lineKey}="{{ ${key} }}" `;
    }, '');
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-datetime-picker': datetimePicker
        },
        data: props,
        template: `<ti-datetime-picker
                        id="datetimePicker"
                        ${propStr}
                        bind:change="changeCallback"   /> `,
        methods: {
          changeCallback
        }
      })
    );
    wrapper.attach(document.createElement('parent-datetime-picker'));
    await Promise.resolve();
    changeCallback.mockClear();
    const yearComp = wrapper
      .querySelectorAll('#datetimePicker >>> .internal_children')
      .find((item) => item.data.colAlias === 'year');
    yearComp.instance.onSelect({
      rowIndex: yearComp.data.row + 1,
      colAlias: yearComp.data.colAlias
    });
    await Promise.resolve();
    expect(changeCallback).toHaveBeenCalledTimes(1);
  });

  test.each(data)(`options $label `, async (item) => {
    const datetimePicker = getComponentId('datetime-picker');
    const changeCallback = jest.fn();
    const toggleVisible = jest.fn();

    const propStr = Object.keys(item.props).reduce((target, key) => {
      const lineKey = key.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
      return ` ${target}   ${lineKey}="{{ ${key} }}" `;
    }, '');
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-datetime-picker': datetimePicker
        },
        data: item.props,
        template: `<ti-datetime-picker
                        id="datetimePicker"
                        ${propStr}
                        bind:change="changeCallback" bind:cancel="toggleVisible" bind:confirm="toggleVisible" /> `,
        methods: {
          changeCallback,
          toggleVisible
        }
      })
    );
    wrapper.attach(document.createElement('parent-datetime-picker'));
    await Promise.resolve();
    expect(changeCallback).toHaveBeenCalledTimes(item.expect[0].number);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.expect[0].data);
    if (typeof item.props.formatter === 'function') {
      const { colAlias } = wrapper.querySelector('#datetimePicker >>> .titian-picker-column-item-box').dom.dataset;
      const dom = wrapper.querySelector('#datetimePicker >>> .titian-picker-column-item').dom.innerHTML.trim();
      const val = wrapper.querySelector('#datetimePicker').data[`${colAlias}Option`][0].value;
      item.props.formatter(colAlias, val);
      expect(item.props.formatter(colAlias, val)).toBe(dom);
    }

    if (item.expect[0].first) {
      const firstColumn = wrapper.querySelector('#datetimePicker >>> .titian-picker-column-item-box');
      expect(firstColumn.dom.dataset.colAlias).toBe(item.expect[0].first);
    }

    const confirm = wrapper.querySelector('#datetimePicker >>> .titian-titlebar-right');
    confirm.dispatchEvent('tap');
    await Promise.resolve();
    expect(toggleVisible).toHaveBeenCalledTimes(1);
    expect(toggleVisible.mock.calls[0][0].detail).toStrictEqual(item.expect[0].data);

    toggleVisible.mockClear();

    const cancel = wrapper.querySelector('#datetimePicker >>> .titian-titlebar-left');
    cancel.dispatchEvent('tap');
    await Promise.resolve();
    expect(toggleVisible).toHaveBeenCalledTimes(1);
    toggleVisible.mockClear();
  });
});
afterAll(() => {
  jest.useRealTimers();
});
