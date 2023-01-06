const { getCalDate, DAYTIME } = require('../../utils');

const mockToday = '2022-02-27';
module.exports.mockToday = mockToday;
function getBasic({ minBorder = mockToday, selectData }) {
  const list = selectData
    .map((item) => {
      const date = new Date(item);
      return getCalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    })
    .map((calDate) => {
      const min = getCalDate(minBorder ? new Date(minBorder) : new Date(), 0, 0, 0);
      let parentIndex = 0;
      if (min.year < calDate.year) {
        parentIndex = (calDate.year - min.year - 1) * 12 + (12 - min.month) + calDate.month;
      }
      if (min.year === calDate.year && min.month < calDate.month) {
        parentIndex = calDate.month - min.month;
      }
      const { date, time, ...other } = calDate;
      return { ...other, parentIndex };
    });

  return list;
}
const singleMinDate = '2021-03-30';

const singleDefaultDate = '2022-04-06';

const basicDate = getBasic({
  selectData: ['2022-03-30', '2022-03-31', '2022-04-01']
});

const defalutConfigDate = getBasic({
  selectData: [singleDefaultDate, '2022-03-30', '2022-04-01']
});

const singleBasicMin = getBasic({
  minDate: singleMinDate,
  selectData: ['2022-03-30', '2022-03-31', '2022-04-01']
});

const maxRange = 3;
const maxRangeData = getBasic({ selectData: ['2022-03-30', '2022-04-02'] });

const maxRangeDataDate = getBasic({
  selectData: [new Date(new Date('2022-03-30').getTime() + DAYTIME * 3)]
})[0];

const longData = getBasic({
  selectData: ['2022-03-30', '2022-06-02', '2022-09-01']
});

