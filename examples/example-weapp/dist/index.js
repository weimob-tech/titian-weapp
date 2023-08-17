/* eslint-disable consistent-return */ let toastFilter = (str)=>str;
export const getContext = ({ selector , ctx  })=>{
    const proxy = new Proxy({}, {
        get (target, property, receiver) {
            if (typeof property === 'symbol') return;
            let max = 1500;
            const fn = (e)=>{
                {
                    const componentCtx = ctx.selectComponent(selector);
                    if (componentCtx && componentCtx[property]) {
                        componentCtx[property](e);
                        return;
                    }
                    setTimeout(()=>{
                        if (max <= 0) return ()=>{};
                        max -= 100;
                        fn(e);
                    }, 100);
                }
            };
            return fn;
        }
    });
    return proxy;
};
export const $tiDialog = (opt)=>getContext(opt ? {
        ...opt,
        selector: opt.selector || '#titian-dialog',
        ctx: opt.ctx || getCurrentPages()[getCurrentPages().length - 1]
    } : {
        selector: '#titian-dialog',
        ctx: getCurrentPages()[getCurrentPages().length - 1]
    });
export function $tiToast(opt) {
    return getContext(opt ? {
        ...opt,
        selector: opt.selector || '#titian-toast',
        ctx: opt.ctx || getCurrentPages()[getCurrentPages().length - 1]
    } : {
        selector: '#titian-toast',
        ctx: getCurrentPages()[getCurrentPages().length - 1]
    });
}
$tiToast.addFilter = (cb)=>{
    toastFilter = cb || toastFilter;
    return toastFilter;
};
export const $toastFilter = $tiToast.addFilter;
function methodsTransfer(getComponent, methods) {
    methods.forEach((method)=>{
        getComponent[method] = function fn(e) {
            const component = getComponent(e);
            if (component) {
                return component[method](e);
            }
            return ()=>{};
        };
    });
}
methodsTransfer($tiDialog, [
    'show',
    'close'
]);
methodsTransfer($tiToast, [
    'show',
    'info',
    'loading',
    'warn',
    'success',
    'fail',
    'clear'
]);
