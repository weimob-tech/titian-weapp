/* eslint-disable class-methods-use-this */ export function isValidOption(options) {
    return Array.isArray(options) && options.length > 0;
}
let _Symbol_asyncIterator = Symbol.asyncIterator;
let Cascade = class Cascade {
    async next(value) {
        const { cascade , options , last , tabs  } = this;
        if (last >= tabs.length) {
            return {
                done: false,
                value: []
            };
        }
        let currentOptions = [];
        // 数据无效 则从上一组结果中获取
        if (last === 0) {
            if (isValidOption(options)) {
                currentOptions = options;
            } else {
                const backOption = this.getOptions();
                if (Array.isArray(backOption)) {
                    currentOptions = backOption;
                } else if (backOption instanceof Promise) {
                    currentOptions = await backOption;
                }
            }
        } else if (value) {
            const temp = value[cascade];
            if (!isValidOption(temp)) {
                const backOption1 = this.getOptions(value);
                if (Array.isArray(backOption1)) {
                    currentOptions = backOption1;
                } else if (backOption1 instanceof Promise) {
                    currentOptions = await backOption1;
                }
            } else {
                currentOptions = temp;
            }
        }
        return {
            done: Array.isArray(currentOptions) && currentOptions.length > 0,
            value: currentOptions
        };
    }
    async getData(active, code, value) {
        const iterator = this[Symbol.asyncIterator]();
        let it = await iterator.next();
        const columnValueList = [];
        const columnList = [];
        while(it.done){
            this.last += 1;
            if (it.value) {
                columnList.push(it.value);
            }
            const select = it.value.find((i)=>i[code] === (value || [])[this.last - 1]) || undefined;
            if (select) {
                columnValueList.push(select);
            }
            // eslint-disable-next-line no-await-in-loop
            it = await iterator.next(select);
        }
        this.last -= 1;
        if (active > columnList.length - 1) {
            active = columnList.length - 1;
        }
        this.last = this.last < 0 ? 0 : this.last;
        return {
            last: this.last,
            columnList,
            columnValueList,
            active: active < 0 ? 0 : active
        };
    }
    async getNextData({ columnList , columnValueList , index , code , id  }) {
        const { tabs  } = this;
        const currentOption = columnList[index];
        const content = columnValueList[index];
        if (content && content[code] && content[code] === id) {
            return Promise.resolve(undefined);
        }
        const value = currentOption.find((i)=>i[code] === id);
        if (!value) {
            return Promise.resolve(undefined);
        }
        columnValueList[index] = value;
        if (index === tabs.length - 1) {
            return Promise.resolve({
                columnValueList: [
                    ...columnValueList
                ]
            });
        }
        this.last = index + 1;
        const iterator = this[Symbol.asyncIterator]();
        const it = await iterator.next(value);
        columnList[index + 1] = it.value;
        columnList.length = index + 2;
        columnValueList[index] = value;
        columnValueList.length = index + 1;
        return {
            columnList,
            columnValueList,
            active: index + 1,
            last: this.last
        };
    }
    getResult({ columnValueList , code  }) {
        const { cascade  } = this;
        const options = [];
        const value = [];
        columnValueList.forEach((item)=>{
            const column = {
                ...item
            };
            if (cascade in column) {
                delete column[cascade];
            }
            value.push(column[code]);
            options.push(column);
        });
        return {
            value,
            options
        };
    }
    [_Symbol_asyncIterator]() {
        return this;
    }
    constructor({ tabs , options , getOptions , cascade  }){
        this.cascade = 'child';
        this.last = 0;
        this.options = [];
        this.tabs = [];
        this.getOptions = ()=>[];
        this.tabs = tabs;
        this.options = options;
        this.getOptions = getOptions;
        this.cascade = cascade;
    }
};
export { Cascade as default };
