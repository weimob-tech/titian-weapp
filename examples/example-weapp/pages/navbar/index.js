Page({
  data: {
    options: [
      {
        type: 'radio',
        name: 'Mode',
        key: 'type',
        list: [
          { value: 'normal', label: '正常' },
          { value: 'immersion', label: '沉浸式', hiddenItems: ['usePlaceholder'] }
        ],
        desc: '模式',
        value: 'normal'
      },
      {
        type: 'radio',
        name: 'Subtitle',
        key: 'subtitle',
        list: [
          { value: '', label: '无' },
          { value: '副标题', label: '有' }
        ],
        desc: '副标题',
        value: ''
      },
      {
        type: 'radio',
        name: 'Placeholder',
        key: 'usePlaceholder',
        list: [
          { value: false, label: '关闭' },
          { value: true, label: '开启', hiddenItems: ['frostedGlass'] }
        ],
        desc: '占位',
        value: true
      },
      {
        type: 'radio',
        name: 'FrostedGlass',
        key: 'frostedGlass',
        list: [
          { value: false, label: '关闭' },
          { value: true, label: '开启', hiddenItems: ['color'] }
        ],
        desc: '背景模糊',
        value: true
      },
      {
        type: 'color',
        name: 'Color',
        key: 'color',
        desc: '背景颜色 ',
        value: '#ffffff',
        list: [
          { label: 'white', value: '#ffffff' },
          { label: 'red', value: '#fa2c19' },
          { label: 'orange', value: '#ffa300' },
          { label: 'green', value: '#07c160' },
          { label: 'blue', value: '#2a6ae9' }
        ]
      },
      {
        type: 'radio',
        name: 'LeftIcon',
        key: 'leftIcons',
        list: [
          { value: 0, label: '返回' },
          { value: 1, label: '回到首页' },
          { value: 2, label: '组合' }
        ],
        desc: '图标',
        value: 0
      },
      {
        type: 'radio',
        name: 'Loading',
        key: 'loading',
        list: [
          { value: false, label: '关闭' },
          { value: true, label: '开启' }
        ],
        desc: '加载中',
        value: false
      },
      {
        type: 'radio',
        name: 'Slot',
        key: 'slotName',
        list: [
          { value: 0, label: '不使用' },
          { value: 1, label: '样式一' },
          { value: 2, label: '样式二' }
        ],
        desc: '插槽',
        value: 0
      }
    ],
    navbar: null,
    mode: 'normal',
    attrs: {
      title: '标题'
    }
  },
  onChange(e) {
    const { detail } = e;
    detail.title = '标题';
    console.log('detail', detail);
    detail.color = detail.color || this.data.attrs.color;
    const frontColor = detail.color !== '#ffffff' ? '#ffffff' : '#000000';
    detail.titleColor = frontColor;

    detail.useBackButton = detail.leftIcons !== 1;
    detail.useHomeButton = detail.leftIcons !== 0;

    if (detail.slotName === 1) {
      detail.title = '';
      detail.subtitle = '';
    }

    if (detail.slotName === 2) {
      detail.title = '标题';
      detail.useBackButton = false;
      detail.useHomeButton = false;
    }

    if (detail.type !== this.data.attrs.type) {
      if (detail.type === 'immersion') {
        this.selectComponent('#titian-navbar').clearScrollAnimation(this, '#titian-navbar');
        this.selectComponent('#titian-navbar').scrollAnimate(this, '#titian-navbar', '#scroller');
      } else {
        this.selectComponent('#titian-navbar').clearScrollAnimation(this, '#titian-navbar');
      }
    }
    console.log('detail', detail);
    this.setData({ attrs: { ...detail } });
  },
  clickIcon(e) {
    console.log('clickIcon', e);
  },
  back() {
    console.log('back');
  }
});
