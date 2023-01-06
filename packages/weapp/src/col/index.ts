import BasicComponent from '../common/basic/BasicComponent';
import { PropertyToData } from '../common/interface';

export type ColProps = {
  /**
   * 栅格占位格数，为 0 时相当于 display: none
   *
   * @type number
   * @default 0
   * @example
   * <ti-col span={2} />
   * @since 0.1.0
   * @memberof ColProps
   * */
  span?: PropertyToData<NumberConstructor>;

  /**
   * 栅格左侧的偏移格数
   *
   * @type number
   * @default 0
   * @example
   * <ti-col span={2} offset={1} />
   * @since 0.1.0
   * @memberof ColProps
   * */
  offset?: PropertyToData<NumberConstructor>;
};

type ColData = {
  /**
   * 栅格间隔
   *
   * @type number
   * @default 0
   * @example
   * <ti-col span={2} gutter={16} />
   * @since 0.1.0
   * @memberof ColProps
   * */
  gutter?: number;
};

BasicComponent<ColData, ColProps>({
  properties: {
    span: {
      type: Number,
      value: 0
    },

    offset: {
      type: Number,
      value: 0
    }
  },
  data: {
    gutter: 0
  },
  parent: 'row'
});
