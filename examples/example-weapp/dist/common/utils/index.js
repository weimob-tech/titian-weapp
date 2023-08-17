/* eslint-disable @typescript-eslint/ban-types */ export * from './number';
export const objectToString = Object.prototype.toString;
export const toTypeString = (val)=>objectToString.call(val);
export const isString = (obj)=>toTypeString(obj) === '[object String]';
export const isPlainObject = (obj)=>toTypeString(obj) === '[object Object]';
export const isPlainArray = (obj)=>toTypeString(obj) === '[object Array]';
export const isPlainRegExp = (obj)=>toTypeString(obj) === '[object RegExp]';
export const isBoolean = (obj)=>toTypeString(obj) === '[object Boolean]';
export const isFunction = (obj)=>typeof obj === 'function';
export const isArrayEqual = (arr1, arr2)=>{
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((item, index)=>item === arr2[index]);
};
let systemInfo = null;
export function getSystemInfoSync() {
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
export function nextTick(fn) {
    if (wx.nextTick) {
        wx.nextTick(fn);
    } else {
        setTimeout(fn, 1000 / 30);
    }
}
export function requestAnimationFrame(cb) {
    const systemInfoSync = getSystemInfoSync();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (systemInfoSync.platform === 'devtools') {
        return nextTick(cb);
    }
    return wx.createSelectorQuery().selectViewport().boundingClientRect().exec(()=>{
        cb();
    });
}
export function getWindowHeightForRPX() {
    const { windowHeight , windowWidth  } = wx.getSystemInfoSync();
    return windowWidth / 750 * windowHeight;
}
export function getRect(context, selector) {
    return new Promise((resolve)=>{
        wx.createSelectorQuery().in(context).select(selector).boundingClientRect((rect)=>{
            if (rect) {
                resolve(rect);
            }
        }).exec();
    });
}
export function getFieldStyle(context, selector, computedStyle) {
    return new Promise((resolve)=>{
        wx.createSelectorQuery().in(context).select(selector).fields({
            computedStyle
        }, (res)=>{
            if (res) {
                const { color  } = res;
                const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                const match = matchColors.exec(color);
                if (match) {
                    const [, r, g, b] = match;
                    res.rgbColor = [
                        r,
                        g,
                        b
                    ];
                }
                resolve(res);
            }
        }).exec();
    });
}
export function debounce(fn, ms = 300) {
    let timeoutId;
    return function debounceFn(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>fn.apply(this, args), ms);
    };
}
export function throttle(func, delay = 100) {
    let lastTime = 0;
    let timeoutId;
    return function fn(...args) {
        const currentTime = Date.now();
        if (currentTime - lastTime >= delay) {
            clearTimeout(timeoutId);
            func.apply(this, args);
            lastTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                func.apply(this, args);
                lastTime = Date.now();
            }, delay - (currentTime - lastTime));
        }
    };
}
export const randomString = ()=>Math.random().toString(36).slice(2);
export function filterInvalidData(obj) {
    const params = {
        ...obj
    };
    Object.keys(obj).forEach((key)=>{
        const value = obj[key];
        if (typeof value === 'undefined' || value === null) {
            delete params[key];
        }
    });
    return params;
}
export const DISABLED = 'disabled';
export function isDisabled(params) {
    if (typeof params !== 'object' || !params) {
        return false;
    }
    return params[DISABLED];
}
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function padZero(val, number = 2) {
    return `${val}`.padStart(number, '0');
}
export function isValidDate(d) {
    return d !== undefined && d !== null && !Number.isNaN(new Date(d).getTime());
}
export function getDate(date, month, day) {
    let cur;
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
