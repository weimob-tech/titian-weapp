import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

type RadioGroupProps = {
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
   * 用于设置当前选中的值
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
   * 默认选中的值
   *
   * @type string
   * @default ''
   * @example
   * <ti-checkbox value="1" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  defaultValue?: PropertyToData<null>;

  /**
   * 子组件排列方向
   *
   * @type string
   * @default ''
   * @enum ['horizontal', 'vertical']
   * @example
   * <ti-checkbox-group direction="vertical" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  direction?: PropertyToData<StringConstructor>;

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
   * 以配置形式设置子元素
   *
   * @type array
   * @default Array<{label: string, value: string, disabled?: boolean, labelDisabled?: boolean}>
   * @example
   * <ti-checkbox-group options="{{ [{value: 'name1', label: 'name1'},{value: 'name2', label: 'name2'},{value: 'name3', label: 'name3'}] }}"/>
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  options: PropertyToData<ArrayConstructor>;

  /**
   * hotfix：当用户需要把 checkbox 放到重新渲染的组件中时，需要设置此属性为 false，防止因渲染而导致的闪烁问题
   *
   * @type boolean
   * @default true
   * @example
   * <ti-checkbox animation="{{ fasle }}"  />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  animation: PropertyToData<BooleanConstructor>;

  extStyle: PropertyToData<StringConstructor>;
};

BasicComponent<Record<string, never>, RadioGroupProps>({
  children: ['radio', 'radio-button'],
  properties: {
    labelDisabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    value: {
      type: null,
      observer: 'updateChildren'
    },
    defaultValue: {
      type: null,
      observer: 'updateChildren'
    },
    direction: {
      type: String,
      observer: 'updateChildren'
    },
    shape: {
      type: String,
      observer: 'updateChildren'
    },
    icon: {
      type: String,
      observer: 'updateChildren'
    },
    options: {
      type: Array,
      value: []
    },
    animation: {
      type: Boolean,
      value: true
    },
    extStyle: String
  },
  lifetimes: {
    attached() {
      this.updateChildren();
    },
    ready() {
      this.updateChildren();
    }
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child?.updateDataFromParent();
      });
    }
  }
});
