const simulate = require('miniprogram-simulate');
const { getComponent, getComponentId } = require('../../common/test/getComponent');
const { isIncomplete } = require('../const');
const getMock = require('./mock/index');

function getGroup(params) {
  const item = { ...params };
  const renderData = item.fn();
  if (!Array.isArray(renderData.options)) {
    renderData.options = [renderData.options];
    renderData.value = [renderData.value];
  }
  if (isIncomplete(renderData.options)) {
    renderData.options = [renderData.options];
    renderData.value = [renderData.value];
  }
  if (!Array.isArray(renderData.value)) {
    renderData.value = [];
  }
  renderData.value = renderData.value.filter(Boolean);

  if (!Array.isArray(item.result.value)) {
    item.result.value = [item.result.value];
  }
  if (!Array.isArray(item.result.options)) {
    item.result.options = [item.result.options];
  }
  item.result.value = item.result.value.map((i, index) => {
    if (typeof i !== 'object') {
      return {
        colAlias: `${index}`,
        value: i
      };
    }
    return i;
  });
  item.result.options = item.result.options.map((i, index) => {
    if (typeof i.colAlias === 'undefined') {
      return {
        colAlias: `${index}`,
        options: i
      };
    }
    return i;
  });
  renderData.options = renderData.options
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .map((i, index) => {
      if (Array.isArray(i)) {
        return {
          colAlias: `${index}`,
          column: i
        };
      }
      if (typeof i.column !== 'undefined' && typeof i.colAlias !== 'undefined') {
        return i;
      }
      return undefined;
    })
    .filter(Boolean)
    .map((i, index) => ({
      ...i,
      _val: typeof renderData.value[index] === 'object' ? renderData.value[index].value : renderData.value[index]
    }));
  return { diffData: item, renderData };
}
describe('test component', () => {
  const pickerData = getMock()[1].list[0];
  it('should render success', () => {
    const comp = getComponent('picker');
    expect(comp).toMatchSnapshot();
  });

  it('定制 optionItemHeight string', async () => {
    const comp = getComponent('picker', {
      ...pickerData.fn(),
      optionItemHeight: '200rpx'
    });
    comp.triggerLifeTime('attached');
    comp.triggerLifeTime('ready');
    await simulate.sleep(0);
    expect(comp).toMatchSnapshot();
  });

  it('定制 optionItemHeight number ', async () => {
    const comp = getComponent('picker', {
      ...pickerData.fn(),
      optionItemHeight: 200
    });
    comp.triggerLifeTime('attached');
    comp.triggerLifeTime('ready');
    await simulate.sleep(0);
    expect(comp).toMatchSnapshot();
  });
  it('dispatch event ', async () => {
    const picker = getComponentId('picker');
    const pickerColumn = getComponentId('picker-column');

    const reachBottom = jest.fn();
    const reachTop = jest.fn();
    const toggleVisible = jest.fn();
    const onPickerChange = jest.fn();
    const { renderData } = getGroup(pickerData);
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-picker': picker,
          'ti-picker-column': pickerColumn
        },
        data: { ...renderData },
        template: `<ti-picker id="picker" visible-item-count="5" bind:change="onPickerChange"
                      bind:cancel="toggleVisible"  bind:confirm="toggleVisible" 
                      bind:reachBottom="reachBottom" bind:reachTop="reachTop">
                        <ti-picker-column 
                              label="{{ label }}" 
                              id="picker-column-{{idx}}"
                              wx:for-index="idx" 
                              value="{{item._val}}" 
                              wx:for="{{options}}" 
                              columns="{{ item.column }}" 
                              col-alias="{{item.colAlias}}"              
                              row-alias="{{ rowAlias }}"
                              use-row-index="{{ useRowIndex }}"
                        />
                    </ti-picker>
              `,
        methods: {
          onPickerChange,
          toggleVisible,
          reachBottom,
          reachTop
        }
      })
    );
    wrapper.attach(document.createElement('parent-picker'));
    const columnComp = wrapper.querySelector('#picker-column-0');
    const cancel = wrapper.querySelector('#picker >>> .titian-titlebar-left');
    cancel.dispatchEvent('tap');
    await simulate.sleep(0);
    expect(toggleVisible).toHaveBeenCalledTimes(1);
    toggleVisible.mockClear();
    columnComp.instance.synchronous({
      isTop: true,
      isBottom: false,
      rowIndex: 0,
      colAlias: columnComp.data.colAlias
    });
    await simulate.sleep(0);
    expect(reachTop).toHaveBeenCalledTimes(1);

    columnComp.instance.synchronous({
      isTop: false,
      isBottom: true,
      rowIndex: columnComp.data.columns.length - 1,
      colAlias: columnComp.data.colAlias
    });
    await simulate.sleep(0);

    expect(reachBottom).toHaveBeenCalledTimes(1);
  });
});
describe.each(getMock())('$value  $label', ({ list }) => {
  test.each(list)(` $label `, async (item) => {
    const picker = getComponentId('picker');
    const toggleVisible = jest.fn();
    const onPickerChange = jest.fn();
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-picker': picker
        },
        data: item.fn(),
        template: `<ti-picker
              id="picker"
              row-alias="{{ rowAlias }}"
              label="{{ label }}"
              value="{{ value }}"
              options="{{ options }}"
              cascade="{{ cascade || 'children' }}"
              use-row-index="{{ useRowIndex }}"
              visible-item-count="5"
              bind:change="onPickerChange"
              bind:cancel="toggleVisible"
              bind:confirm="toggleVisible" />`,
        methods: {
          onPickerChange,
          toggleVisible
        }
      })
    );
    wrapper.attach(document.createElement('parent-picker'));
    const confirm = wrapper.querySelector('#picker >>> .titian-titlebar-right');
    await simulate.sleep(0);
    expect(onPickerChange).toHaveBeenCalledTimes(1);
    expect(onPickerChange.mock.calls[0][0].detail).toStrictEqual(item.result);
    confirm.dispatchEvent('tap');
    await simulate.sleep(0);
    expect(toggleVisible).toHaveBeenCalledTimes(1);
  });
});

