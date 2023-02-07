function getSimpleData() {
  return new Array(12).fill(0).map((item, idx) => `选项-${idx}`);
}

function padZero(val, number = 2) {
  return `${val}`.padStart(number, '0');
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    column: getSimpleData(),
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2018, 0, 10).getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date(2018, 1, 28).getTime(),
    currentDate1: new Date(2018, 1, 28, 12, 19).getTime(),
    currentDate2: null,
    currentDate3: new Date(2018, 0, 1),
    currentDate4: '12:00',
    loading: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${padZero(value)}年`;
      }
      if (type === 'month') {
        return `${padZero(value)}月`;
      }
      if (type === 'day') {
        return `${padZero(value)}天`;
      }
      if (type === 'hour') {
        return `${padZero(value)}时`;
      }
      return `${padZero(value)}分`;
    },
    filter(type, options) {
      if (type === 'minute') {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        return options.filter((options) => options.value % 10 === 0);
      }
      return options;
    },
    value_4: '选项-8',
    options: [
      {
        type: 'radio',
        desc: '模式',
        name: 'Mode',
        key: 'mode',
        list: [
          { value: 'default', label: '基础', hiddenItems: ['custom'] },
          { value: 'custom', label: '自定义', hiddenItems: ['type'] }
        ],
        value: 'default'
      },
      {
        type: 'radio',
        desc: '样式',
        name: 'Style',
        key: 'type',
        list: [
          { value: 'year-month', label: '年月', attr: { title: '选择年月' } },
          { value: 'date', label: '年月日', attr: { title: '选择年月日' } },
          { value: 'time', label: '时分秒', attr: { title: '选择时分秒' } },
          {
            value: 'datetime',
            label: '年月日时分',
            attr: { title: '选择年月日时分' }
          }
        ],
        value: 'year-month'
      },
      {
        type: 'radio',
        desc: '自定义',
        name: 'Customize',
        key: 'custom',
        list: [
          {
            value: 'editor',
            label: '文案',
            attr: {
              formatter: (type, value) => {
                if (type === 'year') {
                  return `${padZero(value)}年`;
                }
                if (type === 'month') {
                  return `${padZero(value)}月`;
                }
                if (type === 'day') {
                  return `${padZero(value)}天`;
                }
                if (type === 'hour') {
                  return `${padZero(value)}时`;
                }
                return `${padZero(value)}分`;
              }
            }
          },
          {
            value: 'sort',
            label: '纵裂顺序',
            attr: { sort: ['month', 'day', 'year'] }
          }
        ],
        value: 'editor'
      }
    ],
    visible: false,
    attr: null
  },
  onChange(e) {
    this.setData({ attr: e.detail });
  },
  onClick() {
    this.setData({ visible: true });
  },
  onLoad() {
    this.setData(
      {
        loading: true
      },
      () => {
        this.setData(
          {
            currentDate1: new Date(2020, 2, 12, 10, 45).getTime()
          },
          () => {
            this.setData({
              loading: false
            });
          }
        );
      }
    );
  },
  onConfirm(event) {
    const { detail } = event;
    const result = this.getResult(detail);
    wx.showToast({
      title: result,
      icon: 'none'
    });
  },
  onCancel(event) {
    const { detail } = event;
    const result = this.getResult(detail);
    wx.showToast({
      title: result,
      icon: 'none'
    });
  },
  getResult({ value, type }) {
    const date = new Date(value);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return value;
      default:
        return '';
    }
  },
  toggleVisible() {
    this.setData({
      visible: !this.data.visible
    });
  },
  onShareAppMessage() {
    return {
      title: 'Datetime Picker 时间选择',
      path: 'pages/datetime-picker/index'
    };
  }
});
