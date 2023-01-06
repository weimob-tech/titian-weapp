import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import { nextTick } from '../common/utils/index';

export type RadioButtonProps = {
  /**
   * 文字内容
   *
   * @type string
   * @default ''
   * @example
   * <ti-radio-button label="文本" />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  label?: PropertyToData<StringConstructor>;

  /**
   * 根据 value 进行比较，判断是否选中
   *
   * @type string
   * @default ''
   * @example
   * <ti-radio-button value="1" />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  value?: PropertyToData<null>;

  /**
   * 指定当前是否选中, 此模式下为控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-radio-button checked />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  checked?: PropertyToData<null>;

  /**
   * 初始是否选中, 此模式下为非控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-radio-button defaultChecked />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  defaultChecked?: PropertyToData<null>;

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <ti-radio-button disabled />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  disabled?: PropertyToData<BooleanConstructor>;

  /**
   * 自定义图标名称
   *
   * @type string
   * @default ''
   * @example
   * <ti-radio-button icon="custom" />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  icon?: PropertyToData<StringConstructor>;
  leftIcon?: PropertyToData<StringConstructor>;

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <ti-radio-button color="red" />
   * @since 0.1.0
   * @memberOf RadioButtonProps
   */
  color?: PropertyToData<StringConstructor>;
  extStyle?: PropertyToData<StringConstructor>;
};

type RadioButtonData = {
  privateChecked: boolean;
  styles: string;
};

BasicComponent<RadioButtonData, RadioButtonProps>({
  parent: 'radio-group',
  relationAction() {
    this.updateDataFromParent();
  },
  properties: {
    label: String,
    value: null,
    disabled: Boolean,
    checked: {
      type: null,
      observer: 'updateChecked'
    },
    defaultChecked: null,
    icon: String,
    extStyle: String,
    color: {
      type: String,
      observer: 'colorChange'
    }
  },
  data: {
    privateChecked: false,
    styles: ''
  },
  lifetimes: {
    attached() {
      this.updateDataFromParent();
    },
    ready() {
      this.updateDataFromParent();
    }
  },
  methods: {
    colorChange(value: string, oldValue: string) {
      if (value !== oldValue) {
        if (value) {
          this.setData({
            styles: `
            --radio-button-disabled-border-color:${this.formatColor(value, 0.2)};
            --radio-button-disabled-text-color: ${this.formatColor(value, 0.4)};
            --radio-button-checked-bg-color: ${this.formatColor(value, 0.1)};
            --radio-button-checked-text-color: ${this.formatColor(value, 1)};
            --radio-button-checked-border-color:${this.formatColor(value, 0.4)};`
          });
        }
      }
    },
    updateChecked(newVal: boolean, oldVal: boolean) {
      // eslint-disable-next-line eqeqeq
      if (newVal != oldVal) {
        this.setData({
          privateChecked: newVal
        });
      }
    },
    updateDataFromParent() {
      if (this.doUpdating) {
        return;
      }
      this.doUpdating = true;
      nextTick(() => {
        this.doUpdating = false;
        if (this.parent) {
          const { disabled, value: parentValue, defaultValue, icon } = this.parent.data;
          const { value } = this.data;

          let privateChecked = false;
          let checked = null;
          let defaultChecked = null;

          if (parentValue !== null) {
            checked = parentValue === value;
          }

          if (defaultValue !== null) {
            defaultChecked = defaultValue === value;
          }

          if (defaultChecked !== null) {
            privateChecked = defaultChecked;
          }

          if (checked !== null) {
            privateChecked = checked;
          }

          this.setData({
            disabled: disabled || this.data.disabled,
            icon: icon ?? this.data.icon,
            checked,
            defaultChecked,
            privateChecked
          });
          return;
        }
        const { defaultChecked, checked } = this.data;

        let privateChecked = false;

        if (defaultChecked !== null) {
          privateChecked = defaultChecked;
        }

        if (checked !== null) {
          privateChecked = checked;
        }

        this.setData({ privateChecked });
      });
    },

    handleChange() {
      const { value, privateChecked, checked } = this.data;

      const instance = this.parent || this;
      const nextChecked = !privateChecked;

      instance.triggerEvent('change', this.parent ? value : nextChecked);
      if (checked !== null) {
        return;
      }

      if (this.parent) {
        instance?.setData({ defaultValue: value });
      } else {
        this.setData({ privateChecked: nextChecked });
      }
    },

    formatColor(colorStr: string, opacity = 1) {
      if (!colorStr) return '';
      let rgba = '';
      if (colorStr.includes('#')) {
        rgba = hexToRGB(colorStr, opacity);
      }
      if (colorStr.includes('rgba')) {
        const reg = /^rgba?\((.+)\)$/g;
        const a = colorStr.replace(reg, (_s, $1) => $1);
        const [r, g, b] = a.split(',');
        rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      if (colorStr.includes('rgb')) {
        rgba = RGBToRGBA(colorStr, opacity);
      }

      return rgba;
    },
    handleTagClick() {
      const { disabled } = this.data;
      if (disabled) return;

      this.handleChange();
    }
  }
});
