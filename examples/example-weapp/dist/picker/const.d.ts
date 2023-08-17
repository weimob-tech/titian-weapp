import { Key } from '../common/interface/index';
export type IPickerResultAnyMap = Map<Key, {
    value: unknown;
    options: unknown;
}>;
/**
 * options
 * 1. acronym 简单数据类型-数组 PickerAcronymColumn[][]
 * 2. intact 完整数据类型-数组  PickerColumn[]
 *
 *  当仅有一列时候可支持
 * 1. acronym 简单数据类型  PickerAcronymColumn[]
 * 2. intact 完整数据   PickerColumn
 */
export declare enum PickerStatusEnum {
    /** 行下标 */
    'ROW_INDEX' = "row_index",
    /** 行全等 */
    'ROW_ALL' = "row_all",
    /** 行别名 */
    'ROW_ALIAS' = "row_alias"
}
export interface PickerColumn {
    colAlias: Key;
    column: PickerAcronymColumn[];
    id: string;
    isTree: boolean;
    children?: undefined;
    columnId: string;
    [key: string]: unknown;
}
export interface PickerAcronymTypeColumn {
    disabled?: boolean;
}
export type PickerAcronymColumn = string | (PickerAcronymTypeColumn & {
    [key: string]: unknown;
});
export type PickerProps = {
    options: PickerAcronymColumn[] | PickerAcronymColumn[][] | PickerColumn | PickerColumn[];
    rowAlias: null | number | string;
    useRowIndex: boolean;
    value: unknown;
    cascade: string;
};
export interface PickerTreeColumn<T extends string = 'children'> extends PickerAcronymTypeColumn {
    T?: PickerTreeColumn<T>[];
    [key: string]: unknown;
}
/** 是否是 完整数据类型 */
export declare function isIntact(params: unknown): params is PickerColumn;
/** 是否 简单数据类型 */
export declare function isAcronym(params: unknown): params is PickerAcronymColumn;
/** 是否 简单数据类型 - 数组 */
export declare function isAcronymColumn(params: unknown): params is PickerAcronymColumn[][];
/** 是否  完整数据类型 - 数组 */
export declare function isIntactColumn(params: unknown): params is PickerColumn[];
/** 是否是单独一列(省略掉外层数组) */
export declare function isIncomplete(params: unknown): params is PickerColumn | PickerAcronymColumn[];
export declare function isTree<T extends string = 'children'>(params: unknown, cascade: T): params is PickerTreeColumn<T>;
export declare function isTreeColumn<T extends string = 'children'>(params: unknown, cascade: T): params is PickerTreeColumn<T>[];
export declare function getCascadeKey(key: unknown): string;
export declare const treeBFS: <T extends PickerTreeColumn<P>, P extends string = "children">(tree: T[], key: string | number, cascade: P) => Map<Key, PickerTreeColumn<P>>;
export declare function getAvailable(list: unknown[], number: number): number;
export declare function getAvailableAlias(list: unknown[], value: unknown, rowAlias: string | number): number;
export declare function getAvailableIndex(list: unknown[], value: unknown): number;
export declare function getAvailableAll(list: unknown[], value: unknown): number;
