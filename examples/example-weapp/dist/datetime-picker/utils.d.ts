export default function getCurYear(): number;
export declare enum DateTimePickerColumnEnum {
    YEAR = "year",
    MONTH = "month",
    DAY = "day",
    HOUR = "hour",
    MINUTE = "minute"
}
export declare const DateTimeTypeMapping: Readonly<{
    date: readonly DateTimePickerColumnEnum[];
    time: readonly DateTimePickerColumnEnum[];
    datetime: readonly DateTimePickerColumnEnum[];
    'year-month': readonly DateTimePickerColumnEnum[];
}>;
export declare enum DateTimePickerEnum {
    /** 年月日 */
    'DATE' = "date",
    /** 时分 */
    'TIME' = "time",
    /** 年月日 - 时分 */
    'DATETIME' = "datetime",
    /** 年月 */
    'YEARMONTH' = "year-month"
}
export declare const GenerallyDateTime: Map<"time" | "date" | "datetime" | "year-month", DateTimePickerColumnEnum[]>;
export declare function getOrderPickerValue(type: DateTimePickerEnum, value: {
    colAlias: DateTimePickerColumnEnum;
    value: string;
}[]): {
    colAlias: DateTimePickerColumnEnum;
    value: string;
}[];
export declare function getOrderValue(type: DateTimePickerEnum, value: {
    colAlias: DateTimePickerColumnEnum;
    value: string;
}[]): string | Date;
export declare class DateTimePickerHelper {
    type: DateTimePickerEnum;
    value: unknown;
    minDate: number;
    maxDate: number;
    minHour: number;
    maxHour: number;
    minMinute: number;
    maxMinute: number;
    standardValue: unknown;
    scopes: {
        type: DateTimePickerColumnEnum;
        scope: [number, number];
    }[];
    yearOption: unknown[];
    yearValue: unknown;
    monthOption: unknown[];
    monthValue: unknown;
    dayOption: unknown[];
    dayValue: unknown;
    hourOption: unknown[];
    hourValue: unknown;
    minuteOption: unknown[];
    minuteValue: unknown;
    sort: DateTimePickerColumnEnum[];
    formatter?: (...agrn: unknown[]) => unknown;
    filter?: (...agrn: unknown[]) => unknown;
    label: string;
    isChangeProps: boolean;
    constructor();
    changeProps({ type, label, value, minDate, maxDate, sort, formatter, filter }: {
        value: unknown;
        minDate: number;
        maxDate: number;
        label: string;
        type: DateTimePickerEnum;
        sort: DateTimePickerColumnEnum[];
        formatter?: (...agrn: unknown[]) => unknown;
        filter?: (...agrn: unknown[]) => unknown;
        [key: string]: unknown;
    }): {
        pickerSort: DateTimePickerColumnEnum[];
        yearOption: unknown[];
        yearValue: unknown;
        monthOption: unknown[];
        monthValue: unknown;
        dayOption: unknown[];
        dayValue: unknown;
        hourOption: unknown[];
        hourValue: unknown;
        minuteOption: unknown[];
        minuteValue: unknown;
    };
    changeSort(): void;
    /** 设置标准格式 */
    changeValue(value: unknown): void;
    /** 设置picker 需要格式 */
    setPickValue(): void;
    /** 设置picker 纵列 */
    setPickColumns(): void;
    /**
     *  获取最大最小值
     */
    getBoundary(type: 'min' | 'max'): {
        [x: string]: number;
    };
    setScope(): void;
}
