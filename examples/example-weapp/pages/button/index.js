Page({
  data: {
    options: [
      {
        type: 'radio',
        name: 'Mode',
        key: 'variant',
        desc: '模式 ',
        list: [
          { value: 'contained', label: '面性强调', attr: { text: '面性强调' } },
          { value: 'filled', label: '面性次要', attr: { text: '面性次要' } },
          { value: 'outlined', label: '线性强调', attr: { text: '线性强调' } },
          {
            value: 'outlined1',
            label: '线性次要',
            attr: {
              text: '线性次要',
              type: 'simple',
              variant: 'outlined',
              color: ''
            },
            hiddenItems: ['color']
          },
          {
            value: 'outline',
            label: '渐变按钮',
            attr: {
              variant: 'contained',
              color: 'linear-gradient(270deg, rgba(239, 71, 31, 0.75) 0%, #FFBE70 100%)',
              text: '渐变按钮'
            },
            hiddenItems: ['color']
          },
          { value: 'text', label: '文字按钮', attr: { text: '文字按钮' } }
        ],
        value: 'contained'
      },
      {
        type: 'color',
        name: 'Color',
        key: 'color',
        desc: '颜色 ',
        value: '#fa2c19'
      },
      {
        type: 'radius',
        name: 'Shape',
        key: 'shape',
        desc: '圆角',
        value: 8,
        max: 50
      },
      {
        type: 'radio',
        name: 'Disabled',
        key: 'disabled',
        list: [
          { value: false, label: '正常' },
          { value: true, label: '禁用' }
        ],
        desc: '禁用',
        value: false
      },
      {
        type: 'radio',
        name: 'Icon',
        key: 'icon',
        list: [
          { value: '', label: '无' },
          {
            value: 'suffixIcon',
            label: '左图标',
            attr: { prefixIcon: 'home' },
            hiddenItems: ['loading']
          },
          {
            value: 'prefixIcon',
            label: '右图标',
            attr: { suffixIcon: 'arrow-right' },
            hiddenItems: ['loading']
          }
        ],
        desc: '图标',
        value: ''
      },
      {
        type: 'radio',
        name: 'Loading',
        key: 'loading',
        list: [
          { value: '无', label: '无', attr: { loading: false } },
          { value: '文字加载', label: '文字加载', attr: { loading: true } },
          {
            value: '纯加载',
            label: '纯加载',
            attr: { loading: true, text: '' }
          }
        ],
        desc: '加载',
        value: '无'
      },
      {
        type: 'radio',
        name: 'Width',
        key: 'width',
        value: 'auto',
        desc: '宽度',
        list: [
          {
            value: 'extStyle',
            label: '定宽',
            attr: { extStyle: 'width: 200rpx;' }
          },
          { value: 'auto', label: '自适应' },
          { value: 'full', label: '通栏', attr: { block: true } }
        ]
      },
      {
        type: 'radio',
        name: 'Size',
        key: 'size',
        list: [
          { value: 'tiny', label: 'Tiny' },
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'big', label: 'Big' },
          { value: 'large', label: 'Large' }
        ],
        desc: '规格',
        value: 'medium'
      }
    ],
    attrs: {}
  },

  convertShape(detail) {
    if (detail.shape !== undefined) {
      const value = detail.shape;

      detail.extStyle = `${detail.extStyle || ''}--button-radius:${value}rpx;`;
    }
  },

  onChange(e) {
    const { detail } = e;

    this.convertShape(detail);
    this.setData({ attrs: { text: '按钮', ...detail } });
  },

  onShareAppMessage() {
    return {
      title: 'Button 按钮',
      path: 'pages/button/index'
    };
  }
});
