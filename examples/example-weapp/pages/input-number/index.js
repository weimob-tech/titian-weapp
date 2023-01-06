// pages/input-number/index.js
Page({
  data: {
    options: [
      {
        type: 'radio',
        name: 'Mode',
        desc: '模式',
        key: 'mode',
        value: 'default',
        list: [
          {
            label: '默认',
            value: 'default'
          },
          {
            label: '填充1',
            value: 'input1',
            attr: { variant: 'block' }
          },
          {
            label: '填充2',
            value: 'input2',
            attr: { variant: 'block', extInputClass: 'ext-input-class' }
          },
          {
            label: '线框',
            value: 'line',
            attr: {
              border: true
            }
          }
        ]
      },
      {
        type: 'radius',
        name: 'Radius',
        desc: '圆角',
        key: 'shape',
        value: 8,
        max: 28,
        min: 0
      },
      {
        type: 'radio',
        name: 'Size',
        desc: '规格',
        key: 'size',
        value: 'medium',
        list: [
          {
            label: 'Medium',
            value: 'medium'
          },
          {
            label: 'Big',
            value: 'big'
          }
        ]
      },
      {
        type: 'radio',
        name: 'Interaction',
        desc: '交互',
        key: 'interaction',
        value: 'default',
        list: [
          {
            label: '默认',
            value: 'default'
          },
          {
            label: '自适应宽度',
            value: 'auto',
            attr: {
              autoWidth: true
            }
          },
          {
            label: '指定步长 +10',
            value: 'specify',
            attr: {
              step: 10
            }
          },
          {
            label: '限制范围',
            value: 'restrictedRange',
            attr: {
              min: 0,
              max: 20
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Unfold',
        desc: '收起',
        key: 'thumbnail',
        value: false,
        list: [
          {
            label: '否',
            value: false
          },
          {
            label: '是',
            value: true
          }
        ]
      }
    ]
  },

  convertShape(detail) {
    if (detail.shape !== undefined) {
      const value = detail.shape;
      detail.extStyle = `${detail.extStyle || ''};--input-number-radius: ${value}rpx;`;
    }
  },

  onChange(e) {
    const { detail } = e;

    this.convertShape(detail);

    this.setData({
      attrs: {
        step: 1,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
        extPlusClass: 'ext-plus-class',
        extMinusClass: 'ext-minus-class',
        ...detail
      }
    });
  },
  onShareAppMessage() {
    return {
      title: 'Input Number 步进器',
      path: 'pages/input-number/index'
    };
  }
});
