import { PropertyToData } from '../common/interface';
export type RadioProps = {
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
};
