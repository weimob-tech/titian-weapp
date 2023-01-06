const { city, cityValue, coincidenceCity, coincidenceCityValue } = require('./cascade');

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

const objTree = { rowAlias: objRowAlias, label: objLabel, useRowIndex: false };
function getTree0() {
  return { ...objTree, options: city, value: cityValue };
}
const getTreeResult0 = () => ({
  value: ['330000', '330300', '330381'],
  options: [
    { code: '330000', name: '浙江省' },
    { code: '330300', name: '温州市' },
    { code: '330381', name: '瑞安市' }
  ]
});
function getTree1() {
  return { ...objTree, options: [city], value: [cityValue] };
}
const getTreeResult1 = () => ({
  value: [['330000', '330300', '330381']],
  options: [
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ]
  ]
});
function getTree2() {
  return {
    ...objTree,
    options: { colAlias: 'city', column: city },
    value: { colAlias: 'city', value: cityValue }
  };
}
const getTreeResult2 = () => ({
  value: {
    colAlias: 'city',
    value: ['330000', '330300', '330381']
  },
  options: {
    colAlias: 'city',
    options: [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ]
  }
});
function getTree3() {
  return {
    ...objTree,
    options: [{ colAlias: 'city', column: city }],
    value: [{ colAlias: 'city', value: cityValue }]
  };
}
const getTreeResult3 = () => ({
  value: [{ colAlias: 'city', value: ['330000', '330300', '330381'] }],
  options: [
    {
      colAlias: 'city',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    }
  ]
});
function getTree4() {
  return {
    ...objTree,
    options: [before, city],
    value: [beforeValue, cityValue]
  };
}
const getTreeResult4 = () => ({
  value: ['10086', ['330000', '330300', '330381']],
  options: [
    { code: '10086', name: '选项一' },
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ]
  ]
});
function getTree5() {
  return {
    ...objTree,
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
const getTreeResult5 = () => ({
  value: [
    { colAlias: 'before', value: '10086' },
    { colAlias: 'city', value: ['330000', '330300', '330381'] }
  ],
  options: [
    { colAlias: 'before', options: { code: '10086', name: '选项一' } },
    {
      colAlias: 'city',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    }
  ]
});
function getTree6() {
  return {
    ...objTree,
    options: [city, after],
    value: [cityValue, afterValue]
  };
}
const getTreeResult6 = () => ({
  value: [['330000', '330300', '330381'], '20087'],
  options: [
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ],
    { code: '20087', name: '选项二' }
  ]
});
function getTree7() {
  return {
    ...objTree,
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
const getTreeResult7 = () => ({
  value: [
    { colAlias: 'city', value: ['330000', '330300', '330381'] },
    { colAlias: 'after', value: '20087' }
  ],
  options: [
    {
      colAlias: 'city',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    },
    { colAlias: 'after', options: { code: '20087', name: '选项二' } }
  ]
});
function getTree8() {
  return {
    ...objTree,
    options: [before, city, after],
    value: [beforeValue, cityValue, afterValue]
  };
}
const getTreeResult8 = () => ({
  value: ['10086', ['330000', '330300', '330381'], '20087'],
  options: [
    { code: '10086', name: '选项一' },
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ],
    { code: '20087', name: '选项二' }
  ]
});
function getTree9() {
  return {
    ...objTree,
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
const getTreeResult9 = () => ({
  value: [
    { colAlias: 'before', value: '10086' },
    { colAlias: 'city', value: ['330000', '330300', '330381'] },
    { colAlias: 'after', value: '20087' }
  ],
  options: [
    {
      colAlias: 'before',
      options: { code: '10086', name: '选项一' }
    },
    {
      colAlias: 'city',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    },
    { colAlias: 'after', options: { code: '20087', name: '选项二' } }
  ]
});
function getTree10() {
  return {
    ...objTree,
    options: [city, city],
    value: [cityValue, cityValue]
  };
}
const getTreeResult10 = () => ({
  value: [
    ['330000', '330300', '330381'],
    ['330000', '330300', '330381']
  ],
  options: [
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ],
    [
      { code: '330000', name: '浙江省' },
      { code: '330300', name: '温州市' },
      { code: '330381', name: '瑞安市' }
    ]
  ]
});
function getTree11() {
  return {
    ...objTree,
    options: [
      { colAlias: 'before', column: city },
      { colAlias: 'after', column: city }
    ],
    value: [
      { colAlias: 'before', value: cityValue },
      { colAlias: 'after', value: cityValue }
    ]
  };
}

const getTreeResult11 = () => ({
  value: [
    { colAlias: 'before', value: ['330000', '330300', '330381'] },
    { colAlias: 'after', value: ['330000', '330300', '330381'] }
  ],
  options: [
    {
      colAlias: 'before',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    },
    {
      colAlias: 'after',
      options: [
        { code: '330000', name: '浙江省' },
        { code: '330300', name: '温州市' },
        { code: '330381', name: '瑞安市' }
      ]
    }
  ]
});

function getTree12() {
  return {
    ...objTree,
    options: coincidenceCity,
    value: coincidenceCityValue,
    cascade: 'cityList'
  };
}
const getTreeResult12 = () => ({
  value: ['310000', '310000'],
  options: [
    { code: '310000', name: '上海市1' },
    { code: '310000', name: '上海市2' }
  ]
});
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

/**
 * 未嵌套 简单数据结构
 */

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
const result0 = () => ({ value: '选项一', options: '选项一' });

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
const result1 = () => ({ value: '选项二', options: '选项二' });

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
const result2 = () => ({ value: 0, options: '选项一' });

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
const result3 = () => ({ value: 1, options: '选项二' });

/**
 * 未嵌套 简单数据结构 对象 列
 */

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

const result4 = () => ({
  value: '10086',
  options: { code: '10086', name: '选项一' }
});

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
const result5 = () => ({
  value: '10087',
  options: { code: '10087', name: '选项二' }
});

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
const result6 = () => ({
  value: '10086',
  options: { code: '10086', name: '选项一' }
});

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
const result7 = () => ({
  value: '10086',
  options: { code: '10086', name: '选项一' }
});

/**
 * 未嵌套 完整数据结构 字符/数字 列
 */

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
const result8 = () => ({
  value: { colAlias: 'key', value: '选项一' },
  options: { colAlias: 'key', options: '选项一' }
});

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
const result9 = () => ({
  value: { colAlias: 'key', value: '选项二' },
  options: { colAlias: 'key', options: '选项二' }
});

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
const result10 = () => ({
  value: { colAlias: 'key', value: 0 },
  options: { colAlias: 'key', options: '选项一' }
});

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
const result11 = () => ({
  value: { colAlias: 'key', value: 1 },
  options: { colAlias: 'key', options: '选项二' }
});

/**
 * 未嵌套 完整数据结构 对象 列
 */

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
const result12 = () => ({
  value: { colAlias: 'key', value: '10086' },
  options: { colAlias: 'key', options: { code: '10086', name: '选项一' } }
});

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
const result13 = () => ({
  value: { colAlias: 'key', value: '10087' },
  options: { colAlias: 'key', options: { code: '10087', name: '选项二' } }
});

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
const resultData12 = () => ({
  value: { colAlias: 'key', value: '10087' },
  options: { colAlias: 'key', options: { code: '10087', name: '选项二' } }
});

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

const resultData13 = () => ({
  value: { colAlias: 'key', value: '10087' },
  options: { colAlias: 'key', options: { code: '10087', name: '选项二' } }
});

// 未嵌套 完整数据结构 对象 列 使用下标,不用默认
function getData14() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: null
  };
}
const result14 = () => ({
  value: { colAlias: 'key', value: '10086' },
  options: { colAlias: 'key', options: { code: '10086', name: '选项一' } }
});

// 未嵌套 完整数据结构 对象 列  使用下标,设置默认
function getData15() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    label: objLabel,
    options: { colAlias: 'key', column: objColumn },
    value: { colAlias: 'key', value: valueIndex }
  };
}
const result15 = () => ({
  value: { colAlias: 'key', value: '10086' },
  options: { colAlias: 'key', options: { code: '10086', name: '选项一' } }
});

