import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalMonthRenderProps, CalRenderDateProps, CalWeekProps } from './const';
import { CalTypeEnum } from './const';
interface CalendarProps {
    mode: CalTypeEnum;
    minDate: CalDateTimeType;
    maxDate: CalDateTimeType;
    allowSameDay: boolean;
    start: string;
    maxRange: number;
    maxSize: number;
    value: CalDateTimeType[];
    defaultValue: CalDateTimeType[];
    formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
}
export default class Calendar {
    private mode;
    monthList: CalMonthRenderProps[];
    currentDate: CalRenderDateProps[];
    currentCalDate: CalDateProps[] | null;
    week: CalWeekProps[];
    id: string;
    start: string;
    strategy: CalendarCalc;
    controlled: boolean;
    init: boolean;
    private getStrategy;
    private getCalMonthList;
    findMonthLocation(): string;
    isControlled(value: CalDateTimeType[]): void;
    changeProps({ mode, minDate, maxDate, allowSameDay, start, value, defaultValue, maxRange, maxSize, formatter }: CalendarProps): void;
    calcUpdateData(calDate: CalRenderDateProps): Generator<import("./const").CalErrorProps | CalRenderDateProps[], {
        [key: string]: unknown;
    } | null, unknown>;
    get data(): CalRenderDateProps[];
}
export {};
