import { isDisabled, isValidDate, padZero, range } from '../common/utils/index';
export default function getCurYear() {
    return new Date().getFullYear();
}
export var DateTimePickerColumnEnum;
(function(DateTimePickerColumnEnum) {
    DateTimePickerColumnEnum["YEAR"] = 'year';
    DateTimePickerColumnEnum["MONTH"] = 'month';
    DateTimePickerColumnEnum["DAY"] = 'day';
    DateTimePickerColumnEnum["HOUR"] = 'hour';
    DateTimePickerColumnEnum["MINUTE"] = 'minute';
})(DateTimePickerColumnEnum || (DateTimePickerColumnEnum = {}));
export const DateTimeTypeMapping = Object.freeze({
    date: Object.freeze([
        'year',
        'month',
        'day'
    ]),
    time: Object.freeze([
        'hour',
        'minute'
    ]),
    datetime: Object.freeze([
        'year',
        'month',
        'day',
        'hour',
        'minute'
    ]),
    'year-month': Object.freeze([
        'year',
        'month'
    ])
});
export var DateTimePickerEnum;
(function(DateTimePickerEnum) {
    DateTimePickerEnum[/** 年月日 */ 'DATE'] = 'date';
    DateTimePickerEnum[/** 时分 */ 'TIME'] = 'time';
    DateTimePickerEnum[/** 年月日 - 时分 */ 'DATETIME'] = 'datetime';
    DateTimePickerEnum[/** 年月 */ 'YEARMONTH'] = 'year-month';
})(DateTimePickerEnum || (DateTimePickerEnum = {}));
export const GenerallyDateTime = new Map([
    [
        'date',
        [
            'year',
            'month',
            'day'
        ]
    ],
    [
        'time',
        [
            'hour',
            'minute'
        ]
    ],
    [
        'datetime',
        [
            'year',
            'month',
            'day',
            'hour',
            'minute'
        ]
    ],
    [
        'year-month',
        [
            'year',
            'month'
        ]
    ]
]);
export function getOrderPickerValue(type, value) {
    return (GenerallyDateTime.get(type) || []).map((item)=>value.find((val)=>val.colAlias === item)).filter(Boolean);
}
export function getOrderValue(type, value) {
    const orderValue = getOrderPickerValue(type, value);
    if (type !== 'time') {
        const orderMonthValue = orderValue.map((item)=>{
            if (item.colAlias === 'month') {
                return Number.parseInt(item.value, 10) - 1;
            }
            return Number.parseInt(item.value, 10);
        });
        return new Date(...orderMonthValue);
    }
    return orderValue.map((item)=>item.value).join(':');
}
export class DateTimePickerHelper {
    changeProps({ type ='date' , label , value , minDate , maxDate , sort , formatter , filter  }) {
        this.isChangeProps = true;
        this.type = type || 'date';
        this.label = label;
        this.value = value;
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.sort = sort;
        this.formatter = formatter;
        this.filter = filter;
        this.changeSort();
        this.changeValue(value);
        this.setPickValue();
        this.setScope();
        this.setPickColumns();
        return {
            pickerSort: this.sort,
            yearOption: this.yearOption,
            yearValue: this.yearValue,
            monthOption: this.monthOption,
            monthValue: this.monthValue,
            dayOption: this.dayOption,
            dayValue: this.dayValue,
            hourOption: this.hourOption,
            hourValue: this.hourValue,
            minuteOption: this.minuteOption,
            minuteValue: this.minuteValue
        };
    }
    changeSort() {
        let sortOption = [];
        switch(this.type){
            case 'date':
                sortOption = [
                    'year',
                    'month',
                    'day'
                ];
                break;
            case 'time':
                sortOption = [
                    'hour',
                    'minute'
                ];
                break;
            case 'datetime':
                sortOption = [
                    'year',
                    'month',
                    'day',
                    'hour',
                    'minute'
                ];
                break;
            case 'year-month':
                sortOption = [
                    'year',
                    'month'
                ];
                break;
            default:
                throw new Error('type error');
        }
        if ([
            ...this.sort
        ].sort((a, b)=>a.localeCompare(b)).join('') !== [
            ...sortOption
        ].sort((a, b)=>a.localeCompare(b)).join('')) {
            this.sort = sortOption;
        }
    }
    /** 设置标准格式 */ changeValue(value) {
        const { type , minHour , maxHour , minDate , maxDate , minMinute , maxMinute  } = this;
        let val = value;
        if (type === 'time') {
            if (!val) {
                val = `${padZero(minHour)}:00`;
            }
        } else if (!isValidDate(val)) {
            val = minDate;
        }
        if (type === 'time') {
            const [hour, minute] = val.split(':').map((item)=>Number(item));
            const hourStr = padZero(range(hour, minHour, maxHour));
            const minuteSTr = padZero(range(minute, minMinute, maxMinute));
            this.standardValue = `${hourStr}:${minuteSTr}`;
            return;
        }
        this.standardValue = range(val, minDate, maxDate);
    }
    /** 设置picker 需要格式 */ setPickValue() {
        const { type , standardValue  } = this;
        if (type === 'time') {
            const [hour, minute] = standardValue.split(':');
            this.hourValue = Number(hour);
            this.minuteValue = Number(minute);
            return;
        }
        const date = new Date(standardValue);
        this.yearValue = date.getFullYear();
        this.monthValue = date.getMonth() + 1;
        if (this.type === 'date') {
            this.dayValue = date.getDate();
        }
        if (this.type === 'datetime') {
            this.dayValue = date.getDate();
            this.hourValue = date.getHours();
            this.minuteValue = date.getMinutes();
        }
    }
    /** 设置picker 纵列 */ setPickColumns() {
        this.scopes.forEach(({ type , scope  })=>{
            let values = new Array(scope[1] - scope[0] + 1).fill(0).map((item, index)=>{
                const val = scope[0] + index;
                if (typeof this.formatter === 'function') {
                    const formatVal = this.formatter(type, val, {
                        day: this.dayValue,
                        hour: this.hourValue,
                        minute: this.minuteValue,
                        year: this.yearValue,
                        month: this.monthValue
                    });
                    return {
                        [this.label]: formatVal,
                        value: val
                    };
                }
                return {
                    [this.label]: type === 'year' ? `${val}` : padZero(val),
                    value: val
                };
            });
            if (typeof this.filter === 'function') {
                values = this.filter(type, values, {
                    day: this.dayValue,
                    hour: this.hourValue,
                    minute: this.minuteValue,
                    year: this.yearValue,
                    month: this.monthValue
                });
            }
            const number = values.findIndex((item)=>item.value === this[`${type}Value`] && !isDisabled(item));
            if (number === -1) {
                // eslint-disable-next-line no-console
                console.warn('结果被过滤出列表', this[`${type}Value`]);
            }
            this[`${type}Option`] = values;
        });
    }
    /**
   *  获取最大最小值
   */ getBoundary(type) {
        const value = new Date(this.standardValue);
        const boundary = new Date(this[`${type}Date`]);
        const year = boundary.getFullYear();
        let month = 1;
        let date = 1;
        let hour = 0;
        let minute = 0;
        if (type === 'max') {
            month = 12;
            date = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
            hour = 23;
            minute = 59;
        }
        if (value.getFullYear() === year) {
            month = boundary.getMonth() + 1;
            if (value.getMonth() + 1 === month) {
                date = boundary.getDate();
                if (value.getDate() === date) {
                    hour = boundary.getHours();
                    if (value.getHours() === hour) {
                        minute = boundary.getMinutes();
                    }
                }
            }
        }
        return {
            [`${type}Year`]: year,
            [`${type}Month`]: month,
            [`${type}Date`]: date,
            [`${type}Hour`]: hour,
            [`${type}Minute`]: minute
        };
    }
    setScope() {
        if (this.type === 'time') {
            this.scopes = [
                {
                    type: 'hour',
                    scope: [
                        this.minHour,
                        this.maxHour
                    ]
                },
                {
                    type: 'minute',
                    scope: [
                        this.minMinute,
                        this.maxMinute
                    ]
                }
            ];
            return;
        }
        const { maxYear , maxDate , maxMonth , maxHour , maxMinute  } = this.getBoundary('max');
        const { minYear , minDate , minMonth , minHour , minMinute  } = this.getBoundary('min');
        const result = [
            {
                type: 'year',
                scope: [
                    minYear,
                    maxYear
                ]
            },
            {
                type: 'month',
                scope: [
                    minMonth,
                    maxMonth
                ]
            },
            {
                type: 'day',
                scope: [
                    minDate,
                    maxDate
                ]
            },
            {
                type: 'hour',
                scope: [
                    minHour,
                    maxHour
                ]
            },
            {
                type: 'minute',
                scope: [
                    minMinute,
                    maxMinute
                ]
            }
        ];
        if (this.type === 'date') result.splice(3, 2);
        if (this.type === 'year-month') result.splice(2, 3);
        this.scopes = result;
    }
    constructor(){
        this.type = 'date';
        this.minDate = 0;
        this.maxDate = 0;
        this.minHour = 0;
        this.maxHour = 23;
        this.minMinute = 0;
        this.maxMinute = 59;
        this.scopes = [];
        this.yearValue = '';
        this.monthValue = '';
        this.dayValue = '';
        this.hourValue = '';
        this.minuteValue = '';
        this.sort = [];
        this.label = 'label';
        this.isChangeProps = false;
        this.yearOption = [];
        this.monthOption = [];
        this.dayOption = [];
        this.hourOption = [];
        this.minuteOption = [];
    }
}