const group = getMock().filter((item) => item.value !== 'tree');

describe.each(group)('组合 $value  $label', ({ list }) => {
  test.each(list)(` $label `, async (item) => {
    const picker = getComponentId('picker');
    const pickerColumn = getComponentId('picker-column');

    const toggleVisible = jest.fn();
    const onPickerChange = jest.fn();
    const { diffData, renderData } = getGroup(item);
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'ti-picker': picker,
          'ti-picker-column': pickerColumn
        },
        data: renderData,
        template: `<ti-picker
                      id="picker"
                      visible-item-count="5"
                      bind:change="onPickerChange"
                      bind:cancel="toggleVisible"
                      bind:confirm="toggleVisible" >
                        <ti-picker-column 
                              label="{{ label }}" 
                              wx:for-index="idx" 
                              value="{{item._val}}" 
                              wx:for="{{options}}" 
                              columns="{{ item.column }}" 
                              col-alias="{{item.colAlias}}"              
                              row-alias="{{ rowAlias }}"
                              use-row-index="{{ useRowIndex }}"
                        />
                      </ti-picker>
              `,
        methods: {
          onPickerChange,
          toggleVisible
        }
      })
    );
    wrapper.attach(document.createElement('parent-picker'));
    const confirm = wrapper.querySelector('#picker >>> .titian-titlebar-right');
    await simulate.sleep(0);
    expect(onPickerChange).toHaveBeenCalledTimes(renderData.options.length);
    renderData.options.forEach((i, index) => {
      const defaultValue = onPickerChange.mock.calls[index][0].detail;
      const val = [...diffData.result.value];
      const opt = [...diffData.result.options];
      val.length = index + 1;
      opt.length = index + 1;
      expect(defaultValue).toStrictEqual({ value: val, options: opt });
    });
    confirm.dispatchEvent('tap');
    await simulate.sleep(0);
    expect(toggleVisible).toHaveBeenCalledTimes(1);
    expect(toggleVisible.mock.calls[0][0].detail).toStrictEqual(diffData.result);
  });
});
