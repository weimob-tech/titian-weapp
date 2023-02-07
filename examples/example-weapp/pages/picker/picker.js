import {
  packageFullDataObjList,
  packageFullDataSimpleList,
  packageSimpleDataObjList,
  packageSimpleDataSimpleList,
  tree,
  unPackageFullDataObjList,
  unPackageFullDataSimpleList,
  unPackageSimpleDataObjList,
  unPackageSimpleDataSimpleList
} from './config';

function getHiddenItems(key) {
  const list = [
    'packageFullDataObjList',
    'packageFullDataSimpleList',
    'packageSimpleDataObjList',
    'packageSimpleDataSimpleList',
    'tree',
    'unPackageFullDataObjList',
    'unPackageFullDataSimpleList',
    'unPackageSimpleDataObjList',
    'unPackageSimpleDataSimpleList'
  ];
  return list.filter((item) => item !== key);
}
const pattern = [
  {
    value: 0,
    label: '级联数据',
    hiddenItems: getHiddenItems('tree'),
    attr: { list: tree, key: 'tree' }
  },
  {
    value: 1,
    label: '未嵌简单数据简单列',
    hiddenItems: getHiddenItems('unPackageSimpleDataSimpleList'),
    attr: {
      list: unPackageSimpleDataSimpleList,
      key: 'unPackageSimpleDataSimpleList'
    }
  },
  {
    value: 2,
    label: '未嵌简单数据对象列',
    hiddenItems: getHiddenItems('unPackageSimpleDataObjList'),
    attr: {
      list: unPackageSimpleDataObjList,
      key: 'unPackageSimpleDataObjList'
    }
  },
  {
    value: 3,
    label: '未嵌完整数据简单列',
    hiddenItems: getHiddenItems('unPackageFullDataSimpleList'),
    attr: {
      list: unPackageFullDataSimpleList,
      key: 'unPackageFullDataSimpleList'
    }
  },
  {
    value: 4,
    label: '未嵌完整数据对象列',
    hiddenItems: getHiddenItems('unPackageFullDataObjList'),
    attr: { list: unPackageFullDataObjList, key: 'unPackageFullDataObjList' }
  },
  {
    value: 5,
    label: '嵌套完整数据简单列',
    hiddenItems: getHiddenItems('packageFullDataSimpleList'),
    attr: { list: packageFullDataSimpleList, key: 'packageFullDataSimpleList' }
  },
  {
    value: 6,
    label: '嵌套完整数据对象列',
    hiddenItems: getHiddenItems('packageFullDataObjList'),
    attr: { list: packageFullDataObjList, key: 'packageFullDataObjList' }
  },
  {
    value: 7,
    label: '嵌套简单数据简单列',
    hiddenItems: getHiddenItems('packageSimpleDataSimpleList'),
    attr: {
      list: packageSimpleDataSimpleList,
      key: 'packageSimpleDataSimpleList'
    }
  },
  {
    value: 8,
    label: '嵌套简单数据对象列',
    hiddenItems: getHiddenItems('packageSimpleDataObjList'),
    attr: { list: packageSimpleDataObjList, key: 'packageSimpleDataObjList' }
  }
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    attrs: {},
    opt: [
      {
        desc: '模式',
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        value: 0,
        list: pattern
      },
      {
        type: 'radio',
        desc: '级联数据',
        name: '',
        key: 'tree',
        value: 0,
        list: tree
      },
      {
        type: 'radio',
        desc: '未嵌简单数据结构简单列',
        name: '',
        key: 'unPackageSimpleDataSimpleList',
        value: 0,
        list: unPackageSimpleDataSimpleList
      },
      {
        type: 'radio',
        desc: '未嵌简单数据结构对象列',
        name: '',
        key: 'unPackageSimpleDataObjList',
        value: 0,
        list: unPackageSimpleDataObjList
      },
      {
        type: 'radio',
        desc: '未嵌完整数据结构简单列',
        name: '',
        key: 'unPackageFullDataSimpleList',
        value: 0,
        list: unPackageFullDataSimpleList
      },
      {
        type: 'radio',
        desc: '未嵌完整数据结构对象列',
        name: '',
        key: 'unPackageFullDataObjList',
        value: 0,
        list: unPackageFullDataObjList
      },
      {
        type: 'radio',
        desc: '嵌套完整数据结构简单列',
        name: '',
        key: 'packageFullDataSimpleList',
        value: 0,
        list: packageFullDataSimpleList
      },
      {
        type: 'radio',
        desc: '嵌套完整数据结构对象列',
        name: '',
        key: 'packageFullDataObjList',
        value: 0,
        list: packageFullDataObjList
      },
      {
        type: 'radio',
        desc: '嵌套简单数据结构简单列',
        name: '',
        key: 'packageSimpleDataSimpleList',
        value: 0,
        list: packageSimpleDataSimpleList
      },
      {
        type: 'radio',
        desc: '嵌套简单数据结构对象列',
        name: '',
        key: 'packageSimpleDataObjList',
        value: 0,
        list: packageSimpleDataObjList
      }
    ],
    visible: false,
    options: [],
    value: []
  },
  onChange(e) {
    const { detail } = e;
    const data = detail.list[detail[detail.key]].fn();
    console.log('data = ', data);
    this.setData({
      attrs: { ...detail },
      ...data
    });
  },
  toggleVisible() {
    this.setData({
      visible: !this.data.visible
    });
  },
  onClick() {},
  onPickerChange(e) {
    const { value, options } = e.detail;
    console.log('value = ', value);
    console.log('options = ', options);
  }
});
