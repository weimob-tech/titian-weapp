import city, { cityValue, cascade, coincidenceCity, coincidenceCityValue } from './cityConfig';

const before = [
  { code: '10086', name: '选项一' },
  { code: '10087', name: '选项二', disabled: true },
  { code: '10088', name: '选项三' }
];
const beforeValue = '10087';
const after = [
  { code: '20086', name: '选项一' },
  { code: '20087', name: '选项二' },
  { code: '20088', name: '选项三' }
];
const afterValue = '20087';
const objRowAlias = 'code';
const objLabel = 'name';

function getTree0() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: city,
    value: cityValue
  };
}
function getTree1() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [city],
    value: [cityValue]
  };
}
function getTree2() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'city', column: city },
    value: { colAlias: 'city', value: cityValue }
  };
}
function getTree3() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [{ colAlias: 'city', column: city }],
    value: [{ colAlias: 'city', value: cityValue }]
  };
}
function getTree4() {
  return {
    rowAlias: objRowAlias,
    label: objLabel,
    options: [before, city],
    value: [beforeValue, cityValue]
  };
}
function getTree5() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'before', column: before },
      { colAlias: 'city', column: city }
    ],
    value: [
      { colAlias: 'before', value: beforeValue },
      { colAlias: 'city', value: cityValue }
    ]
  };
}
function getTree6() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [city, after],
    value: [cityValue, afterValue]
  };
}
function getTree7() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'city', column: city },
      { colAlias: 'after', column: after }
    ],
    value: [
      { colAlias: 'city', value: cityValue },
      { colAlias: 'after', value: afterValue }
    ]
  };
}
function getTree8() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [before, city, after],
    value: [beforeValue, cityValue, afterValue]
  };
}
function getTree9() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'before', column: before },
      { colAlias: 'city', column: city },
      { colAlias: 'after', column: after }
    ],
    value: [
      { colAlias: 'before', column: beforeValue },
      { colAlias: 'city', value: cityValue },
      { colAlias: 'after', value: afterValue }
    ]
  };
}
function getTree11() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [city, city],
    value: [cityValue, cityValue]
  };
}
function getTree12() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      {
        colAlias: 'before',
        column: city
      },
      {
        colAlias: 'after',
        column: city
      }
    ],
    value: [
      { colAlias: 'before', value: cityValue },
      { colAlias: 'after', value: cityValue }
    ]
  };
}

function getTree13() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    cascade,
    options: coincidenceCity,
    value: coincidenceCityValue
  };
}
export const tree = [
  { value: 0, label: '非嵌套级联简单', fn: getTree0 },
  { value: 1, label: '嵌套级联简单', fn: getTree1 },
  { value: 2, label: '非嵌套级联完整', fn: getTree2 },
  { value: 3, label: '嵌套级联完整', fn: getTree3 },
  { value: 4, label: '嵌套(普-级)简单', fn: getTree4 },
  { value: 5, label: '嵌套(普-级)完整', fn: getTree5 },
  { value: 6, label: '嵌套(级-普)简单', fn: getTree6 },
  { value: 7, label: '嵌套(级-普)完整', fn: getTree7 },
  { value: 8, label: '嵌套(普-级-普)简单', fn: getTree8 },
  { value: 9, label: '嵌套(普-级-普)完整', fn: getTree9 },
  { value: 10, label: '嵌套(级-级)简单', fn: getTree11 },
  { value: 11, label: '嵌套(级-级)完整', fn: getTree12 },
  { value: 12, label: 'rowAlias重叠,cascade自定义', fn: getTree13 }
];

const column = ['选项一', '选项二', '选项三', '选项四', '选项五'];

const value = '选项二';
const valueIndex = 1;

const objColumn = [
  { code: '10086', name: '选项一' },
  { code: '10087', name: '选项二' },
  { code: '10088', name: '选项三' },
  { code: '10089', name: '选项四' },
  { code: '10090', name: '选项五' }
];

const objValue = '10087';

const objDisabledColumn = [
  { code: '10086', name: '选项一', disabled: true },
  { code: '10087', name: '选项二' },
  { code: '10088', name: '选项三', disabled: true },
  { code: '10089', name: '选项四' },
  { code: '10090', name: '选项五' }
];

const objDisabledValue = '10088';

