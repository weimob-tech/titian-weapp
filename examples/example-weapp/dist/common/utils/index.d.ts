/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
import { IAnyObject, OmitType } from '../interface/index';
export * from './number';
export declare const objectToString: () => string;
export declare const toTypeString: (val: unknown) => string;
export type Key = string | number | symbol;
export declare const isString: (obj: unknown) => obj is string;
export declare const isPlainObject: (obj: unknown) => obj is {
    [key: string]: unknown;
    [key: number]: unknown;
    [key: symbol]: unknown;
};
export declare const isPlainArray: (obj: unknown) => obj is unknown[];
export declare const isPlainRegExp: (obj: unknown) => obj is RegExp;
export declare const isBoolean: (obj: unknown) => obj is boolean;
export declare const isFunction: (obj: unknown) => obj is (...agrn: unknown[]) => unknown;
export declare const isArrayEqual: (arr1: unknown[], arr2: unknown[]) => boolean;
export declare function getSystemInfoSync(): any;
export declare function nextTick(fn: () => void): void;
export declare function requestAnimationFrame(cb: () => void): void | WechatMiniprogram.NodesRef;
export declare function getWindowHeightForRPX(): number;
export declare function getRect(context: WechatMiniprogram.Component.TrivialInstance, selector: string): Promise<WechatMiniprogram.BoundingClientRectCallbackResult>;
export declare function getFieldStyle(context: WechatMiniprogram.Component.TrivialInstance, selector: string, computedStyle: string[]): Promise<WechatMiniprogram.IAnyObject>;
export declare function debounce(fn: Function, ms?: number): (this: unknown, ...args: unknown[]) => void;
export declare function throttle(func: Function, delay?: number): (this: unknown, ...args: unknown[]) => void;
export declare const randomString: () => string;
export declare function filterInvalidData<T extends IAnyObject>(obj: T): OmitType<T, null | undefined>;
export declare const DISABLED = "disabled";
export declare function isDisabled(params: unknown): boolean;
export declare function range(num: number, min: number, max: number): number;
export declare function padZero(val: string | number, number?: number): string;
export declare function isValidDate(d: unknown): d is Date;
export declare function getDate(): Date;
export declare function getDate(date: string | number | Date): Date;
export declare function getDate(year: number, month: number): Date;
export declare function getDate(year: number, month: number, day: number): Date;
