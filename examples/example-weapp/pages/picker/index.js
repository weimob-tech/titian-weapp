import city from './city';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    attrs: {},
    options: [
      {
        desc: '模式',
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        value: 'single',
        list: [
          {
            label: '单列',
            value: 'single',
            attr: {
              options: ['选项一', '选项二', '选项三', '选项四', '选项五']
            }
          },
          {
            label: '双列',
            value: 'double',
            attr: {
              options: [
                ['选项一', '选项二', '选项三', '选项四', '选项五'],
                ['选项一', '选项二', '选项三', '选项四', '选项五']
              ]
            }
          },
          {
            label: '级联',
            value: 'cascade',
            attr: { options: city, label: 'name', rowAlias: 'code' }
          }
        ]
      },
      {
        desc: '选中项',
        key: 'selected',
        type: 'radio',
        name: 'Selected',
        list: [
          { label: '无', value: false },
          { label: '默认选中', value: true }
        ],
        value: false
      },
      {
        desc: '加载中',
        key: 'loading',
        type: 'radio',
        name: 'Loading',
        list: [
          { label: '无', value: false },
          { label: '有', value: true }
        ],
        value: false
      }
    ],
    visible: false
  },
  toggleVisible() {
    this.setData({
      visible: !this.data.visible
    });
  },
  onPickerChange(e) {
    console.log(e.detail);
  },
  onChange(e) {
    const { detail } = e;
    if (detail.selected) {
      switch (detail.mode) {
        case 'single':
          detail.value = ['选项三'];
          break;
        case 'double':
          detail.value = ['选项三', '选项四'];
          break;
        case 'cascade':
          detail.options = city;
          detail.value = ['330000', '330600', '330681'];
          break;
        default:
          break;
      }
    }
    this.setData({ attrs: { ...detail } });
  },
  onShareAppMessage() {
    return {
      title: 'Picker 选择器',
      path: 'pages/picker/index'
    };
  }
});