//  未嵌套 简单数据结构 字符/数字 列  不用下标,不用默认
function getData0() {
  return {
    useRowIndex: false,
    rowAlias: null,
    options: column,
    label: '',
    value: null
  };
}
//  未嵌套 简单数据结构 字符/数字 列 不用下标,设置默认
function getData1() {
  return {
    useRowIndex: false,
    rowAlias: null,
    options: column,
    label: '',
    value
  };
}
// 未嵌套 简单数据结构 字符/数字 列 使用下标,不用默认
function getData2() {
  return {
    useRowIndex: true,
    rowAlias: null,
    options: column,
    label: '',
    value: null
  };
}
// 未嵌套 简单数据结构 字符/数字 列 使用下标,设置默认
function getData3() {
  return {
    useRowIndex: true,
    rowAlias: null,
    options: column,
    label: '',
    value: valueIndex
  };
}
// 未嵌套 简单数据结构 字符/数字 列
export const unPackageSimpleDataSimpleList = [
  { value: 0, label: '不用下标,不用默认', fn: getData0 },
  { value: 1, label: '不用下标,设置默认', fn: getData1 },
  { value: 2, label: '使用下标,不用默认', fn: getData2 },
  { value: 3, label: '使用下标,设置默认', fn: getData3 }
];

//  未嵌套 简单数据结构 对象 列  不用下标,不用默认
function getData4() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: objColumn,
    value: null
  };
}
//  未嵌套 简单数据结构 对象 列 不用下标,设置默认
function getData5() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    options: objColumn,
    label: objLabel,
    value: objValue
  };
}
//  未嵌套 简单数据结构 对象 列  使用下标,不用默认
function getData6() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    options: objColumn,
    label: objLabel,
    value: null
  };
}
//  未嵌套 简单数据结构 对象 列 使用下标,设置默认
function getData7() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    options: objColumn,
    label: objLabel,
    value: valueIndex
  };
}
// 未嵌套 简单数据结构 对象 列
export const unPackageSimpleDataObjList = [
  { value: 0, label: '不用下标,不用默认', fn: getData4 },
  { value: 1, label: '不用下标,设置默认', fn: getData5 },
  { value: 2, label: '使用下标,不用默认', fn: getData6 },
  { value: 3, label: '使用下标,设置默认', fn: getData7 }
];

// 未嵌套 完整数据结构 字符/数字 列  不用下标,不用默认
function getData8() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: { colAlias: 'key', column },
    value: null
  };
}
// 未嵌套 完整数据结构 字符/数字 列  不用下标,设置默认
function getData9() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: { colAlias: 'key', column },
    value: { colAlias: 'key', value }
  };
}
// 未嵌套 完整数据结构 字符/数字 列 使用下标,不用默认
function getData10() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: { colAlias: 'key', column },
    value: null
  };
}
// 未嵌套 完整数据结构 字符/数字 列  使用下标,设置默认
function getData11() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: { colAlias: 'key', column },
    value: { colAlias: 'key', value: valueIndex }
  };
}
// 未嵌套 完整数据结构 字符/数字 列
export const unPackageFullDataSimpleList = [
  { value: 0, label: '不用下标,不用默认', fn: getData8 },
  { value: 1, label: '不用下标,设置默认', fn: getData9 },
  { value: 2, label: '使用下标,不用默认', fn: getData10 },
  { value: 3, label: '使用下标,设置默认', fn: getData11 }
];

// 未嵌套 完整数据结构 对象 列  不用下标,不用默认
function getData12() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: null
  };
}
// 未嵌套 完整数据结构 对象 列  不用下标,设置默认
function getData13() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: { colAlias: 'key', value: objValue }
  };
}

// 未嵌套 完整数据结构 对象 列  不用下标,不用默认
function getDisabledData12() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objDisabledColumn },
    value: null
  };
}
// 未嵌套 完整数据结构 对象 列  不用下标,设置默认
function getDIsabledData13() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objDisabledColumn },
    value: { colAlias: 'key', value: objDisabledValue }
  };
}

// 未嵌套 完整数据结构 对象 列 使用下标,不用默认
function getData14() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: null
  };
}
// 未嵌套 完整数据结构 对象 列  使用下标,设置默认
function getData15() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: { colAlias: 'key', value: valueIndex }
  };
}
// 未嵌套 完整数据结构 对象 列
export const unPackageFullDataObjList = [
  { value: 0, label: '不用下标,不用默认', fn: getData12 },
  { value: 1, label: '不用下标,设置默认', fn: getData13 },
  { value: 2, label: '不用下标,不用默认,disable', fn: getDisabledData12 },
  { value: 3, label: '不用下标,设置默认,disable', fn: getDIsabledData13 },
  { value: 4, label: '使用下标,不用默认', fn: getData14 },
  { value: 5, label: '使用下标,设置默认', fn: getData15 }
];