/**
 * 嵌套 完整数据结构 字符/数字 列
 */

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
const result16 = () => ({
  value: [
    { colAlias: 'key1', value: '选项一' },
    { colAlias: 'key2', value: '选项一' }
  ],
  options: [
    { colAlias: 'key1', options: '选项一' },
    { colAlias: 'key2', options: '选项一' }
  ]
});

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
const result17 = () => ({
  value: [
    { colAlias: 'key1', value: '选项二' },
    { colAlias: 'key2', value: '选项二' }
  ],
  options: [
    { colAlias: 'key1', options: '选项二' },
    { colAlias: 'key2', options: '选项二' }
  ]
});

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
const result18 = () => ({
  value: [
    { colAlias: 'key1', value: 0 },
    { colAlias: 'key2', value: 0 }
  ],
  options: [
    { colAlias: 'key1', options: '选项一' },
    { colAlias: 'key2', options: '选项一' }
  ]
});

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
const result19 = () => ({
  value: [
    { colAlias: 'key1', value: 1 },
    {
      colAlias: 'key2',
      value: 1
    }
  ],
  options: [
    { colAlias: 'key1', options: '选项二' },
    {
      colAlias: 'key2',
      options: '选项二'
    }
  ]
});

/**
 * 嵌套 完整数据结构 对象 列
 */

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
const result20 = () => ({
  value: [
    { colAlias: 'key1', value: '10086' },
    { colAlias: 'key2', value: '10086' }
  ],
  options: [
    {
      colAlias: 'key1',
      options: { code: '10086', name: '选项一' }
    },
    { colAlias: 'key2', options: { code: '10086', name: '选项一' } }
  ]
});

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
const result21 = () => ({
  value: [
    { colAlias: 'key1', value: '10087' },
    { colAlias: 'key2', value: '10087' }
  ],
  options: [
    {
      colAlias: 'key1',
      options: { code: '10087', name: '选项二' }
    },
    {
      colAlias: 'key2',
      options: { code: '10087', name: '选项二' }
    }
  ]
});

