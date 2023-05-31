import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';
import { nextTick } from '../common/utils/index';

export type CheckboxProps = {
  /**
   * 文字内容
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox cancelable />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  label?: PropertyToData<StringConstructor>;

  /**
   * 根据 value 进行比较，判断是否选中
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox value="1" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  value?: PropertyToData<null>;

  /**
   * 指定当前是否选中, 此模式下为控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox checked />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  checked?: PropertyToData<null>;

  /**
   * 初始是否选中, 此模式下为非控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox defaultChecked />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  defaultChecked?: PropertyToData<null>;

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox disabled />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  disabled?: PropertyToData<BooleanConstructor>;

  /**
   * 指定当前文字是否禁用点击
   *
   * @type boolean
   * @default false
   * @example
   * <ti-checkbox label-disabled />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  labelDisabled?: PropertyToData<BooleanConstructor>;

  /**
   * 自定义图标名称
   *
   * @type string
   * @default 'checkbox'
   * @example
   * <ti-checkbox icon="checkbox" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  icon?: PropertyToData<StringConstructor>;

  /**
   * 自定义图标尺寸
   *
   * @type number
   * @default 32
   * @example
   * <ti-checkbox icon="checkbox" size="{{40}}" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  size?: PropertyToData<NumberConstructor>;

  /**
   * 单选框圆角度数
   *
   * @type string
   * @default circle
   * @enum circle, square
   * @example
   * <ti-checkbox shape="square" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  shape?: PropertyToData<StringConstructor>;

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox color="red" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  color?: PropertyToData<StringConstructor>;

  /**
   * 单选框图标颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox icon-color="red" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  iconColor?: PropertyToData<StringConstructor>;

  /**
   * hotfix：当用户需要把 checkbox 放到重新渲染的组件中时，需要设置此属性为 false，防止因渲染而导致的闪烁问题
   *
   * @type boolean
   * @default true
   * @example
   * <ti-checkbox animation="{{ false }}"  />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  animation: PropertyToData<BooleanConstructor>;
  extStyle: PropertyToData<StringConstructor>;
};

type CheckboxData = {
  toggleClass: string;
  direction: string;
  privateChecked: boolean;
};
BasicComponent<CheckboxData, CheckboxProps>({
  parent: 'checkbox-group',
  relationAction() {
    this.updateDataFromParent();
  },
  properties: {
    label: String,
    value: null,
    disabled: Boolean,
    labelDisabled: Boolean,
    checked: {
      type: null,
      observer: 'updateChecked'
    },
    defaultChecked: null,
    icon: {
      type: String,
      optionalTypes: [String, Boolean],
      value: ''
    },
    color: String,
    size: {
      type: Number,
      value: 32
    },
    shape: {
      type: String,
      value: 'circle'
    },
    animation: {
      type: Boolean,
      value: true
    },
    iconColor: String,
    extStyle: String
  },
  data: {
    toggleClass: '',
    direction: 'horizontal',
    privateChecked: false
  },
  lifetimes: {
    attached() {
      this.updateDataFromParent();
    }
  },
  methods: {
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
          const {
            disabled,
            value: parentValue,
            defaultValue: parentDefaultValue,
            shape,
            icon,
            labelDisabled,
            direction,
            size,
            color,
            animation
          } = this.parent.data;
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

          let toggleClass = '';
          if (privateChecked) {
            toggleClass = 'zoom-in';
          } else if (this.firstRender) {
            toggleClass = 'zoom-out';
          }
          this.setData({
            labelDisabled: labelDisabled || this.data.labelDisabled,
            direction: direction ?? this.data.direction,
            disabled: disabled || this.data.disabled,
            checked,
            defaultChecked,
            privateChecked,
            color: color ?? this.data.color,
            shape: shape ?? this.data.shape,
            icon: icon ?? this.data.icon,
            size: size ?? this.data.size,
            animation: animation && this.data.animation,
            toggleClass
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
        let toggleClass = '';
        if (checked) {
          toggleClass = 'zoom-in';
        } else if (this.firstRender) {
          toggleClass = 'zoom-out';
        }
        this.setData({
          privateChecked: checked,
          toggleClass
        });
      });
    },

    handleChange() {
      const { value, privateChecked, checked } = this.data;
      this.firstRender = true;
      const instance = this.parent || this;

      if (this.parent) {
        const { max } = this.parent.data;

        let { defaultValue } = this.parent.data;
        const { value: pValue } = this.parent.data;
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

        this.parent.triggerEvent('change', Array.from(new Set(newValue)));
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

    onChange() {
      const { disabled } = this.data;
      if (disabled) return;

      this.handleChange();
    },

    onClick() {
      const { disabled, labelDisabled } = this.data;
      if (disabled || labelDisabled) return;
      this.handleChange();
    }
  }
});
