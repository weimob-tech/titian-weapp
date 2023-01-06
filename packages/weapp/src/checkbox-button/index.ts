import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import { nextTick } from '../common/utils/index';

export type CheckboxButtonProps = {
  /**
   * 文字内容
   *
   * @type string
   * @default false
   * @example
   * <ti-checkbox-button label />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  label?: PropertyToData<StringConstructor>;

  /**
   * 根据 value 进行比较，判断是否选中
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox-button value="1" />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  value?: PropertyToData<null>;

  /**
   * 指定当前是否选中, 此模式下为控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox-button checked />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  checked?: PropertyToData<null>;

  /**
   * 初始是否选中, 此模式下为非控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox-button defaultChecked />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  defaultChecked?: PropertyToData<null>;

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox-button disabled />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  disabled?: PropertyToData<BooleanConstructor>;

  /**
   * 自定义图标名称
   *
   * @type string
   * @default 'checkbox'
   * @example
   * <ti-checkbox-button icon="checkbox" />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  icon?: PropertyToData<StringConstructor>;

  leftIcon?: PropertyToData<StringConstructor>;

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox-button color="red" />
   * @since 0.1.0
   * @memberOf CheckboxButtonProps
   */
  color?: PropertyToData<StringConstructor>;

  extStyle?: PropertyToData<StringConstructor>;
};

type CheckboxButtonData = {
  toggleClass: string;
  privateChecked: boolean;
  styles: string;
};
BasicComponent<CheckboxButtonData, CheckboxButtonProps>({
  parent: 'checkbox-group',
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
    leftIcon: String,
    color: {
      type: String,
      observer: 'colorChange'
    },
    extStyle: String
  },
  data: {
    toggleClass: '',
    privateChecked: false,
    styles: ''
  },
  lifetimes: {
    attached() {
      this.updateDataFromParent();
    }
  },
  methods: {
    colorChange(value: string, oldValue: string) {
      if (value !== oldValue) {
        if (value) {
          this.setData({
            styles: `
            --checkbox-button-disabled-border-color: ${this.formatColor(value, 0.2)};
            --checkbox-button-disabled-text-color: ${this.formatColor(value, 0.4)};
            --checkbox-button-checked-bg-color: ${this.formatColor(value, 0.1)};
            --checkbox-button-checked-text-color: ${this.formatColor(value, 1)};
            --checkbox-button-checked-border-color:${this.formatColor(value, 0.4)};`
          });
        }
      }
    },
    updateChecked(newVal: boolean, oldVal: boolean) {
      // eslint-disable-next-line eqeqeq
      if (newVal != oldVal) {
        this.setData({
          privateChecked: newVal,
          toggleClass: newVal ? 'zoom-in' : 'zoom-out'
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
          const { disabled, value: parentValue, defaultValue: parentDefaultValue, icon, color } = this.parent.data;
          const { value } = this.data;
          let privateChecked = false;
          let checked = null;
          let defaultChecked = null;

          if (parentValue !== null) {
            checked = parentValue.includes(value);
          }

          if (parentDefaultValue !== null) {
            defaultChecked = parentDefaultValue.includes(value);
          }

          if (defaultChecked !== null) {
            privateChecked = defaultChecked;
          }

          if (checked !== null) {
            privateChecked = checked;
          }
          this.setData({
            disabled: disabled || this.data.disabled,
            checked,
            defaultChecked,
            privateChecked,
            color: color ?? this.data.color,
            icon: icon ?? this.data.icon,
            toggleClass: privateChecked ? 'zoom-in' : 'zoom-out'
          });

          return;
        }

        let checked = false;

        if (this.data.defaultChecked !== null) {
          checked = this.data.defaultChecked;
        }

        if (this.data.checked !== null) {
          checked = this.data.checked;
        }
        this.setData({
          privateChecked: checked,
          toggleClass: checked ? 'zoom-in' : 'zoom-out'
        });
      });
    },

    handleChange() {
      const { value, privateChecked, checked } = this.data;
      const instance = this.parent || this;

      if (this.parent) {
        const { max, value: pValue } = this.parent.data;
        let { defaultValue } = this.parent.data;

        defaultValue = defaultValue || pValue || [];

        // 当前点击时，原先的值仍然为上一次的选中值
        let newValue = privateChecked
          ? defaultValue.filter((item: string) => item !== value)
          : [...defaultValue, value];

        newValue = Array.from(new Set(newValue));

        if (newValue.length > max && checked === null) {
          this.parent.triggerEvent('handleMax');
          return;
        }

        this.parent.triggerEvent('change', newValue);
        if (checked === null) {
          instance?.setData({ defaultValue: newValue });
        }
      } else {
        const nextChecked = !privateChecked;

        this.triggerEvent('change', nextChecked);
        if (checked === null) {
          this.setData({
            privateChecked: nextChecked,
            toggleClass: nextChecked ? 'zoom-in' : 'zoom-out'
          });
        }
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