// 嵌套 完整数据结构 字符/数字 列  不用下标,不用默认
function getData16() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: [
      { colAlias: 'key1', column },
      { colAlias: 'key2', column }
    ],
    value: null
  };
}
// 嵌套 完整数据结构 字符/数字 列 不用下标,设置默认
function getData17() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: [
      { colAlias: 'key1', column },
      { colAlias: 'key2', column }
    ],
    value: [
      { colAlias: 'key1', value },
      { colAlias: 'key2', value }
    ]
  };
}
// 嵌套 完整数据结构 字符/数字 列 使用下标,不用默认
function getData18() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: [
      { colAlias: 'key1', column },
      { colAlias: 'key2', column }
    ],
    value: null
  };
}
// 嵌套 完整数据结构 字符/数字 列 使用下标,设置默认
function getData19() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: [
      { colAlias: 'key1', column },
      { colAlias: 'key2', column }
    ],
    value: [
      { colAlias: 'key1', value: valueIndex },
      { colAlias: 'key2', value: valueIndex }
    ]
  };
}
// 嵌套 完整数据结构 字符/数字 列
export const packageFullDataSimpleList = [
  { value: 0, label: '不用下标,不用默认', fn: getData16 },
  { value: 1, label: '不用下标,设置默认', fn: getData17 },
  { value: 2, label: '使用下标,不用默认', fn: getData18 },
  { value: 3, label: '使用下标,设置默认', fn: getData19 }
];

// 嵌套 完整数据结构 对象 列  不用下标,不用默认
function getData20() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'key1', column: objColumn },
      { colAlias: 'key2', column: objColumn }
    ],
    value: null
  };
}
// 嵌套 完整数据结构 对象 列 不用下标,设置默认
function getData21() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'key1', column: objColumn },
      { colAlias: 'key2', column: objColumn }
    ],
    value: [
      { colAlias: 'key1', value: objValue },
      { colAlias: 'key2', value: objValue }
    ]
  };
}
// 嵌套 完整数据结构 对象 列 使用下标,不用默认
function getData22() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: [
      { colAlias: 'key1', column: objColumn },
      { colAlias: 'key2', column: objColumn }
    ],
    value: null
  };
}
// 嵌套 完整数据结构 对象 列 使用下标,设置默认
function getData23() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: [
      { colAlias: 'key1', column: objColumn },
      { colAlias: 'key2', column: objColumn }
    ],
    value: [
      { colAlias: 'key1', value: valueIndex },
      { colAlias: 'key2', value: valueIndex }
    ]
  };
}
// 嵌套 完整数据结构 对象 列
export const packageFullDataObjList = [
  { value: 0, label: '不用下标,不用默认', fn: getData20 },
  { value: 1, label: '不用下标,设置默认', fn: getData21 },
  { value: 2, label: '使用下标,不用默认', fn: getData22 },
  { value: 3, label: '使用下标,设置默认', fn: getData23 }
];

// 嵌套 简单数据结构 字符/数字 列 不用下标,不用默认
function getData24() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: [column, column],
    value: null
  };
}
// 嵌套 简单数据结构 字符/数字 列 不用下标,设置默认
function getData25() {
  return {
    useRowIndex: false,
    rowAlias: null,
    label: '',
    options: [column, column],
    value: [value]
  };
}
// 嵌套 简单数据结构 字符/数字 列 使用下标,不用默认
function getData26() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: [column, column],
    value: null
  };
}
// 嵌套 简单数据结构 字符/数字 列 使用下标,设置默认
function getData27() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: '',
    options: [column, column],
    value: [valueIndex, valueIndex]
  };
}
// 嵌套 简单数据结构 字符/数字 列
export const packageSimpleDataSimpleList = [
  { value: 0, label: '不用下标,不用默认', fn: getData24 },
  { value: 1, label: '不用下标,设置默认', fn: getData25 },
  { value: 2, label: '使用下标,不用默认', fn: getData26 },
  { value: 3, label: '使用下标,设置默认', fn: getData27 }
];

// 嵌套 简单数据结构 对象 列 不用下标,不用默认
function getData28() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [objColumn, objColumn],
    value: null
  };
}
// 嵌套 简单数据结构 对象 列 不用下标,设置默认
function getData29() {
  return {
    useRowIndex: false,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [objColumn, objColumn],
    value: [objValue, objValue]
  };
}
// 嵌套 简单数据结构 对象 列 使用下标,不用默认
function getData30() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: [objColumn, objColumn],
    value: null
  };
}
// 嵌套 简单数据结构 对象 列 使用下标,设置默认
function getData31() {
  return {
    useRowIndex: true,
    rowAlias: null,
    label: objLabel,
    options: [objColumn, objColumn],
    value: [valueIndex, valueIndex]
  };
}
// 嵌套 简单数据结构 对象 列
export const packageSimpleDataObjList = [
  { value: 0, label: '不用下标,不用默认', fn: getData28 },
  { value: 1, label: '不用下标,设置默认', fn: getData29 },
  { value: 2, label: '使用下标,不用默认', fn: getData30 },
  { value: 3, label: '使用下标,设置默认', fn: getData31 }
];
