import { IAnyObject, OmitType } from '../interface/index';

export * from './number';

export const objectToString = Object.prototype.toString;

export const toTypeString = (val: unknown): string => objectToString.call(val);

export type Key = string | number | symbol;

export const isString = (obj: unknown): obj is string => toTypeString(obj) === '[object String]';

export const isPlainObject = (obj: unknown): obj is { [key: Key]: unknown } => toTypeString(obj) === '[object Object]';

export const isPlainArray = (obj: unknown): obj is unknown[] => toTypeString(obj) === '[object Array]';

export const isPlainRegExp = (obj: unknown): obj is RegExp => toTypeString(obj) === '[object RegExp]';

export const isBoolean = (obj: unknown): obj is boolean => toTypeString(obj) === '[object Boolean]';

export const isFunction = (obj: unknown): obj is (...agrn: unknown[]) => unknown => typeof obj === 'function';

export const isArrayEqual = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((item, index) => item === arr2[index]);
};

let systemInfo: WechatMiniprogram.SystemInfo | null = null;

export function getSystemInfoSync(): any {
  if (global.process?.env?.NODE_ENV !== 'test') {
    if (wx.getSystemInfoSync) {
      return wx.getSystemInfoSync();
    }
  } else {
    if (systemInfo == null) {
      systemInfo = wx.getSystemInfoSync();
    }

    return systemInfo;
  }
  return {};
}

export function nextTick(fn: () => void) {
  if (wx.nextTick) {
    wx.nextTick(fn);
  } else {
    setTimeout(fn, 1000 / 30);
  }
}

export function requestAnimationFrame(cb: () => void) {
  const systemInfoSync = getSystemInfoSync();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (systemInfoSync.platform === 'devtools') {
    return nextTick(cb);
  }
  return wx
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}

export function getWindowHeightForRPX() {
  const { windowHeight, windowWidth } = wx.getSystemInfoSync();

  return (windowWidth / 750) * windowHeight;
}

export function getRect(context: WechatMiniprogram.Component.TrivialInstance, selector: string) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect((rect) => {
        if (rect) {
          resolve(rect);
        }
      })
      .exec();
  });
}

export function getFieldStyle(
  context: WechatMiniprogram.Component.TrivialInstance,
  selector: string,
  computedStyle: string[]
): Promise<WechatMiniprogram.IAnyObject> {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .fields({ computedStyle }, (res) => {
        if (res) {
          const { color } = res;
          const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
          const match = matchColors.exec(color);
          if (match) {
            const [, r, g, b] = match;
            res.rgbColor = [r, g, b];
          }
          resolve(res);
        }
      })
      .exec();
  });
}

export function debounce(fn: (...agrn: unknown[]) => unknown, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function debounceFn(this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export const randomString = () => Math.random().toString(36).slice(2);

export function filterInvalidData<T extends IAnyObject>(obj: T): OmitType<T, null | undefined> {
  const params = { ...obj };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'undefined' || value === null) {
      delete params[key];
    }
  });
  return params;
}

export const DISABLED = 'disabled';

export function isDisabled(params: unknown): boolean {
  if (typeof params !== 'object' || !params) {
    return false;
  }
  return (params as IAnyObject)[DISABLED] as boolean;
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function padZero(val: string | number, number = 2) {
  return `${val}`.padStart(number, '0');
}

export function isValidDate(d: unknown): d is Date {
  return d !== undefined && d !== null && !Number.isNaN(new Date(d as Date).getTime());
}

export function getDate(): Date;
export function getDate(date: string | number | Date): Date;
export function getDate(year: number, month: number): Date;
export function getDate(year: number, month: number, day: number): Date;
export function getDate(date?: string | number | Date, month?: number, day?: number) {
  let cur: Date;
  // 取当前事件
  if (typeof date === 'undefined') {
    return new Date();
  }
  if (typeof date === 'number' && typeof month === 'number' && typeof day === 'number') {
    cur = new Date(date, month, day);
  } else if (typeof date === 'number' && typeof month === 'number') {
    cur = new Date(date, month);
  } else {
    cur = new Date(date);
  }
  if (!cur) {
    throw new Error('时间格式错误');
  }
  if (cur.toString() === 'Invalid Date') {
    throw new Error('时间格式错误');
  }
  return cur;
}
