export var DateStatusEnum;
(function(DateStatusEnum) {
    DateStatusEnum[/** 无状态 */ 'NOT_STATUS'] = '';
    DateStatusEnum[/** 禁用状态 */ 'DISABLED'] = 'disabled';
    DateStatusEnum[/** 单选选中状态 */ 'SINGLE'] = 'single';
    DateStatusEnum[/** 范围选择：起始状态 */ 'RANGE_START'] = 'range_start';
    DateStatusEnum[/** 范围选择：起始时间与结束时间为同一天 */ 'RANGE_FULL'] = 'range_full';
    DateStatusEnum[/** 范围选择：结束状态 */ 'RANGE_END'] = 'range_end';
    DateStatusEnum[/** 孤立多选（无连接）    */ 'MULTIPLE'] = 'multiple';
    DateStatusEnum[/** 多选（有连接） 起始状态    */ 'MULTIPLE_START'] = 'multiple_start';
    DateStatusEnum[/** 多选（有连接） 中间状态    */ 'MULTIPLE_MIDDLE'] = 'multiple_middle';
    DateStatusEnum[/** 多选（有连接） 结束状态    */ 'MULTIPLE_END'] = 'multiple_end';
})(DateStatusEnum || (DateStatusEnum = {}));
export var CalTypeEnum;
(function(CalTypeEnum) {
    CalTypeEnum[/** 单选 */ 'SINGLE'] = 'single';
    CalTypeEnum[/** 多选 */ 'MULTIPLE'] = 'multiple';
    CalTypeEnum[/** 范围选 */ 'RANGE'] = 'range';
})(CalTypeEnum || (CalTypeEnum = {}));
export const WEEK = [
    {
        name: 'Sunday',
        text: '日',
        value: 0
    },
    {
        name: 'Monday',
        text: '一',
        value: 1
    },
    {
        name: 'Tuesday',
        text: '二',
        value: 2
    },
    {
        name: 'Wednesday',
        text: '三',
        value: 3
    },
    {
        name: 'Thursday',
        text: '四',
        value: 4
    },
    {
        name: 'Friday',
        text: '五',
        value: 5
    },
    {
        name: 'Saturday',
        text: '六',
        value: 6
    }
];
