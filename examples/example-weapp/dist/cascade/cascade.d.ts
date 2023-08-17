export type Option = {
    [key: string | number]: unknown;
};
export type Fn = (date?: unknown) => Option[] | Promise<Option[]>;
type IteratorBack = {
    done: boolean;
    value: Option[];
};
export declare function isValidOption(options: unknown): options is Option[];
export default class Cascade {
    cascade: string;
    last: number;
    options: Option[];
    tabs: string[];
    getOptions: Fn;
    constructor({ tabs, options, getOptions, cascade }: {
        tabs: string[];
        options: Option[];
        getOptions: Fn;
        cascade: string;
    });
    next(value?: {
        [key: string]: unknown;
    }): Promise<IteratorBack>;
    getData(active: number, code: string, value: unknown[]): Promise<{
        last: number;
        columnList: Option[][];
        columnValueList: Option[];
        active: number;
    }>;
    getNextData({ columnList, columnValueList, index, code, id }: {
        columnList: Option[][];
        columnValueList: Option[];
        index: number;
        id: unknown;
        code: string;
    }): Promise<undefined | {
        columnValueList: Option[];
        columnList?: Option[][];
        active?: number;
        last?: number;
    }>;
    getResult({ columnValueList, code }: {
        columnValueList: Option[];
        code: string;
    }): {
        value: unknown[];
        options: Option[];
    };
    [Symbol.asyncIterator](): this;
}
export {};
