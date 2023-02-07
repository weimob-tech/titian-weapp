import BasicComponent from '../common/basic/BasicComponent';
import { isFunction } from '../common/utils/index';
import { $toastFilter } from '../index';
import { EToastType } from './const';

type IToastStaticOptions =
  | {
      type?: EToastType;
      text?: string;
      duration?: number;
      color?: string;
      iconName?: string;
      finishedCallback?: () => void;
    }
  | string;
const staticOptions: IToastStaticOptions = {
  text: '',
  duration: 2000,
  color: '#fff',
  type: EToastType.Text
};

BasicComponent({
  externalClasses: ['ext-popup-class', 'ext-popup-content-class'],
  properties: {
    extStyle: String,
    zIndex: {
      type: Number,
      value: 30000
    },
    timeout: {
      type: null,
      value: { appear: 1000 * 0.2, exit: 1000 * 0.1 }
    },
    transition: {
      type: String,
      value: 'fade-up'
    }
  },
  data: {
    visible: false,
    EToastType,
    type: EToastType.Text,
    text: '',
    iconName: '',
    color: '#fff'
  },
  lifetimes: {
    ready() {
      this.options = {};
      this.timeOut = 0;
    },
    detached() {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
    }
  },
  methods: {
    getOptions(opts: IToastStaticOptions) {
      if (typeof opts === 'string') {
        opts = {
          ...staticOptions,
          text: opts
        };
      } else {
        opts = { ...staticOptions, ...opts };
      }
      return opts;
    },
    show(opts: IToastStaticOptions) {
      this.clear();
      const options = this.getOptions(opts);
      const filter = $toastFilter();
      options.text = filter(options.text);
      this.options = options;
      this.setData({
        visible: true,
        ...options
      });
      if (typeof options.duration === 'number' && options.duration > 0) {
        this.timeOut = setTimeout(() => {
          this.clear();
        }, options.duration);
      }
    },
    hide() {
      this.setData({
        visible: false
      });
    },
    info(opts: IToastStaticOptions) {
      const { iconName, ...rest } = this.getOptions(opts);
      this.show({ ...rest, type: EToastType.Text, iconName: '' });
    },
    loading(opts: IToastStaticOptions) {
      const { iconName, ...rest } = this.getOptions(opts);
      this.show({ ...rest, type: EToastType.Loading, iconName: '' });
    },
    warn(opts: IToastStaticOptions) {
      const { iconName, ...rest } = this.getOptions(opts);
      this.show({
        ...rest,
        type: EToastType.Warn,
        iconName: iconName || 'warning'
      });
    },
    success(opts: IToastStaticOptions) {
      const { iconName, ...rest } = this.getOptions(opts);
      this.show({
        ...rest,
        type: EToastType.Success,
        iconName: iconName || 'right'
      });
    },
    fail(opts: IToastStaticOptions) {
      const { iconName, ...rest } = this.getOptions(opts);
      this.show({
        ...rest,
        type: EToastType.Fail,
        iconName: iconName || 'error'
      });
    },
    clear() {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      if (this.options && this.options.finishedCallback && isFunction(this.options.finishedCallback)) {
        this.options.finishedCallback();
        this.options.finishedCallback = null;
      }
      if (this.data.visible) {
        this.setData({
          visible: false
        });
      }
    }
  }
});
