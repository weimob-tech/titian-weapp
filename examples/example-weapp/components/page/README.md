#### 属性（props）

| 名称   | 类型    | 是否必填 | 默认值 | 说明             | 备注 |
| ------ | ------- | -------- | ------ | ---------------- | ---- |
| options | array   | 是       | -      | 配置数据         | -    |
| center | boolean | 否       | true   | 插槽内容居中显示 | -    |

```javascript
option数据结构: [
  {
    key: 'xxx', // 唯一标识
    type: 'radio', // 单选类型。目前type就三种类型，'radio' | 'color' | 'radius'
    name: 'xxx', // 菜单中的英文名称，例如 'Mode'
    desc: 'xxx', // 菜单中的中文描述，例如 '模式'
    list: [
      // 单选类型下的选项数据
      { label: 'xxx', value: 'xxx', hiddenItems: [] }, // hiddenItems 数组中添加此项被选中后需要隐藏项的name
      { label: 'xxx', value: 'xxx', attr: {} } // 自定义内容
    ],
    attr: {}, // 自定义内容
    value: 'xxx' // 选中的值，为list中的value值
  },
  { type: 'color', name: 'Color', desc: '颜色', value: '#fa2c19' }, // 颜色类型
  { type: 'radius', name: 'Radius', desc: '圆角', value: 0 } // 圆角类型
];
```

#### 方法（methods）/ 事件（events）

| 名称       | 参数列表     | 说明               | 备注 |
| ---------- | ------------ | ------------------ | ---- |
| bind:click | attr: object | 点击按钮的触发函数 | -    |
