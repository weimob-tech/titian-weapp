import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

export type RowProps = {
  /**
   * 栅格间隔
   *
   * @type number
   * @default 0
   * @example
   * <ti-row gutter="{{ 16 }}">
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   * </ti-row>
   * @since 0.1.0
   * @memberof RowProps
   */
  gutter?: PropertyToData<NumberConstructor>;

  /**
   * flex 布局属性
   *
   * @type boolean
   * @default true
   * @example
   * <ti-row flex>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   * </ti-row>
   * @since 0.1.0
   * @memberof RowProps
   */
  flex?: PropertyToData<BooleanConstructor>;
};

BasicComponent<Record<string, never>, RowProps>({
  properties: {
    // 列元素之间的间距
    gutter: {
      type: Number,
      value: 0,
      observer: 'setGutter'
    },

    // 是否启用flex布局，默认为true
    flex: {
      type: Boolean,
      value: true
    }
  },

  children: 'col',
  relationAction(target: WechatMiniprogram.Component.TrivialInstance) {
    const { gutter, flex } = this.data;
    if (gutter) {
      target.setData({ gutter, flex });
    }
  },

  methods: {
    setGutter() {
      const { gutter, flex } = this.data;
      (this.children || []).forEach((node) => {
        node.setData({ gutter, flex });
      });
    }
  }
});
