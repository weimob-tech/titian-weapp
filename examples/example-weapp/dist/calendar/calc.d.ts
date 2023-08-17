import { CalDateProps, CalDateTimeType, CalErrorProps, CalMonthRenderProps, CalRenderDateProps } from './const';
export default abstract class CalendarCalc {
    minDate: CalDateProps;
    maxDate: CalDateProps;
    formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
    /** 转换成 日历 普通类型(date/string/number) 转换 日历日期类型 */
    abstract calcCalDate(calDateList: CalDateTimeType | CalDateTimeType[]): CalDateProps[];
    /** 日期选中操作 */
    abstract select(params: {
        calDateList: CalRenderDateProps[];
        actionCalDate: CalRenderDateProps;
    }): IterableIterator<CalErrorProps | CalRenderDateProps[]>;
    /** 计算更新数据 */
    abstract calcUpdateData(params: {
        prevData: CalRenderDateProps[];
        nextData: CalRenderDateProps[];
        monthList: CalMonthRenderProps[];
        actionCalDate: CalRenderDateProps;
    }): {
        [key: string]: unknown;
    } | null;
    constructor({ minDate, maxDate, formatter }: {
        minDate: CalDateTimeType;
        maxDate: CalDateTimeType;
        formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
    });
    /** 过滤 日历日期格式 是否合法 */
    abstract filterInvalidCalDate(calDateList: CalRenderDateProps[]): CalDateProps[];
    filterInvalidDate(value: CalDateTimeType | CalDateTimeType[]): CalDateProps[];
    filterBorder<T extends CalDateProps>(value: T[]): T[];
}
