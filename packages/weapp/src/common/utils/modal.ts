export interface ModalOptions {
  visible?: boolean;
  type?: string;
  overlay?: boolean;
  zIndex?: number;
  context?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
  position?: string;
  duration?: number;
  selector?: string;
  onClose?: () => void;
  [key: string]: unknown;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
type noop = () => void;
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export default class Modal {
  node: WechatMiniprogram.Component.TrivialInstance | null = null;

  options: ModalOptions | null = null;

  constructor(modalOptions: ModalOptions) {
    const options = modalOptions;
    const context = options.context || getContext();
    this.node = context.selectComponent(options.selector as string);
    if (!this.node) {
      // eslint-disable-next-line no-console
      console.error(`未找到 ${options.selector} 节点，请确认 selector 及 context 是否正确`);
      return;
    }
    this.options = options;

    this.node.setData(options);
    if (this.options.duration && this.options.duration > 0) {
      this.node.timer = setTimeout(() => {
        this.clear();
      }, this.options.duration);
    }
  }

  public close(): WechatMiniprogram.Component.TrivialInstance | null {
    if (this.node) {
      this.node.setData({ visible: false }, () => {
        if (this.options && this.options.onClose) {
          this.options.onClose();
        }
      });
    }
    return this.node;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setData(data: { [key: string]: any }, callback?: noop): void {
    if (this.node) {
      this.node.setData(
        {
          ...data
        },
        () => {
          if (callback) {
            callback.apply(this.node);
          }
        }
      );
    }
  }

  public open(): WechatMiniprogram.Component.TrivialInstance | null {
    if (this.node) {
      this.node.setData({ visible: true }, () => {
        if (this.options && typeof this.options.onOpen === 'function') {
          this.options.onOpen();
        }
      });
    }
    return this.node;
  }

  public clear(): WechatMiniprogram.Component.TrivialInstance | null {
    if (this.node) {
      this.node.setData({ visible: false }, () => {
        if (this.options && this.options.onClose) {
          this.options.onClose();
        }
      });
    }
    return this.node;
  }
}
