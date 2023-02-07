import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

type CheckboxGroupProps = {
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
   * 设置当前最多选择的数量
   *
   * @type number
   * @default Infinity
   * @example
   * <ti-checkbox-group max="{{ 2 }}" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  max?: PropertyToData<NumberConstructor>;

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
   * 多选框尺寸
   *
   * @type number
   * @default ''
   * @example
   * <ti-checkbox size="{{32}}" />
   * @since 0.1.0
   * @memberof CheckboxProps
   */
  size?: PropertyToData<NumberConstructor>;

  extStyle?: PropertyToData<StringConstructor>;

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
};

BasicComponent<Record<string, never>, CheckboxGroupProps>({
  children: ['checkbox', 'checkbox-button'],
  properties: {
    value: {
      type: null,
      observer: 'observeValue'
    },
    defaultValue: {
      type: null,
      observer: 'observeValue'
    },
    labelDisabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    direction: {
      type: String,
      observer: 'updateChildren'
    },
    shape: {
      type: String,
      observer: 'updateChildren',
      value: 'circle'
    },
    icon: {
      type: String,
      observer: 'updateChildren'
    },
    color: {
      type: String,
      observer: 'updateChildren'
    },
    size: {
      type: Number,
      value: 32,
      observer: 'updateChildren'
    },
    options: {
      type: Array,
      value: []
    },
    max: {
      type: Number,
      value: Infinity,
      observer: 'updateChildren'
    },
    extStyle: String,
    animation: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    attached() {
      this.updateChildren();
    }
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child?.updateDataFromParent();
      });
    },
    observeValue(newVal: string[]) {
      const { max } = this.data;

      if ((max || Infinity) < newVal.length) {
        this.triggerEvent('handleMax');
        return;
      }
      this.updateChildren();
    }
  }
});
