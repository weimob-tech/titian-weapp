import { Key } from '../common/interface/index';
import { PickerAcronymColumn, PickerColumn, PickerStatusEnum, PickerTreeColumn } from './const';
export default class Column<P extends string = 'children'> {
    private isTree;
    pickerColumnList: PickerColumn[];
    id: string;
    rowAlias: null | string | number;
    coordinate: number[];
    colAlias: Key;
    cascade: string;
    private state;
    /** 拉平一维树状数据 */
    private treeMap;
    other: {
        [key: string]: unknown;
    };
    constructor({ options, colAlias, rowAlias, value, state, cascade, other }: {
        options: PickerAcronymColumn[];
        colAlias: Key;
        rowAlias: null | string | number;
        value: unknown;
        state: PickerStatusEnum;
        cascade: string;
        other: {
            [key: string]: unknown;
        };
    });
    update(rowIndex: number, column: PickerColumn): void;
    private updateTree;
    get value(): unknown;
    get options(): PickerAcronymColumn | {
        [key: string]: unknown;
        T?: PickerTreeColumn<"children">[] | undefined;
        disabled?: boolean | undefined;
    }[];
    [Symbol.iterator](): this;
    /**
     * @description 迭代器
     * @param  value : 当前列选中值
     * @param  columnIterator : 当前列
     * @returns {object}
     */
    next(value: unknown, columnIterator: PickerColumn): {
        done: boolean | undefined;
        value: PickerColumn | undefined;
        coordinate: number;
    };
}
