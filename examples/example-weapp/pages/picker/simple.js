function getSimpleData() {
  return new Array(12).fill(0).map((item, idx) => `选项-${idx}`);
}
function getDateData() {
  return new Array(12).fill(0).map((item, idx) => ({
    txt: `选项-${idx}`,
    label: `${idx}-项`
  }));
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    column: getSimpleData(),
    column_1: [getSimpleData(), getSimpleData()],
    value_1: ['选项-8', '选项-11'],
    value_1_1: [8, 10],
    column_1_1: [getDateData(), getDateData()],
    colsAlias_2: ['fir', 'sec'],
    value_2: ['选项-8', '选项-11'],
    value_3: [
      { type: 'first', value: '选项-8' },
      { type: 'sed', value: '选项-8' }
    ],
    value_4: '选项-8',
    cascade: {
      options: [
        [{ label: '无脊柱动物' }, { label: '脊柱动物' }],
        [
          { label: '扁性动物' },
          { label: '线形动物' },
          { label: '环节动物' },
          { label: '软体动物' },
          { label: '节肢动物' }
        ],
        [
          { label: '猪肉绦虫' },
          { label: '吸血虫' },
          { label: '环节动物' },
          { label: '软体动物' },
          { label: '节肢动物' }
        ]
      ],
      value: [0, 0, 0],
      cascadeKey: null
    }
  },
  onSimConfirm(e) {
    const { options } = e.detail;
    wx.showToast({
      icon: 'none',
      title: options.join('-')
    });
  },
  onSimChange(e) {
    const { value } = e.detail;
    wx.showToast({
      icon: 'none',
      title: value.join('-')
    });
  },
  onSimChange1(e) {
    const { value } = e.detail;
    wx.showToast({
      icon: 'none',
      title: value.map((item) => item.value).join('-')
    });
  },
  onSimConfirm_1(e) {
    const { options } = e.detail;

    wx.showToast({
      icon: 'none',
      title: options.join('-')
    });
  },
  onSimChange_1(e) {
    const { value } = e.detail;
    wx.showToast({
      icon: 'none',
      title: value.join('-')
    });
  },
  onConfirm(e) {
    const { options } = e.detail;
    wx.showToast({
      icon: 'none',
      title: options.map((item) => item.label).join('-')
    });
  },
  onChange(e) {
    const { options } = e.detail;
    wx.showToast({
      icon: 'none',
      title: options.map((item) => item.label).join('-')
    });
  },
  onCascadeChange(e) {
    const { colIndex, rowIndex, value } = e.detail;
    if (typeof colIndex === 'undefined' || typeof rowIndex === 'undefined') {
      return;
    }
    const len = value[1];
    const size = value[2];
    switch (colIndex) {
      case 0:
        switch (rowIndex) {
          case 0:
            this.setData({
              'cascade.options[1]': [
                { label: '扁性动物' },
                { label: '线形动物' },
                { label: '环节动物' },
                { label: '软体动物' },
                { label: '节肢动物' }
              ],
              'cascade.options[2]': [{ label: '猪肉绦虫' }, { label: '吸血虫' }],
              'cascade.value': [value[0], len > 4 ? 0 : len, size > 1 ? 0 : size]
            });
            break;
          default:
            this.setData({
              'cascade.options[1]': [{ label: '鱼' }, { label: '两栖动物' }, { label: '爬行动物' }],
              'cascade.options[2]': [{ label: '鲫鱼' }, { label: '带鱼' }],
              'cascade.value': [value[0], len > 3 ? 0 : len, size > 1 ? 0 : size]
            });
            break;
        }
        break;
      case 1:
        switch (value[colIndex - 1]) {
          case 0:
            // eslint-disable-next-line no-case-declarations
            switch (rowIndex) {
              case 0:
                this.setData({
                  'cascade.options[2]': [{ label: '猪肉绦虫' }, { label: '吸血虫' }],
                  'cascade.value': [value[0], value[1], size > 1 ? 0 : size]
                });
                break;
              case 1:
                this.setData({
                  'cascade.options[2]': [{ label: '蛔虫' }],
                  'cascade.value': [value[0], value[1], 0]
                });
                break;
              case 2:
                this.setData({
                  'cascade.options[2]': [{ label: '蚂蚁' }, { label: '蚂蟥' }],
                  'cascade.value': [value[0], value[1], size > 1 ? 0 : size]
                });
                break;
              case 3:
                this.setData({
                  'cascade.options[2]': [{ label: '河蚌' }, { label: '蜗牛' }, { label: '蛞蝓' }],
                  'cascade.value': [value[0], value[1], size > 2 ? 0 : size]
                });
                break;
              case 4:
                this.setData({
                  'cascade.options[2]': [
                    { label: '昆虫' },
                    { label: '甲壳动物' },
                    { label: '蛛形动物' },
                    { label: '多足动物' }
                  ],
                  'cascade.value': [value[0], value[1], size > 3 ? 0 : size]
                });
                break;
              default:
                break;
            }
            break;
          case 1:
            switch (rowIndex) {
              case 0:
                this.setData({
                  'cascade.options[2]': [{ label: '鲫鱼' }, { label: '带鱼' }],
                  'cascade.value': [value[0], value[1], size > 1 ? 0 : size]
                });
                break;
              case 1:
                this.setData({
                  'cascade.options[2]': [{ label: '青蛙' }, { label: '娃娃鱼' }],
                  'cascade.value': [value[0], value[1], size > 1 ? 0 : size]
                });
                break;
              case 2:
                this.setData({
                  'cascade.options[2]': [{ label: '蜥蜴' }, { label: '龟' }, { label: '壁虎' }],
                  'cascade.value': [value[0], value[1], size > 2 ? 0 : size]
                });
                break;
              case 3:
                this.setData({
                  'cascade.options[2]': [{ label: '河蚌' }, { label: '蜗牛' }, { label: '蛞蝓' }],
                  'cascade.value': [value[0], value[1], size > 2 ? 0 : size]
                });
                break;
              case 4:
                this.setData({
                  'cascade.options[2]': [
                    { label: '昆虫' },
                    { label: '甲壳动物' },
                    { label: '蛛形动物' },
                    { label: '多足动物' }
                  ],
                  'cascade.value': [value[0], value[1], size > 4 ? 0 : size]
                });
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  },
  onCascadeCancel() {},
  onCascadeConfirm(e) {
    const { options } = e.detail;
    wx.showToast({
      icon: 'none',
      title: options.map((item) => item.label).join('-')
    });
  },
  onCascadeTop() {},
  onCascadeBottom() {}
});
