import city from './city';

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
            label: '固定数据',
            value: 'default',
            attr: {
              code: 'code',
              label: 'name',
              cascade: 'children',
              options: city,
              tab: ['省', '市', '区/县']
            }
          },
          {
            label: '非固定数据',
            value: 'block',
            attr: {
              code: 'areaCode',
              label: 'areaName',
              cascade: 'child',
              tab: ['省', '市', '区/县', '街道']
            }
          }
        ],

        value: 'default'
      },
      {
        type: 'radio',
        key: 'defaultValue',
        desc: '默认值',
        name: 'DefaultValue',
        list: [
          {
            label: '无默认值',
            value: false
          },
          {
            label: '默认值',
            value: true
          }
        ],
        value: false
      }
    ],
    getOption: async (value) =>
      new Promise((resolve, reject) => {
        let data = {};
        let url = '';
        if (value) {
          url = 'http://saas-caiwu-wlc-map-web.app.qa.internal.weimob.com/ls/address/tmp/getAreasByCityId';
          data = { areaCode: value.areaCode };
        } else {
          url = 'http://saas-caiwu-wlc-map-web.app.qa.internal.weimob.com/ls/address/tmp/getProvinceCity';
        }

        wx.request({
          url,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data,
          success: (response) => {
            resolve(response.data.data);
          },
          fail: reject
        });
      })
  },
  toggleVisible() {
    this.setData({
      visible: !this.data.visible
    });
  },
  onChange(event) {
    const { detail } = event;
    if (detail.defaultValue) {
      if (detail.mode === 'default') {
        detail.value = ['330000', '330200', '330211'];
      } else {
        detail.value = ['440000', '440200', '440205', '440205455'];
      }
    }

    this.setData({ attrs: { ...detail } });
  },
  onChangeCascade(event) {
    console.log(event.detail);
  },
  onChangeSwiperCascade(event) {
    console.log(event.detail);
  },
  onShareAppMessage() {
    return {
      title: 'Cascade 级联选择器',
      path: 'pages/cascade/index'
    };
  }
});
