import Column from './column';
import { isAcronymColumn, isIncomplete, isIntactColumn, PickerStatusEnum } from './const';
let Picker = class Picker {
    check(options, value) {
        let opt = [];
        let val = value;
        // 是否是数组
        if (!Array.isArray(options)) {
            opt = [
                options
            ];
            val = [
                value
            ];
            this.isPackage = true;
        } else {
            opt = options;
            this.isPackage = false;
        }
        // 是一组数据
        if (isIncomplete(opt)) {
            opt = [
                opt
            ];
            val = [
                value
            ];
            this.isPackage = true;
        }
        if (!Array.isArray(val)) {
            val = [];
        }
        val = val.filter((item)=>!(typeof item === 'undefined' || item === null));
        this.columnMap.clear();
        this.isCustomColAlias = false;
        if (isAcronymColumn(opt)) {
            val.forEach((item, idx)=>{
                this.columnMap.set(idx, {
                    value: item,
                    options: []
                });
            });
            return opt.map((item, idx)=>({
                    colAlias: idx,
                    column: item
                }));
        }
        if (isIntactColumn(opt)) {
            this.isCustomColAlias = true;
            val.forEach((item)=>{
                this.columnMap.set(item.colAlias, {
                    value: item.value,
                    options: []
                });
            });
            return opt;
        }
        throw new Error('数据结构错误');
    }
    changeProps({ options , rowAlias , useRowIndex , value , cascade  }) {
        let list = [];
        let optionIndex = [];
        let state = PickerStatusEnum.ROW_INDEX;
        if (rowAlias) {
            state = PickerStatusEnum.ROW_ALIAS;
            this.rowAlias = rowAlias;
        } else if (!rowAlias && !useRowIndex) {
            state = PickerStatusEnum.ROW_ALL;
        }
        this.columnList = this.check(options, value).map(({ column , colAlias , ...other })=>new Column({
                options: column,
                colAlias,
                rowAlias,
                cascade,
                value: this.columnMap.get(colAlias)?.value,
                state,
                other
            }));
        this.columnList.forEach((column)=>{
            const { pickerColumnList , coordinate , colAlias  } = column;
            list = list.concat(pickerColumnList);
            optionIndex = optionIndex.concat(coordinate);
            const result = this.columnMap.get(colAlias);
            if (result) {
                result.options = column.options;
                result.value = column.value;
            } else {
                this.columnMap.set(colAlias, {
                    options: column.options,
                    value: column.value
                });
            }
        });
        return {
            colsIndex: optionIndex,
            list
        };
    }
    update(rowIndex, activityColumn) {
        let colsIndex = [];
        let list = [];
        this.columnList.forEach((column)=>{
            if (column.id === activityColumn.columnId) {
                column.update(rowIndex, activityColumn);
            }
            const result = this.columnMap.get(column.colAlias);
            if (result) {
                result.options = column.options;
                result.value = column.value;
            }
            colsIndex = colsIndex.concat(column.coordinate);
            list = list.concat(column.pickerColumnList);
        });
        if (activityColumn.isTree) {
            return {
                colsIndex,
                list
            };
        }
        return {
            colsIndex
        };
    }
    get data() {
        const value = [];
        const options = [];
        this.columnMap.forEach((item, key)=>{
            if (this.isCustomColAlias) {
                value.push({
                    colAlias: key,
                    value: item.value
                });
                options.push({
                    colAlias: key,
                    options: item.options
                });
            } else {
                value[key] = item.value;
                options[key] = item.options;
            }
        });
        if (this.isPackage && value.length === 1 && options.length === 1) {
            return {
                value: value[0],
                options: options[0]
            };
        }
        return {
            value,
            options
        };
    }
    constructor(){
        /** 是否自定义列别名  */ this.isCustomColAlias = false;
        /** 未拆解 包含级联数据 */ this.columnList = [];
        /** 结果 */ this.columnMap = new Map();
        this.rowAlias = null;
        /** 是否装箱 */ this.isPackage = false;
    }
};
export { Picker as default };
