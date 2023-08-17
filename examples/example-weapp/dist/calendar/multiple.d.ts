import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalRenderDateProps } from './const';
export default class MultipleCalendarCalc extends CalendarCalc {
    maxSize: number;
    constructor(props: ConstructorParameters<typeof CalendarCalc>[0], maxSize: number);
    filterInvalidCalDate(calDateList: CalRenderDateProps[]): CalRenderDateProps[];
    calcCalDate(calDate: CalDateTimeType | CalDateTimeType[]): CalDateProps[];
    select({ calDateList, actionCalDate }: {
        calDateList: CalRenderDateProps[];
        actionCalDate: CalRenderDateProps;
    }): Generator<{
        readonly type: "maxSize";
        readonly message: "超出最大选择数量";
    }, CalRenderDateProps[], unknown>;
    calcUpdateData({ nextData, actionCalDate }: {
        nextData: CalRenderDateProps[];
        actionCalDate: CalRenderDateProps;
    }): {
        [key: string]: unknown;
    };
    private prune;
}
