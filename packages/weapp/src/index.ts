/* eslint-disable consistent-return */
let toastFilter = (str?: string) => str;

type ToastProps = {
  selector: string;
  ctx: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
  filter: (str?: string) => string;
};
type DialogProps = {
  selector: string;
  ctx: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
};
export const getContext = ({ selector, ctx }: ToastProps | DialogProps) => {
  const proxy = new Proxy(
    {},
    {
      get(target, property, receiver) {
        if (typeof property === 'symbol') return;
        let max = 1500;
        const fn = (e: unknown) => {
          {
            const componentCtx = ctx.selectComponent(selector);
            if (componentCtx && componentCtx[property]) {
              componentCtx[property](e);
              return;
            }
            setTimeout(() => {
              if (max <= 0) return () => {};
              max -= 100;
              fn(e);
            }, 100);
          }
        };
        return fn;
      }
    }
  );
  return proxy;
};

export const $tiDialog = (opt?: Partial<DialogProps>) =>
  getContext(
    opt
      ? {
          ...opt,
          selector: opt.selector || '#titian-dialog',
          ctx: opt.ctx || getCurrentPages()[getCurrentPages().length - 1]
        }
      : {
          selector: '#titian-dialog',
          ctx: getCurrentPages()[getCurrentPages().length - 1]
        }
  );

export function $tiToast(opt?: Partial<ToastProps>) {
  return getContext(
    opt
      ? {
          ...opt,
          selector: opt.selector || '#titian-toast',
          ctx: opt.ctx || getCurrentPages()[getCurrentPages().length - 1]
        }
      : {
          selector: '#titian-toast',
          ctx: getCurrentPages()[getCurrentPages().length - 1]
        }
  );
}

$tiToast.addFilter = (cb?: (str?: string) => string) => {
  toastFilter = cb || toastFilter;
  return toastFilter;
};
export const $toastFilter = $tiToast.addFilter;

function methodsTransfer(getComponent: any, methods: string[]) {
  methods.forEach((method) => {
    getComponent[method] = function fn(e: unknown) {
      const component = getComponent(e);
      if (component) {
        return component[method](e);
      }
      return () => {};
    };
  });
}
methodsTransfer($tiDialog, ['show', 'close']);
methodsTransfer($tiToast, ['show', 'info', 'loading', 'warn', 'success', 'fail', 'clear']);
