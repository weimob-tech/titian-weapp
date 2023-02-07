import { mergeOptionIntoAttrs } from '../../util/index';

Page({
  data: {
    rate1: 2,
    rate2: 3,
    options: [
      {
        desc: '模式',
        key: 'state',
        type: 'radio',
        name: 'State',
        list: [
          { label: '基础', value: 1 },
          {
            label: '只读禁用',
            value: 2,
            attr: { readOnly: true, disabled: true }
          },
          { label: '自定义', value: 3, attr: { icon: 'tabbar-vip-highlight' } }
        ],
        value: 1
      },
      { desc: '颜色', key: 'color', type: 'color', name: 'Color' },
      {
        desc: '数量',
        key: 'count',
        type: 'radio',
        name: 'Number',
        list: [
          { label: '五星', value: 5 },
          { label: '六星', value: 6 },
          { label: '七星', value: 7 }
        ],
        value: 5
      },

      {
        desc: '半星',
        key: 'allowHalf',
        type: 'radio',
        name: 'Half',
        list: [
          { label: '否', value: false },
          { label: '是', value: true }
        ],
        value: false
      }
    ],
    attrs: {},
    shouldRender: true
  },
  onChange(event) {
    const { options } = this.data;

    const attrs = mergeOptionIntoAttrs(options, event.detail);
    if (attrs.allowHalf !== this.data.attrs.allowHalf) {
      this.setData({ shouldRender: false }, () => {
        this.setData({ attrs, shouldRender: true });
      });
    } else {
      this.setData({ attrs });
    }
  },
  onChange1(event) {
    const { value } = event.detail;
    this.setData({
      rate1: value
    });
  },
  onChange2(event) {
    const { value } = event.detail;
    this.setData({
      rate2: value
    });
  },
  onShareAppMessage() {
    return {
      title: 'Rate 评分',
      path: 'pages/rate/index'
    };
  }
});
