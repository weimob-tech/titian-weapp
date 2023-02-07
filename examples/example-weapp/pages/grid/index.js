// pages/grid/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        key: 'direction',
        type: 'radio',
        name: 'Mode',
        desc: '模式 ',
        list: [
          {
            label: '纵排',
            value: 'column',
            attr: {
              group: {
                3: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' }
                ],
                4: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' },
                  { text: '待评价', icon: 'to-comment' }
                ],
                6: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' },
                  { text: '待评价', icon: 'to-comment' },
                  { text: '待付款', icon: 'to-comment' },
                  { text: '待付款', icon: 'mine-to-pay' }
                ]
              }
            }
          },
          {
            label: '横排',
            value: 'row',
            attr: {
              group: {
                3: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' }
                ],
                4: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' },
                  { text: '待评价', icon: 'to-comment' }
                ],
                6: [
                  { text: '待付款', icon: 'mine-to-pay' },
                  { text: '待收货', icon: 'to-deliver' },
                  { text: '待发货', icon: 'to-receive' },
                  { text: '待评价', icon: 'to-comment' },
                  { text: '待付款', icon: 'to-comment' },
                  { text: '待付款', icon: 'mine-to-pay' }
                ]
              }
            }
          },
          {
            label: '自定义',
            value: 'custom',
            attr: {
              group: {
                3: [1, 2, 3],
                4: [1, 2, 3, 4],
                6: [1, 2, 3, 4, 5, 6]
              },
              customContent: true
            }
          }
        ],
        value: 'column'
      },
      {
        key: 'number',
        type: 'radio',
        name: 'Number',
        desc: '数量',
        list: [
          { label: '3个', value: 3, attr: { column: 3 } },
          { label: '4个', value: 4, attr: { column: 4 } },
          { label: '6个', value: 6, attr: { column: 3 } }
        ],
        value: 3
      },
      {
        key: 'divide',
        type: 'radio',
        name: 'Divide',
        desc: '分割线 ',
        list: [
          { label: '无', value: false },
          { label: '有', value: true }
        ],
        value: false
      }
    ],
    attr: null
  },
  onChange(event) {
    this.setData({ attr: event.detail });
  },
  onShareAppMessage() {
    return {
      title: 'Grid 宫格',
      path: 'pages/grid/index'
    };
  }
});
