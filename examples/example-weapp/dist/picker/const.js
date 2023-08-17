/* eslint-disable no-underscore-dangle */ // 简单数据类型
import { isDisabled, isPlainObject, randomString } from '../common/utils/index';
export var PickerStatusEnum;
(function(PickerStatusEnum) {
    PickerStatusEnum[/** 行下标 */ 'ROW_INDEX'] = 'row_index';
    PickerStatusEnum[/** 行全等 */ 'ROW_ALL'] = 'row_all';
    PickerStatusEnum[/** 行别名 */ 'ROW_ALIAS'] = 'row_alias';
})(PickerStatusEnum || (PickerStatusEnum = {}));
/** 是否是 完整数据类型 */ export function isIntact(params) {
    return isPlainObject(params) && typeof params.colAlias !== 'undefined' && Array.isArray(params.column);
}
/** 是否 简单数据类型 */ export function isAcronym(params) {
    return Array.isArray(params) && params.every((item)=>!Array.isArray(item) && !isIntact(item));
}
/** 是否 简单数据类型 - 数组 */ export function isAcronymColumn(params) {
    return Array.isArray(params) && params.every((item)=>isAcronym(item));
}
/** 是否  完整数据类型 - 数组 */ export function isIntactColumn(params) {
    return Array.isArray(params) && params.every((item)=>isIntact(item));
}
/** 是否是单独一列(省略掉外层数组) */ export function isIncomplete(params) {
    return isIntact(params) || isAcronym(params);
}
export function isTree(params, cascade) {
    return isPlainObject(params) && Array.isArray(params[cascade]);
}
export function isTreeColumn(params, cascade) {
    return Array.isArray(params) && params.some((item)=>isTree(item, cascade)) && params.every((item)=>isPlainObject(item));
}
export function getCascadeKey(key) {
    return `${randomString()}-${key}`;
}
export const treeBFS = (tree, key, cascade)=>{
    const map = new Map();
    let children = [
        ...tree
    ];
    while(children[0]){
        const [{ ...child }] = children;
        let keyValue = '';
        if (child.__key__) {
            keyValue = child.__key__;
        } else {
            keyValue = getCascadeKey(child[key]);
            child.__key__ = keyValue;
        }
        const curChildren = child[cascade];
        if (Array.isArray(curChildren) && curChildren.length > 0) {
            const newChildren = curChildren.map(({ ...item })=>({
                    ...item,
                    __key__: getCascadeKey(item[key])
                }));
            children = children.concat(newChildren);
            const mapChildren = newChildren.map((item)=>{
                const opt = {};
                Object.keys(item).forEach((k)=>{
                    if (k !== cascade) {
                        opt[k] = item[k];
                    }
                });
                return opt;
            });
            map.set(keyValue, {
                ...child,
                [cascade]: mapChildren
            });
        } else {
            map.set(keyValue, {
                ...child,
                [cascade]: []
            });
        }
        children.shift();
    }
    return map;
};
export function getAvailable(list, number) {
    if (number === -1) {
        number = list.findIndex((item)=>!isDisabled(item));
    }
    number = number === -1 ? 0 : number;
    return number;
}
export function getAvailableAlias(list, value, rowAlias) {
    const number = list.findIndex((row)=>!isDisabled(row) && row[rowAlias] === value);
    return getAvailable(list, number);
}
export function getAvailableIndex(list, value) {
    const number = list.findIndex((row, index)=>!isDisabled(row) && index === value);
    return getAvailable(list, number);
}
export function getAvailableAll(list, value) {
    const number = list.findIndex((row)=>!isDisabled(row) && row === value);
    return getAvailable(list, number);
}