// 嵌套 完整数据结构 对象 列 使用下标,不用默认
function getData22() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [
      { colAlias: 'key1', column: objColumn },
      { colAlias: 'key2', column: objColumn }
    ],
    value: null
  };
}
const result22 = () => ({
  value: [
    { colAlias: 'key1', value: '10086' },
    { colAlias: 'key2', value: '10086' }
  ],
  options: [
    {
      colAlias: 'key1',
      options: { code: '10086', name: '选项一' }
    },
    {
      colAlias: 'key2',
      options: { code: '10086', name: '选项一' }
    }
  ]
});

// 嵌套 完整数据结构 对象 列 使用下标,设置默认
function getData23() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
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
const result23 = () => ({
  value: [
    { colAlias: 'key1', value: '10086' },
    { colAlias: 'key2', value: '10086' }
  ],
  options: [
    { colAlias: 'key1', options: { code: '10086', name: '选项一' } },
    {
      colAlias: 'key2',
      options: { code: '10086', name: '选项一' }
    }
  ]
});

/**
 * 嵌套 简单数据结构 字符/数字 列
 */

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
const result24 = () => ({
  value: ['选项一', '选项一'],
  options: ['选项一', '选项一']
});

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
const result25 = () => ({
  value: ['选项二', '选项一'],
  options: ['选项二', '选项一']
});

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
const result26 = () => ({ value: [0, 0], options: ['选项一', '选项一'] });

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
const result27 = () => ({ value: [1, 1], options: ['选项二', '选项二'] });

/**
 *  嵌套 简单数据结构 对象 列
 */

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
const result28 = () => ({
  value: ['10086', '10086'],
  options: [
    { code: '10086', name: '选项一' },
    { code: '10086', name: '选项一' }
  ]
});

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
const result29 = () => ({
  value: ['10087', '10087'],
  options: [
    { code: '10087', name: '选项二' },
    { code: '10087', name: '选项二' }
  ]
});

// 嵌套 简单数据结构 对象 列 使用下标,不用默认
function getData30() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [objColumn, objColumn],
    value: null
  };
}
const result30 = () => ({
  value: ['10086', '10086'],
  options: [
    { code: '10086', name: '选项一' },
    { code: '10086', name: '选项一' }
  ]
});

