function getCurYear(date) {
  if (date) {
    return new Date(date).getFullYear();
  }
  return new Date().getFullYear();
}
const currentYear = getCurYear();
const lastYear = getCurYear('2021-01-01');

const beforeTenDate = new Date(currentYear - 10, 0, 1).getTime();
const afterTenDate = new Date(currentYear + 10, 0, 1).getTime();

const afterTwentyDate = new Date(currentYear + 20, 0, 1).getTime();

const currentDate = new Date(currentYear, 0, 1).getTime();
const lastDate = new Date(lastYear, 0, 1).getTime();
function formatter(type, value) {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  if (type === 'day') {
    return `${value}天`;
  }
  if (type === 'hour') {
    return `${value}时`;
  }
  return `${value}分`;
}
function filter(type, options) {
  if (type === 'year') {
    return options.filter((opt) => opt.value % 2 === 0);
  }
  return options;
}
const data = [
  {
    label: '年月日-极简',
    props: {},
    expect: [{ number: 1, data: { type: 'date', value: beforeTenDate } }]
  },
  {
    label: '年月日-极简 -minDate ',
    props: { minDate: currentDate },
    expect: [{ number: 1, data: { type: 'date', value: currentDate } }]
  },
  {
    label: '年月日-极简 - maxDate ',
    props: { maxDate: currentDate },
    expect: [{ number: 1, data: { type: 'date', value: beforeTenDate } }]
  },
  {
    label: '年月日-极简 - 错序 ',
    props: { sort: ['month', 'day', 'year'] },
    expect: [
      {
        first: 'month',
        number: 1,
        data: { type: 'date', value: beforeTenDate }
      }
    ]
  },
  {
    label: '年月日-极简 - formatter',
    props: { formatter },
    expect: [{ number: 1, data: { type: 'date', value: beforeTenDate } }]
  },
  {
    label: '年月日-极简 - filter',
    props: { filter, value: lastDate, minDate: beforeTenDate },
    expect: [{ number: 1, data: { type: 'date', value: beforeTenDate } }]
  },
  {
    label: '年月日-综合1-边界内',
    props: {
      minDate: beforeTenDate,
      value: currentDate,
      maxDate: afterTenDate
    },
    expect: [{ number: 1, data: { type: 'date', value: currentDate } }]
  },
  {
    label: '年月日-综合2-边界外-超过最大',
    props: {
      minDate: currentDate,
      value: afterTwentyDate,
      maxDate: afterTenDate
    },
    expect: [{ number: 1, data: { type: 'date', value: afterTenDate } }]
  },
  {
    label: '年月日-综合2-边界外-小于最小',
    props: {
      minDate: currentDate,
      value: beforeTenDate,
      maxDate: afterTenDate
    },
    expect: [{ number: 1, data: { type: 'date', value: currentDate } }]
  },
  {
    label: '年月日时分-极简 ',
    props: { type: 'datetime' },
    expect: [{ number: 1, data: { type: 'datetime', value: beforeTenDate } }]
  },
  {
    label: '年月-极简 ',
    props: { type: 'year-month' },
    expect: [{ number: 1, data: { type: 'year-month', value: beforeTenDate } }]
  },
  {
    label: '时分-极简 ',
    props: { type: 'time' },
    expect: [{ number: 1, data: { type: 'time', value: '00:00' } }]
  },
  {
    label: '时分-极简-值',
    props: { type: 'time', value: '10:00' },
    expect: [{ number: 1, data: { type: 'time', value: '10:00' } }]
  }
];
module.exports.data = data;
