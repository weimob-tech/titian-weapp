Page({
  data: {
    options: [
      {
        desc: '模式',
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        list: [
          {
            label: '默认',
            value: 'default',
            attr: {
              table: [
                {
                  title: '标题文字',
                  description: '详细内容文字，详细内容文字，详细内容文字',
                  time: '2018.07.06 09:52:42'
                },
                {
                  title: '标题文字',
                  description: '详细内容文字，详细内容文字，详细内容文字',
                  time: '2018.07.06 09:52:42'
                },
                {
                  title: '标题文字',
                  description: '详细内容文字，详细内容文字',
                  time: '2018.07.06 09:52:42'
                }
              ]
            }
          },
          {
            label: '自定义',
            value: 'custom',
            attr: {
              subtitleAlign: 'right',
              table: [
                {
                  description: '详细内容文字，详细内容文字，详细内容文字',
                  icon: 'addressreceiving'
                },
                {
                  title: '标题文字',
                  subtitle: '2018.07.06 09:52:42',
                  description: '详细内容文字，详细内容文字，详细内容文字',
                  icon: 'addressright',
                  checked: true
                },
                {
                  title: '标题文字',
                  subtitle: '2018.07.06 09:52:42',
                  description: '详细内容文字，详细内容文字'
                }
              ]
            }
          }
        ],
        value: 'default'
      },
      { desc: '颜色', key: 'activeColor', type: 'color', name: 'Color' }
    ],
    attrs: {}
  },
  onChange(e) {
    const { detail } = e;
    this.setData({
      attrs: detail
    });
  },
  onShareAppMessage() {
    return {
      title: 'Steps 步骤条',
      path: 'pages/steps/index'
    };
  }
});
