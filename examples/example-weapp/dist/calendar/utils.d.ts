import type { CalDateProps, CalMonthProps, CalRenderDateProps, CalWeekProps } from './const';
import { CalTypeEnum } from './const';
export declare const DAYTIME: number;
export declare function getCalDate(date: Date): CalDateProps;
export declare const getWeek: (startWeek?: string, week?: CalWeekProps[]) => CalWeekProps[];
export declare function diff(before: CalDateProps, after: CalDateProps): number;
export declare function calcMonthData({ min, max }: {
    min: CalDateProps;
    max: CalDateProps;
}, currentDate: CalDateProps[]): [CalMonthProps[], CalRenderDateProps[]];
/**
 * 是否需要覆盖
 * @param month  月份
 * @param select 选中值
 * @param mode 类型
 * @returns booolean
 */
export declare function judgeCover(month: CalRenderDateProps, select: CalRenderDateProps[], mode: CalTypeEnum): boolean;
/**
 * 是否需要计算
 * @param month  月份
 * @param select 选中值
 * @param mode 类型
 * @returns booolean
 */
export declare function judgeCompare(month: CalRenderDateProps, select: CalRenderDateProps[], mode: CalTypeEnum): boolean;
export declare function getDayByMonth({ month, select, border, formatter, parentIndex }: {
    month: string | number | Date;
    select: CalDateProps[];
    border: {
        max?: CalDateProps;
        min?: CalDateProps;
    };
    formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
    parentIndex: number;
}): CalRenderDateProps[];
export declare const mergeContinuousDate: <T extends CalDateProps>(list: T[]) => T[];