const data = [
  {
    label: '日期单选',
    list: [
      {
        label: '常规',
        props: { visible: true },
        expect: [
          { date: null, currentDate: [] },
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          })),
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          }))
        ],
        action: [basicDate.map((item) => item.fullDateNum)]
      },
      {
        label: 'min',
        props: { visible: true, minDate: singleMinDate },
        expect: [
          { date: null, currentDate: [] },
          singleBasicMin.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          })),
          singleBasicMin.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          }))
        ],
        action: [singleBasicMin.map((item) => item.fullDateNum)]
      },
      {
        label: 'max',
        props: { visible: true, maxDate: '2022-05-30' },
        expect: [
          { date: null, currentDate: [] },
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          })),
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          }))
        ],
        action: [basicDate.map((item) => item.fullDateNum)]
      },
      {
        label: 'default',
        props: { visible: true, defaultValue: singleDefaultDate },
        expect: [
          {
            date: null,
            currentDate: [{ ...defalutConfigDate[0], status: 'single' }]
          },
          defalutConfigDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          })),
          defalutConfigDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          }))
        ],
        action: [defalutConfigDate.map((item) => item.fullDateNum)]
      },
      {
        label: 'format',
        props: {
          visible: true,
          formatter: (v) => v
        },
        expect: [
          { date: null, currentDate: [] },
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          })),
          basicDate.map(({ date, ...other }) => ({
            date: { y: other.year, m: other.month, d: other.day },
            dayStr: other.fullDateNum,
            disabled: false,
            select: [{ date: other, currentDate: [{ ...other, status: 'single' }] }]
          }))
        ],
        action: [basicDate.map((item) => item.fullDateNum)]
      }
    ]
  },
  {
    label: '日期多选',
    list: [
      {
        label: '常规-顺序操作',
        props: { mode: 'multiple', visible: true, formatter: (v) => v },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [
                    { ...basicDate[0], status: 'multiple_start' },
                    { ...basicDate[1], status: 'multiple_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [
                    { ...basicDate[0], status: 'multiple_start' },
                    { ...basicDate[1], status: 'multiple_middle' },
                    { ...basicDate[2], status: 'multiple_end' }
                  ]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[0], status: 'multiple_start' },
                  currentDate: [
                    { ...basicDate[1], status: 'multiple_start' },
                    { ...basicDate[2], status: 'multiple_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[1], status: 'multiple_start' },
                  currentDate: [{ ...basicDate[2], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[2], status: 'multiple' },
                  currentDate: []
                }
              ]
            }
          ]
        ],
        action: [basicDate.map((item) => item.fullDateNum)]
      },
      {
        label: '常规-最多个数',
        props: { mode: 'multiple', visible: true, maxSize: 2 },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [
                    { ...basicDate[0], status: 'multiple_start' },
                    { ...basicDate[1], status: 'multiple_end' }
                  ]
                }
              ]
            }
          ],

          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[0], status: 'multiple_start' },
                  currentDate: [{ ...basicDate[1], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[1], status: 'multiple' },
                  currentDate: []
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [{ ...basicDate[2], status: 'multiple' }]
                }
              ]
            }
          ]
        ],
        validation(comp, component) {
          const { currentDate } = comp.instance.calendar;
          const full = component.dom.dataset.date;
          const include = currentDate.some((item) => `${item.fullDateNum}` === full);
          // comp.instance.calendar
          return currentDate.length < 2 || include;
        },
        action: [basicDate.map((item) => item.fullDateNum)]
      },
      {
        label: '常规-错序操作',
        props: { mode: 'multiple', visible: true },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [
                    { ...basicDate[0], status: 'multiple' },
                    { ...basicDate[2], status: 'multiple' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [
                    { ...basicDate[0], status: 'multiple_start' },
                    { ...basicDate[1], status: 'multiple_middle' },
                    { ...basicDate[2], status: 'multiple_end' }
                  ]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[0], status: 'multiple_start' },
                  currentDate: [
                    { ...basicDate[1], status: 'multiple_start' },
                    { ...basicDate[2], status: 'multiple_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[2], status: 'multiple_end' },
                  currentDate: [{ ...basicDate[1], status: 'multiple' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...basicDate[1], status: 'multiple' },
                  currentDate: []
                }
              ]
            }
          ]
        ],
        action: [[basicDate[0].fullDateNum, basicDate[2].fullDateNum, basicDate[1].fullDateNum]]
      }
    ]
  },
  {
    label: '范围选择',
    list: [
      {
        label: '常规-顺序操作',
        next: true,
        props: {
          mode: 'range',
          visible: true
        },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [
                    { ...basicDate[0], status: 'range_start' },
                    { ...basicDate[1], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [{ ...basicDate[2], status: 'range_start' }]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [
                    { ...basicDate[0], status: 'range_start' },
                    { ...basicDate[1], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [{ ...basicDate[2], status: 'range_start' }]
                }
              ]
            }
          ]
        ],
        action: [basicDate.map((item) => item.fullDateNum)]
      },
      {
        label: '常规-超长',
        props: {
          mode: 'range',
          visible: true,
          maxDate: '2022-11-11'
        },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: longData[0].year,
                m: longData[0].month,
                d: longData[0].day
              },
              dayStr: longData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[0],
                  currentDate: [{ ...longData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: longData[1].year,
                m: longData[1].month,
                d: longData[1].day
              },
              dayStr: longData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[1],
                  currentDate: [
                    { ...longData[0], status: 'range_start' },
                    { ...longData[1], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: longData[2].year,
                m: longData[2].month,
                d: longData[2].day
              },
              dayStr: longData[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[2],
                  currentDate: [{ ...longData[2], status: 'range_start' }]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: longData[0].year,
                m: longData[0].month,
                d: longData[0].day
              },
              dayStr: longData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[0],
                  currentDate: [{ ...longData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: longData[1].year,
                m: longData[1].month,
                d: longData[1].day
              },
              dayStr: longData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[1],
                  currentDate: [
                    { ...longData[0], status: 'range_start' },
                    { ...longData[1], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: longData[2].year,
                m: longData[2].month,
                d: longData[2].day
              },
              dayStr: longData[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: longData[2],
                  currentDate: [{ ...longData[2], status: 'range_start' }]
                }
              ]
            }
          ]
        ],
        action: [longData.map((item) => item.fullDateNum)]
      },
      {
        label: '常规-错序操作',
        next: true,
        props: {
          mode: 'range',
          visible: true
        },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [{ ...basicDate[2], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [{ ...basicDate[1], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'range_start' }]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: basicDate[2].year,
                m: basicDate[2].month,
                d: basicDate[2].day
              },
              dayStr: basicDate[2].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[2],
                  currentDate: [
                    { ...basicDate[0], status: 'range_start' },
                    { ...basicDate[2], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: basicDate[1].year,
                m: basicDate[1].month,
                d: basicDate[1].day
              },
              dayStr: basicDate[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[1],
                  currentDate: [{ ...basicDate[1], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: basicDate[0].year,
                m: basicDate[0].month,
                d: basicDate[0].day
              },
              dayStr: basicDate[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: basicDate[0],
                  currentDate: [{ ...basicDate[0], status: 'range_start' }]
                }
              ]
            }
          ]
        ],
        action: [[basicDate[2].fullDateNum, basicDate[1].fullDateNum, basicDate[0].fullDateNum]]
      },
      {
        label: `最大范围${maxRange}天`,
        props: {
          mode: 'range',
          visible: true,
          maxRange
        },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: maxRangeData[0],
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[1].year,
                m: maxRangeData[1].month,
                d: maxRangeData[1].day
              },
              dayStr: maxRangeData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: maxRangeDataDate,
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeDataDate, status: 'range_end' }
                  ]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_start' },
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[1].year,
                m: maxRangeData[1].month,
                d: maxRangeData[1].day
              },
              dayStr: maxRangeData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: maxRangeDataDate,
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeDataDate, status: 'range_end' }
                  ]
                }
              ]
            }
          ]
        ],
        action: [maxRangeData.map((item) => item.fullDateNum)]
      },
      {
        label: `最大范围${maxRange}天,允许起止同天`,
        props: {
          mode: 'range',
          visible: true,
          allowSameDay: true,
          maxRange
        },
        expect: [
          {
            date: null,
            currentDate: []
          },
          [
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,

              select: [
                {
                  date: maxRangeData[0],
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_start' },
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeData[0], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_full' },
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[1].year,
                m: maxRangeData[1].month,
                d: maxRangeData[1].day
              },
              dayStr: maxRangeData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: maxRangeDataDate,
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeDataDate, status: 'range_end' }
                  ]
                }
              ]
            }
          ],
          [
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_start' },
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_start' },
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeData[0], status: 'range_end' }
                  ]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[0].year,
                m: maxRangeData[0].month,
                d: maxRangeData[0].day
              },
              dayStr: maxRangeData[0].fullDateNum,
              disabled: false,
              select: [
                {
                  date: { ...maxRangeData[0], status: 'range_full' },
                  currentDate: [{ ...maxRangeData[0], status: 'range_start' }]
                }
              ]
            },
            {
              date: {
                y: maxRangeData[1].year,
                m: maxRangeData[1].month,
                d: maxRangeData[1].day
              },
              dayStr: maxRangeData[1].fullDateNum,
              disabled: false,
              select: [
                {
                  date: maxRangeDataDate,
                  currentDate: [
                    { ...maxRangeData[0], status: 'range_start' },
                    { ...maxRangeDataDate, status: 'range_end' }
                  ]
                }
              ]
            }
          ]
        ],
        action: [
          [
            maxRangeData[0].fullDateNum,
            maxRangeData[0].fullDateNum,
            maxRangeData[0].fullDateNum,
            maxRangeData[1].fullDateNum
          ]
        ]
      }
    ]
  }
];
module.exports.data = data;
module.exports.getBasic = getBasic;