// 嵌套 简单数据结构 对象 列 使用下标,设置默认
function getData31() {
  return {
    useRowIndex: true,
    rowAlias: objRowAlias,
    label: objLabel,
    options: [objColumn, objColumn],
    value: [valueIndex, valueIndex]
  };
}
const result31 = () => ({
  value: ['10086', '10086'],
  options: [
    { code: '10086', name: '选项一' },
    { code: '10086', name: '选项一' }
  ]
});
function getMock() {
  return [
    {
      value: 'tree',
      label: '级联数据',
      list: [
        {
          value: 0,
          label: '非嵌套级联简单',
          fn: getTree0,
          result: getTreeResult0()
        },
        {
          value: 1,
          label: '嵌套级联简单',
          fn: getTree1,
          result: getTreeResult1()
        },
        {
          value: 2,
          label: '非嵌套级联完整',
          fn: getTree2,
          result: getTreeResult2()
        },
        {
          value: 3,
          label: '嵌套级联完整',
          fn: getTree3,
          result: getTreeResult3()
        },
        {
          value: 4,
          label: '嵌套(普-级)简单',
          fn: getTree4,
          result: getTreeResult4()
        },
        {
          value: 5,
          label: '嵌套(普-级)完整',
          fn: getTree5,
          result: getTreeResult5()
        },
        {
          value: 6,
          label: '嵌套(级-普)简单',
          fn: getTree6,
          result: getTreeResult6()
        },
        {
          value: 7,
          label: '嵌套(级-普)完整',
          fn: getTree7,
          result: getTreeResult7()
        },
        {
          value: 8,
          label: '嵌套(普-级-普)简单',
          fn: getTree8,
          result: getTreeResult8()
        },
        {
          value: 9,
          label: '嵌套(普-级-普)完整',
          fn: getTree9,
          result: getTreeResult9()
        },
        {
          value: 10,
          label: '嵌套(级-级)简单',
          fn: getTree10,
          result: getTreeResult10()
        },
        {
          value: 11,
          label: '嵌套(级-级)完整',
          fn: getTree11,
          result: getTreeResult11()
        },
        {
          value: 12,
          label: '非嵌套级联简单-rowAlias重叠',
          fn: getTree12,
          result: getTreeResult12()
        }
      ]
    },
    {
      value: 'unPackageSimpleDataSimpleList',
      label: '未嵌套 简单数据结构 字符/数字 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData0,
          result: result0()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData1,
          result: result1()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData2,
          result: result2()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData3,
          result: result3()
        }
      ]
    },
    {
      value: 'unPackageSimpleDataObjList',
      label: '未嵌套 简单数据结构 对象 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData4,
          result: result4()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData5,
          result: result5()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData6,
          result: result6()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData7,
          result: result7()
        }
      ]
    },
    {
      value: 'unPackageFullDataSimpleList',
      label: '未嵌套 完整数据结构 字符/数字 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData8,
          result: result8()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData9,
          result: result9()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData10,
          result: result10()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData11,
          result: result11()
        }
      ]
    },
    {
      value: 'unPackageFullDataObjList',
      label: '未嵌套 完整数据结构 对象 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData12,
          result: result12()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData13,
          result: result13()
        },
        {
          value: 2,
          label: '不用下标,不用默认,disable',
          fn: getDisabledData12,
          result: resultData12()
        },
        {
          value: 3,
          label: '不用下标,设置默认,disable',
          fn: getDIsabledData13,
          result: resultData13()
        },
        {
          value: 4,
          label: '使用下标,不用默认',
          fn: getData14,
          result: result14()
        },
        {
          value: 5,
          label: '使用下标,设置默认',
          fn: getData15,
          result: result15()
        }
      ]
    },
    {
      value: 'packageFullDataSimpleList',
      label: '嵌套 完整数据结构 字符/数字 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData16,
          result: result16()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData17,
          result: result17()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData18,
          result: result18()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData19,
          result: result19()
        }
      ]
    },
    {
      value: 'packageFullDataObjList',
      label: '嵌套 完整数据结构 对象 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData20,
          result: result20()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData21,
          result: result21()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData22,
          result: result22()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData23,
          result: result23()
        }
      ]
    },
    {
      value: 'packageSimpleDataSimpleList',
      label: '嵌套 简单数据结构 字符/数字 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData24,
          result: result24()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData25,
          result: result25()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData26,
          result: result26()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData27,
          result: result27()
        }
      ]
    },
    {
      value: 'packageSimpleDataObjList',
      label: '嵌套 简单数据结构 对象 列',
      list: [
        {
          value: 0,
          label: '不用下标,不用默认',
          fn: getData28,
          result: result28()
        },
        {
          value: 1,
          label: '不用下标,设置默认',
          fn: getData29,
          result: result29()
        },
        {
          value: 2,
          label: '使用下标,不用默认',
          fn: getData30,
          result: result30()
        },
        {
          value: 3,
          label: '使用下标,设置默认',
          fn: getData31,
          result: result31()
        }
      ]
    }
  ];
}
module.exports = getMock;
