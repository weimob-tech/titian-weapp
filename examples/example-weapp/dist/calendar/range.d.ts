import CalendarCalc from './calc';
import type { CalDateTimeType, CalMonthRenderProps, CalRenderDateProps } from './const';
import { DateStatusEnum } from './const';
export default class RangeCalendarCalc extends CalendarCalc {
    maxRange: number;
    allowSameDay?: boolean;
    constructor(params: ConstructorParameters<typeof CalendarCalc>[0], { allowSameDay, maxRange }: {
        allowSameDay: boolean;
        maxRange: number;
    });
    filterInvalidCalDate(calDateList: CalRenderDateProps[]): {
        status: DateStatusEnum;
        date: Date;
        time: number;
        year: number;
        month: number;
        day: number;
        week: number;
        fullDateNum: number;
        text: string | number;
        topInfo: string;
        bottomInfo: string;
    }[];
    calcCalDate(CalDate: CalDateTimeType | CalDateTimeType[]): {
        status: DateStatusEnum;
        date: Date;
        time: number;
        year: number;
        month: number;
        day: number;
        week: number;
        fullDateNum: number;
        text: string | number;
        topInfo: string;
        bottomInfo: string;
    }[];
    private prune;
    select({ calDateList, actionCalDate }: {
        calDateList: CalRenderDateProps[];
        actionCalDate: CalRenderDateProps;
    }): Generator<{
        readonly type: "maxRange";
        readonly message: "超出最大选择数量";
    }, CalRenderDateProps[], unknown>;
    changeStatus({ calDateList, actionCalDate }: {
        calDateList: CalRenderDateProps[];
        actionCalDate: CalRenderDateProps;
    }): CalRenderDateProps[];
    calcUpdateData({ prevData, nextData, monthList }: {
        prevData: CalRenderDateProps[];
        nextData: CalRenderDateProps[];
        monthList: CalMonthRenderProps[];
    }): {
        [key: string]: unknown;
    };
}
