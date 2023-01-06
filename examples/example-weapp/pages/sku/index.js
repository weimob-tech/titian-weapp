import { mockSkuData, mockSkuDataSingle } from './mockData';

Page({
  onShareAppMessage() {
    return {
      title: 'SKU 商品规则选择器',
      path: 'pages/sku/index'
    };
  },
  data: {
    specs: mockSkuData.specs,
    skus: mockSkuData.skus,
    options: [
      {
        type: 'radio',
        name: 'Style',
        key: 'styleType',
        desc: '风格',
        value: 0,
        list: [
          {
            value: 0,
            label: '潮流',
            attr: {
              cssVariable: '--base-radius-size: -999px; --capsule-radius-size: -999px;'
            }
          },
          {
            value: 1,
            label: '通用',
            attr: {
              cssVariable: '--base-radius-size: 0px; --capsule-radius-size: 0px;'
            }
          },
          {
            value: 2,
            label: '可爱',
            attr: {
              cssVariable: '--base-radius-size: 8px; --capsule-radius-size: 999px;'
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Default',
        key: 'spec',
        desc: '默认值',
        value: 'sku',
        list: [
          { value: 'sku', label: 'skuId', hiddenItems: ['optionIds'] },
          { value: 'options', label: 'optionIds', hiddenItems: ['skuId'] }
        ]
      },
      {
        type: 'radio',
        name: 'optionIds',
        key: 'optionIds',
        desc: 'Option Ids',
        value: 'a',
        list: [
          {
            value: 'a',
            label: `['1']`,
            attr: { value: null, optionIds: ['1'] }
          },
          {
            value: 'b',
            label: `['1', '3']`,
            attr: { value: null, optionIds: ['1', '3'] }
          },
          {
            value: 'c',
            label: `['2', '3']`,
            attr: { value: null, optionIds: ['2', '3'] }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Sku Id',
        key: 'skuId',
        desc: 'Sku Id',
        value: '1',
        list: [
          { value: '1', label: '1', attr: { value: '1', optionIds: [] } },
          { value: '2', label: '2', attr: { value: '2', optionIds: [] } },
          { value: '3', label: '3', attr: { value: '3', ooptionIds: [] } },
          { value: '4', label: '4', attr: { value: '4', ooptionIds: [] } },
          { value: '5', label: '5', attr: { value: '5', ooptionIds: [] } }
        ]
      }
    ],
    attrs: {}
  },
  onTap() {
    this.setData({
      visible: true
    });
  },
  onClose() {
    this.setData({
      visible: false
    });
  },
  onChange(e) {
    console.log('onChange', e.detail);
    const { detail } = e;
    const { style, ...rest } = detail;

    // --s: 1是通用型，0是潮流型，2是可爱型

    const themeVariableStr = `--s:${style}`;
    this.setData({ attrs: rest, themeVariableStr });
  },
  onTiChange(e) {
    console.log('onTiChange', e);
  },
  onTiOptionChange(e) {
    console.log('onTiOptionChange', e);
  }
});
