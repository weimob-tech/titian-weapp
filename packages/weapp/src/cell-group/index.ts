import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

export type CellGroupProps = {
  /**
   * 单元格组标题
   *
   * @type string
   * @default ''
   * @example
   * <ti-cell title="单元格组标题" />
   * @since 0.1.0
   * @memberof CellProps
   * */
  title?: PropertyToData<StringConstructor>;

  /**
   * 单元格组标题
   *
   * @type string
   * @default ''
   * @example
   * <ti-cell title="单元格组标题" />
   * @since 0.1.0
   * @memberof CellProps
   * */
  subTitle?: PropertyToData<StringConstructor>;

  /**
   * 单元格组标题
   *
   * @type string
   * @default default
   * @enum default, card
   * @example
   * <ti-cell-group title="单元格组标题" />
   * @since 0.1.0
   * @memberof CellProps
   * */
  mode?: PropertyToData<StringConstructor>;
};

BasicComponent<Record<string, never>, CellGroupProps, Record<string, never>>({
  externalClasses: ['title-wrap-class', 'title-class', 'sub-title-class'],
  properties: {
    title: String,

    subTitle: String,

    mode: {
      type: String,
      value: 'default'
    }
  }
});
