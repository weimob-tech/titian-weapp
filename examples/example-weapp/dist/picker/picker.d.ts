import { IPickerResultAnyMap, PickerColumn, PickerProps } from './const';
export default class Picker<P extends string = 'children'> {
    /** 是否自定义列别名  */
    isCustomColAlias: boolean;
    value: unknown;
    /** 未拆解 包含级联数据 */
    private columnList;
    /** 结果 */
    columnMap: IPickerResultAnyMap;
    rowAlias: null | string | number;
    /** 是否装箱 */
    private isPackage;
    private check;
    changeProps({ options, rowAlias, useRowIndex, value, cascade }: PickerProps): {
        colsIndex: number[];
        list: PickerColumn[];
    };
    update(rowIndex: number, activityColumn: PickerColumn): {
        colsIndex: number[];
        list: PickerColumn[];
    } | {
        colsIndex: number[];
        list?: undefined;
    };
    get data(): {
        value: unknown;
        options: unknown;
    };
}
