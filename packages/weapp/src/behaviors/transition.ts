/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PropertyToData } from '../common/interface/index';
import { isPlainObject, requestAnimationFrame } from '../common/utils/index';

enum TransitionStatus {
  enter,
  exit
}

function getTransitions(name: string) {
  const transitionsMapping = new Map();
  // 支付宝上externalClasses异步设置，titan-cli支持的有问题，用下面的方法兼容
  let enterClass = 'enter-class';
  let enterActiveClass = 'enter-active-class';
  let enterDoneClass = 'enter-done-class';
  let exitClass = 'exit-class';
  let exitActiveClass = 'exit-active-class';
  let exitDoneClass = 'exit-done-class';
  // #ifdef MP-ALIPAY
  enterClass = this.data.enterClass || enterClass;
  enterActiveClass = this.data.enterActiveClass || enterActiveClass;
  enterDoneClass = this.data.enterDoneClass || enterDoneClass;
  exitClass = this.data.exitClass || exitClass;
  exitActiveClass = this.data.exitActiveClass || exitActiveClass;
  exitDoneClass = this.data.exitDoneClass || exitDoneClass;
  // #endif

  transitionsMapping.set('enter', `titian-${name}-enter titian-${name}-enter-active ${enterClass} ${enterActiveClass}`);
  transitionsMapping.set(
    'enter-done',
    `titian-${name}-enter-done titian-${name}-enter-active ${enterDoneClass} ${enterActiveClass}`
  );
  transitionsMapping.set('exit', `titian-${name}-exit titian-${name}-exit-active ${exitClass} ${exitActiveClass}`);
  transitionsMapping.set(
    'exit-done',
    `titian-${name}-exit-done titian-${name}-exit-active ${exitDoneClass} ${exitActiveClass}`
  );

  return transitionsMapping;
}

export type TransitionProps = WechatMiniprogram.Component.PropertyOption & {
  /**
   * 自定义样式
   *
   * @default
   * @since 1.9.0
   * @type {string}
   * @memberof TransitionProps
   * */
  extStyle?: PropertyToData<StringConstructor>;

  /**
   * 是否显示
   *
   * @default false
   * @since 0.1.0
   * @type boolean
   * @memberof TransitionProps
   * */
  show?: PropertyToData<BooleanConstructor>;

  /**
   * 过渡动画时间
   *
   * @date
   * @default 300
   * @since 0.1.0
   * @type number | { enter?: number; exit?: number }
   * @memberof TransitionProps
   * */
  timeout?: PropertyToData<NumberConstructor | null>;

  /**
   * 过渡动画名称
   *
   * @default 'fade'
   * @since 0.1.0
   * @type string
   * @member TransitionProps
   * */
  name?: PropertyToData<StringConstructor | null>;

  /**
   * 入场动画类型
   *
   * @default 'enter'
   * @since 0.1.0
   * @type string
   * @memberof TransitionProps
   * */
  enterName?: PropertyToData<StringConstructor>;

  /**
   * 出场动画类型
   *
   * @default ''
   * @since 0.1.0
   * @type string
   * @memberof TransitionProps
   * */
  exitName?: PropertyToData<StringConstructor>;

  /**
   * 退出时是否移除节点
   *
   * @default false
   * @since 0.1.0
   * @type {boolean}
   * @memberof TransitionProps
   * */
  destroyOnExit?: PropertyToData<BooleanConstructor>;

  /**
   * 过渡动画方法
   *
   * @default linear
   * @since 0.1.0
   * @type string
   * @memberof TransitionProps
   * */
  timingFunction?: PropertyToData<StringConstructor>;
};

export type TransitionOptions = WechatMiniprogram.Component.DataOption & {
  /**
   * 过渡动画名称
   *
   * @default 'fade'
   * @since 0.1.0
   * @type string
   * @memberof TransitionOptions
   * */
  name?: WechatMiniprogram.Component.PropertyToData<StringConstructor>;

  /**
   * 过渡动画方法
   *
   * @default linear
   * @since 0.1.0
   * @type string
   * @memberof TransitionProps
   * */
  timingFunction?: WechatMiniprogram.Component.PropertyToData<StringConstructor> | unknown;

  /**
   * 过渡动画时间
   *
   * @default 300
   * @since 0.1.0
   * @type number | { enter?: number; exit?: number }
   * @memberof TransitionProps
   * */
  duration?: WechatMiniprogram.Component.PropertyToData<NumberConstructor> | number;
};

export type TransitionData = {
  /**
   * 类名列表
   *
   * @default ''
   * @since 0.1.0
   * @type string
   * @memberof TransitionData
   * */
  classes?: string;

  /**
   * 是否被初始化
   *
   * @default false
   * @since 0.1.0
   * @type boolean
   * @memberof TransitionData
   * */
  initialized?: boolean;

  /**
   * 是否展示元素节点
   *
   * @default false
   * @since 0.1.0
   * @type boolean
   * @memberof TransitionData
   * */
  display?: boolean;

  duration?: number;
} & Pick<TransitionOptions, 'duration'>;

