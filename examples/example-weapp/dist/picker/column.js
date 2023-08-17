/* eslint-disable no-underscore-dangle */ import { randomString } from '../common/utils/index';
import { getAvailableAlias, getAvailableAll, getAvailableIndex, isTreeColumn, PickerStatusEnum, treeBFS, getCascadeKey } from './const';
let _Symbol_iterator = Symbol.iterator;
let Column = class Column {
    update(rowIndex, column) {
        if (this.isTree) {
            const index = this.pickerColumnList.findIndex((item)=>item.id === column.id);
            if (Array.isArray(this.coordinate)) {
                this.coordinate[index] = rowIndex;
                this.updateTree(index + 1);
            }
        } else {
            this.coordinate = [
                rowIndex
            ];
        }
    }
    updateTree(length) {
        if (!Array.isArray(this.coordinate)) {
            throw new Error('coordinate 不是数组');
        }
        const coordinate = this.coordinate[length - 1];
        const pickerColumn = this.pickerColumnList[length - 1];
        const children = pickerColumn.column[coordinate];
        this.pickerColumnList.length = length;
        this.coordinate.length = length;
        if (typeof children === 'string') {
            throw new Error('选项类型错误');
        }
        const { rowAlias  } = this;
        if (!rowAlias) {
            throw new Error('选项类型错误');
        }
        {
            const iterator = this[Symbol.iterator]();
            let col = pickerColumn;
            let it = iterator.next(children[rowAlias], col);
            this.coordinate[length - 1] = it.coordinate;
            while(it.done){
                col = it.value;
                if (col) {
                    this.pickerColumnList.push(col);
                    const val = col.column[0];
                    it = iterator.next(val, col);
                    this.coordinate.push(it.coordinate);
                } else {
                    break;
                }
            }
        }
    }
    get value() {
        const { state  } = this;
        if (this.isTree) {
            return this.pickerColumnList.map(({ column  }, index)=>{
                if (!this.rowAlias) {
                    throw new Error('rowAlias 不是数组');
                }
                const opt = column[this.coordinate[index]];
                if (typeof opt === 'string') {
                    throw new Error('opt 是字符串');
                }
                return opt[this.rowAlias];
            });
        }
        const [pickerColumn] = this.pickerColumnList;
        const [coordinate] = this.coordinate;
        const opt = pickerColumn.column[coordinate];
        if (state === PickerStatusEnum.ROW_ALIAS) {
            if (!this.rowAlias) {
                throw new Error('rowAlias 不能为空');
            }
            if (typeof opt === 'string') {
                throw new Error('rowAlias 不能为空');
            }
            return opt[this.rowAlias];
        }
        if (state === PickerStatusEnum.ROW_ALL) {
            return opt;
        }
        return coordinate;
    }
    get options() {
        if (this.isTree) {
            return this.pickerColumnList.map(({ column  }, index)=>{
                const opt = column[this.coordinate[index]];
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { __key__ , ...other } = opt;
                return other;
            });
        }
        const [pickerColumn] = this.pickerColumnList;
        const [coordinate] = this.coordinate;
        const opt = pickerColumn.column[coordinate];
        return opt;
    }
    [_Symbol_iterator]() {
        return this;
    }
    /**
   * @description 迭代器
   * @param  value : 当前列选中值
   * @param  columnIterator : 当前列
   * @returns {object}
   */ next(value, columnIterator) {
        let coordinate = 0;
        let column;
        const { state  } = this;
        if (!this.isTree) {
            if (state === PickerStatusEnum.ROW_INDEX) {
                coordinate = getAvailableIndex(columnIterator.column, value);
            } else if (state === PickerStatusEnum.ROW_ALL) {
                coordinate = getAvailableAll(columnIterator.column, value);
            } else {
                if (!this.rowAlias) {
                    throw new Error('请设置rowAlias');
                }
                coordinate = getAvailableAlias(columnIterator.column, value, this.rowAlias);
            }
            return {
                done: false,
                value: undefined,
                coordinate
            };
        }
        if (!this.rowAlias) {
            throw new Error('请设置rowAlias');
        }
        coordinate = getAvailableAlias(columnIterator.column, value, this.rowAlias);
        const checked = columnIterator.column[coordinate];
        if (typeof checked === 'string') {
            throw new Error('选项类型错误');
        }
        if (typeof checked[this.rowAlias] === 'undefined') {
            throw new Error(`选项类型错误${{
                checked,
                rowAlias: this.rowAlias
            }}`);
        }
        const nextTreeColumn = this.treeMap.get(checked.__key__);
        if (nextTreeColumn) {
            const curColumn = nextTreeColumn[this.cascade];
            if (Array.isArray(curColumn) && curColumn.length > 0) {
                column = {
                    colAlias: this.colAlias,
                    column: curColumn,
                    id: randomString(),
                    columnId: this.id,
                    isTree: true
                };
            }
        }
        const done = column && column.column && Array.isArray(column.column) && column.column.length > 0;
        return {
            done,
            value: column,
            coordinate
        };
    }
    constructor({ options , colAlias , rowAlias , value , state , cascade , other  }){
        this.isTree = false;
        this.pickerColumnList = [];
        this.rowAlias = null;
        this.coordinate = [];
        /** 拉平一维树状数据 */ this.treeMap = new Map();
        this.rowAlias = rowAlias;
        this.id = randomString();
        this.colAlias = colAlias;
        this.state = state;
        this.cascade = cascade;
        this.other = other;
        if (options.some((item)=>typeof item !== 'string' && Array.isArray(item[cascade]))) {
            // 只要有一个类型包含 children 即为 级联列
            if (!this.rowAlias) {
                throw new Error('请设置rowAlias');
            }
            if (!isTreeColumn(options, cascade)) {
                throw new Error('数据结构错误');
            }
            const optionList = options.map((opt)=>({
                    ...opt,
                    __key__: getCascadeKey(opt[this.rowAlias])
                }));
            //   剥离级联数据
            this.treeMap = treeBFS(optionList, this.rowAlias, cascade);
            this.isTree = true;
            const nextColumn = [];
            optionList.forEach((item)=>{
                const opt = {};
                Object.keys(item).forEach((key)=>{
                    if (key !== cascade) {
                        opt[key] = item[key];
                    }
                });
                nextColumn.push({
                    ...opt
                });
            });
            this.pickerColumnList = [
                {
                    ...this.other,
                    column: nextColumn,
                    id: randomString(),
                    columnId: this.id,
                    isTree: true,
                    colAlias: this.colAlias
                }
            ];
        } else {
            this.isTree = false;
            this.pickerColumnList = [
                {
                    ...this.other,
                    column: options.map((item)=>item),
                    colAlias: this.colAlias,
                    id: randomString(),
                    columnId: this.id,
                    isTree: false
                }
            ];
        }
        {
            const iterator = this[Symbol.iterator]();
            let index = 0;
            let col = this.pickerColumnList[0];
            let val = Array.isArray(value) ? value[index] : value;
            let it = iterator.next(val, col);
            if (this.isTree) {
                this.coordinate.push(it.coordinate);
            } else {
                this.coordinate = [
                    it.coordinate
                ];
            }
            while(it.done){
                col = it.value;
                index += 1;
                val = Array.isArray(value) ? value[index] : value;
                if (col) {
                    this.pickerColumnList.push(col);
                    it = iterator.next(val, col);
                    this.coordinate.push(it.coordinate);
                } else {
                    break;
                }
            }
        }
    }
};
export { Column as default };
