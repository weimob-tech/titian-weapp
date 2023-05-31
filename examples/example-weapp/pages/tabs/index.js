Page({
  data: {
    options: [
      {
        type: 'radio',
        key: 'mode',
        desc: '模式',
        name: 'Mode',
        list: [
          {
            label: '默认',
            value: 'default',
            hiddenItems: ['style2'],
            attr: {
              tabs: ['全部商品', '热销', '连衣裙', '上衣', '加大的裤子', '帽子', '鞋子']
            }
          },
          {
            label: '滑块',
            value: 'block',
            hiddenItems: ['style1', 'color', 'divider'],
            attr: {
              variant: 'block',
              tabs: ['选中项', '未选中'],
              count: 2,
              gap: -1
            }
          },
          {
            label: '日历',
            value: 'calendar',
            hiddenItems: ['style2'],
            attr: {
              variant: 'calendar',
              tabs: [
                { label: '01', description: '周一' },
                { label: '02', description: '周二' },
                { label: '03', description: '周三' },
                { label: '04', description: '周四' },
                { label: '05', description: '周五' },
                { label: '06', description: '周六' },
                { label: '07', description: '周日' }
              ]
            }
          },
          {
            label: '自定义',
            value: 'multi',
            hiddenItems: ['style2'],
            attr: {
              variant: 'multi',
              tabs: [
                { label: '第1期', description: '11.27', date: '2022-11-279' },
                {
                  label: '第2期',
                  description: '11.28',
                  tag: '国庆节',
                  date: '2022-11-28'
                },
                { label: '第3期', description: '11.29', date: '2022-11-29' },
                { label: '第4期', description: '11.30', date: '2022-11-30' },
                { label: '第5期', description: '12.01', date: '2022-12-01' },
                { label: '第6期', description: '12.02', date: '2022-12-02' },
                { label: '第7期', description: '12.03', date: '2022-12-03' }
              ]
            }
          }
        ],
        value: 'calendar'
      },
      {
        type: 'radio',
        key: 'style1',
        desc: '类型',
        name: 'Style',
        list: [
          {
            label: '等分',
            value: 'same',
            attr: {
              count: 4,
              gap: -1
            }
          },
          {
            label: '滑动',
            value: 'block',
            attr: {
              tabWidth: 168,
              gap: -1
            }
          },
          {
            label: '等间距',
            value: 'gap',
            attr: {
              gap: 20,
              tabWidth: -1
            }
          }
        ],
        value: 'same'
      },
      {
        type: 'radio',
        key: 'style2',
        desc: '样式',
        name: 'Style',
        list: [
          {
            label: '通栏',
            value: 'full',
            attr: {
              count: 2
            }
          },
          {
            label: '居中',
            value: 'center',
            attr: {
              tabWidth: 160,
              autoGap: false
            }
          }
        ],
        value: 'full'
      },
      {
        desc: '颜色',
        key: 'color',
        type: 'color',
        name: 'Color'
      },
      {
        type: 'radio',
        key: 'divider',
        desc: '上滑分割',
        name: 'Divide',
        list: [
          {
            label: '无',
            value: 'default'
          },
          {
            label: '线分割',
            value: 'line'
          },
          {
            label: '投影分割',
            value: 'shadow'
          }
        ],
        value: 'default'
      }
    ],
    refresh: true,
    attrs: {}
  },
  onChange(e) {
    const attrs = JSON.parse(JSON.stringify(e.detail));
    attrs.autoGap = attrs.autoGap ?? true;
    if (attrs.count) {
      attrs.tabs.length = attrs.count;
    }
    if (attrs.variant === 'calendar') {
      attrs.extStyle = `--tabs-active-text-color: ${attrs.color}`;
    }
    this.setData(
      {
        refresh: false
      },
      () => {
        this.setData({
          attrs,
          refresh: true
        });
      }
    );
  },
  onShareAppMessage() {
    return {
      title: 'Tabs 标签页',
      path: 'pages/tabs/index'
    };
  }
});