export type TransitionMethods = {
  /**
   * 进入过渡动画
   *
   * @since 0.1.0
   * @memberof TransitionMethods
   * */
  enter(): void;

  /**
   * 退出过渡动画
   *
   * @since 0.1.0
   * @memberof TransitionMethods
   * */
  exit(): void;

  /**
   * 切换过渡动画
   *
   * @param newValue 新的值 true: enter, false: exit
   * @param oldValue 旧的值 true: enter, false: exit
   * @since 0.1.0
   * @memberof TransitionMethods
   * */
  toggleShow(newValue: boolean, oldValue: boolean): void;

  /**
   * 过渡动画完成操作
   *
   * @param event CustomEvent
   * @since 0.1.0
   * @memberof TransitionMethods
   * */
  onTransitionEnd(): void;
};

export type TransitionCustomInstanceProperty = {
  /**
   * 过渡动画是否完成
   *
   * @default false
   * @since 0.1.0
   * @memberof TransitionCustomInstanceProperty
   * */
  transitionEnd: boolean;

  /**
   * 过渡动画所处状态
   *
   * @default exit
   * @since 0.1.0
   * @memberof TransitionCustomInstanceProperty
   * */
  status: TransitionStatus;
};

export type TransitionInstance = WechatMiniprogram.Behavior.Instance<
  TransitionData,
  TransitionProps,
  any,
  TransitionCustomInstanceProperty
>;

/**
 * 过渡动画
 *
 * @param {TransitionOptions} options 过渡动画参数
 * @since 0.1.0
 * @example
 * behaviors: [transition({ name: 'fade' })]
 * @callback Behavior.Instance
 * */
export type Transition = (options?: TransitionOptions) => TransitionInstance;

const transition: Transition = (options = {}) => {
  const DEFAULT_TIMEOUT = options.duration || 300;

  return Behavior<TransitionData, TransitionProps, TransitionMethods, TransitionCustomInstanceProperty>({
    properties: {
      extStyle: String,
      show: {
        type: Boolean,
        value: false,
        observer: 'toggleShow'
      },
      timeout: {
        type: null,
        value: DEFAULT_TIMEOUT,
        observer: ''
      },
      name: {
        type: String,
        value: options.name || 'fade'
      },
      enterName: String,
      exitName: String,
      destroyOnExit: {
        type: Boolean,
        value: false
      },
      timingFunction: {
        type: String,
        value: (options.timingFunction || 'linear') as string
      }
    },
    data: {
      classes: '',
      initialized: false,
      display: false,
      duration: DEFAULT_TIMEOUT
    },
    lifetimes: {
      ready() {
        const { show } = this.data;

        if (show) {
          this.toggleShow(true, false);
        }
      }
    },
    methods: {
      toggleShow(newVal: boolean, oldVal: boolean) {
        if (newVal !== oldVal) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          newVal ? this.enter() : this.exit();
        }
      },
      enter() {
        const { name, enterName, timeout } = this.data;

        const duration = isPlainObject(timeout) ? timeout.appear || DEFAULT_TIMEOUT : timeout;
        const transitionsMapping = getTransitions.call(this, enterName || name);

        this.status = TransitionStatus.enter;

        this.triggerEvent('enter');

        requestAnimationFrame(() => {
          if (this.status !== TransitionStatus.enter) {
            return;
          }

          this.triggerEvent('entering');
          this.setData(
            {
              duration,
              initialized: true,
              display: true,
              classes: transitionsMapping.get('enter')
            },
            () => {
              requestAnimationFrame(() => {
                if (this.status !== TransitionStatus.enter) {
                  return;
                }
                this.transitionEnd = false;
                this.setData({ classes: transitionsMapping.get('enter-done') });
                setTimeout(() => {
                  this.onTransitionEnd();
                }, duration as number);
              });
            }
          );
        });
      },
      exit() {
        const { display, exitName, name, timeout } = this.data;

        if (!display) {
          return;
        }

        const duration = isPlainObject(timeout) ? timeout.exit || DEFAULT_TIMEOUT : timeout;
        const transitionsMapping = getTransitions.call(this, exitName || name);

        this.status = TransitionStatus.exit;

        this.triggerEvent('exit');

        requestAnimationFrame(() => {
          if (this.status !== TransitionStatus.exit) {
            return;
          }

          this.triggerEvent('exiting');
          this.setData({ classes: transitionsMapping.get('exit'), duration }, () => {
            requestAnimationFrame(() => {
              if (this.status !== TransitionStatus.exit) {
                return;
              }

              this.transitionEnd = false;
              this.setData({ classes: transitionsMapping.get('exit-done') });

              setTimeout(() => this.onTransitionEnd(), duration);
            });
          });
        });
      },
      onTransitionEnd() {
        if (this.transitionEnd) {
          return;
        }

        this.transitionEnd = true;
        this.triggerEvent(this.status === TransitionStatus.enter ? 'entered' : 'exited');

        {
          const { show, display, destroyOnExit, initialized } = this.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newData: any = { classes: '' };

          if (!show && display) {
            newData.display = false;
            newData.initialized = destroyOnExit ? false : initialized;
            this.setData(newData);
          }
        }
      }
    }
  });
};

export default transition;
