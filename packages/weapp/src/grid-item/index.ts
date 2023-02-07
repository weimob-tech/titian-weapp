import link from '../behaviors/link';
import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

export type GridItemProps = {
  /**
   * 图标
   *
   * @type string
   * @default ''
   * @example
   * <ti-grid-item icon="home" text="Grid" />
   * @since 0.1.0
   * @memberof GridItemProps
   */
  icon?: PropertyToData<StringConstructor>;

  /**
   * 文字内容
   *
   * @type string
   * @default ''
   * @example
   * <ti-grid-item icon="home" text="Grid" />
   * @since 0.1.0
   * @memberof GridItemProps
   */
  text?: PropertyToData<StringConstructor>;

  /**
   * 文字颜色
   *
   * @type string
   * @default ''
   * @example
   * <ti-grid-item icon="home" text="Grid" color="red" />
   * @since 0.1.0
   * @memberof GridItemProps
   */
  color?: PropertyToData<StringConstructor>;

  /**
   * 图标尺寸
   *
   * @type number
   * @default ''
   * @example
   * <ti-grid-item icon="home" text="Grid" size={{32}} />
   * @since 0.1.0
   * @memberof GridItemProps
   */
  size?: PropertyToData<NumberConstructor>;

  /**
   * 是否自定义内容
   *
   * @type boolean
   * @default false
   * @example
   * <ti-grid-item custom-content />
   * @since 0.1.0
   * @memberof GridItemProps
   */
  customContent?: PropertyToData<BooleanConstructor>;
};

type GridItemData = {
  direction: string;
  border: boolean;
  columns: number;
  square: boolean;
  gutter: number;
};

type GridItemMethods = {
  jumpLink?: () => void;
  onClick: (event: WechatMiniprogram.TouchEvent) => void;
};

BasicComponent<GridItemData, GridItemProps, GridItemMethods>({
  // 可扩展的 class
  externalClasses: ['text-class', 'content-class'],
  behaviors: [link],
  parent: 'grid',
  properties: {
    icon: String,
    size: Number,
    color: String,
    text: String,
    customContent: {
      type: Boolean,
      value: false
    }
  },
  data: {
    direction: 'column',
    square: false,
    border: true,
    columns: 4,
    gutter: 0
  },
  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      this.triggerEvent('click', event);
      if (this.jumpLink) {
        this.jumpLink();
      }
    }
  }
});
