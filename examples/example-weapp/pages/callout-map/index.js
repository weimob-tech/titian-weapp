const markers = [
  {
    id: 1,
    longitude: 121.503926,
    latitude: 31.336736,
    borderType: 'round',
    width: 30,
    height: 36,
    title1: '复旦大学复旦大学复旦大学复旦大学复旦大学复旦大学复旦大学复旦大学复旦大学复旦大学',
    title2: '上海市'
  },
  {
    id: 2,
    longitude: 121.526642,
    latitude: 31.313197,
    borderType: 'round',
    width: 30,
    height: 36,
    title1: '上海体育学院(杨浦校区)',
    title2: '上海市杨浦区绿瓦大道'
  },
  {
    id: 3,
    longitude: 121.487579,
    latitude: 31.342663,
    borderType: 'round',
    width: 30,
    height: 36,
    title1: '宝山区淞南二村(淞发路北)',
    title2: '上海市宝山区淞发路'
  }
];

// 微盟大厦
const CENTER = {
  longitude: 121.498279,
  latitude: 31.342663
};

Page({
  data: {
    options: [
      {
        type: 'radio',
        name: 'Style',
        key: 'styleType',
        desc: '风格',
        value: 0,
        list: [
          {
            value: 0,
            label: '潮流',
            attr: {
              cssVariable: '--base-radius-size: -999rpx; --capsule-radius-size: -999rpx;'
            }
          },
          {
            value: 1,
            label: '通用',
            attr: {
              cssVariable: '--base-radius-size: 0rpx; --capsule-radius-size: 0rpx;'
            }
          },
          {
            value: 2,
            label: '可爱',
            attr: {
              cssVariable: '--base-radius-size: 8rpx; --capsule-radius-size: 999rpx;'
            }
          }
        ]
      },
      {
        key: 'mapHeight',
        type: 'radio',
        name: 'Map Height',
        desc: '高度 ',
        list: [
          { label: 'auto', value: 0 },
          { label: '400rpx', value: 400 },
          { label: '600rpx', value: 600 }
        ],
        value: 400
      },
      {
        key: 'center',
        type: 'radio',
        name: 'Center',
        desc: '中心 ',
        list: [
          {
            label: '地点1',
            value: 1,
            attr: { longitude: 121.503926, latitude: 31.336736 }
          },
          {
            label: '地点2',
            value: 2,
            attr: { longitude: 121.526642, latitude: 31.313197 }
          },
          {
            label: '地点3',
            value: 3,
            attr: { longitude: 121.487579, latitude: 31.342663 }
          }
        ],
        value: 1
      }
    ],
    attrs: {
      markers,
      longitude: 121.503926,
      latitude: 31.336736,
      calloutStyle: {
        pageMargin: 28,
        topMargin: 24,
        bottomMargin: 24,
        mapHeight: 423
      }
    }
  },

  onChange(e) {
    const { detail } = e;
    console.log('onChange -> ', { ...this.data.attrs, ...detail });
    this.setData({
      attrs: {
        ...this.data.attrs,
        ...detail
      }
    });
  },

  onShareAppMessage() {
    return {
      title: 'CalloutMap 导航地图',
      path: 'pages/callout-map/index'
    };
  }
});
