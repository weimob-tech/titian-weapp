import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalRenderDateProps } from './const';
import { DateStatusEnum } from './const';
export default class SingleCalendarCalc extends CalendarCalc {
    filterInvalidCalDate(calDateList: CalRenderDateProps[]): CalRenderDateProps[];
    calcCalDate(calDate: CalDateTimeType | CalDateTimeType[]): CalDateProps[];
    select({ actionCalDate }: {
        actionCalDate: CalRenderDateProps;
    }): Generator<never, {
        status: DateStatusEnum;
        parentIndex: number;
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
    }[], unknown>;
    calcUpdateData({ nextData, prevData }: {
        nextData: CalRenderDateProps[];
        prevData: CalRenderDateProps[];
    }): {
        [key: string]: CalRenderDateProps;
    } | null;
}
