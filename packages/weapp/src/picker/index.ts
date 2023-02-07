import BasicComponent from '../common/basic/BasicComponent';
import { PickerColumn } from './const';
import Picker from './picker';

const VISIBLEITEMCOUNT = 3;
BasicComponent<
  {
    list: PickerColumn[];
    height: number;
    top: number;
    colsIndex: number[];
    curLoading: boolean;
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption,
  {
    helper: Picker;
    value: unknown[];
    status: string;
  }
>({
  children: 'picker-column',
  relationAction() {
    this.helper.isCustomColAlias = true;
  },
  properties: {
    options: null,
    value: null,

    /** 行别名  */
    rowAlias: null,

    /** 动画 */
    sports: Boolean,

    /**
     * 是否使用下标 true:使用，false:不使用
     * 如果使用下标 则无论列表(columns)如何变化,选中项始终跟随 下标
     * 如果不使用下标 则列表(columns)变化时,选中项始终与列表中对应值保持一致
     */
    useRowIndex: Boolean,
    label: {
      type: String,
      value: 'label'
    },
    visibleItemCount: Number,
    loading: Boolean,
    optionItemHeight: {
      type: Number,
      optionalTypes: [String],
      value: 108
    },
    titlebar: {
      type: Boolean,
      value: true
    },
    title: { type: String, value: '标题' },
    subTitle: String,
    confirmText: { type: String, value: '确定' },
    cancelText: { type: String, value: '取消' },
    extStyle: String,
    extOptionStyle: String,
    cascade: {
      type: String,
      value: 'children'
    }
  },
  externalClasses: ['ext-hairline-class', 'ext-mask-class', 'ext-option-class', 'ext-option-item-class'],
  data: {
    list: [],
    colsIndex: [],
    top: 0,
    height: 0,
    curLoading: true
  },
  lifetimes: {
    created() {
      this.status = 'created';
      this.helper = new Picker<typeof this.data.cascade>();
      this.pixelRatio = wx.getSystemInfoSync().windowWidth / 750; // 推荐
    },
    attached() {
      const { optionItemHeight, visibleItemCount } = this.data;
      let height = 0;
      if (typeof optionItemHeight === 'string') {
        if (optionItemHeight.indexOf('rpx') !== -1) {
          height = Math.round(Number.parseInt(optionItemHeight, 10) * this.pixelRatio);
        } else if (optionItemHeight.indexOf('px') !== -1) {
          height = Number.parseInt(optionItemHeight, 10);
        } else {
          height = 54;
        }
      } else if (typeof optionItemHeight === 'number') {
        height = Math.round(optionItemHeight * this.pixelRatio);
      } else {
        height = 54;
      }

      if (visibleItemCount !== 0) {
        this.height = Number.parseInt(height as unknown as string, 10);
        this.top = Math.round((height * visibleItemCount - height) / 2);
        this.updateDistance();
      } else {
        wx.createSelectorQuery()
          .in(this)
          .select('.titian-picker-content')
          .boundingClientRect((rect) => {
            if (rect) {
              if (rect.height === 0) {
                this.height = Number.parseInt(height as unknown as string, 10);
                this.top = Math.round((height * VISIBLEITEMCOUNT - height) / 2);
                this.updateDistance(VISIBLEITEMCOUNT);
                return;
              }
              this.height = Number.parseInt(height as unknown as string, 10);
              this.top = Math.round((rect.height - height) / 2);
              this.updateDistance();
            }
          })
          .exec();
      }
    },
    ready() {
      this.status = 'ready';
      const { options, value, cascade } = this.data;

      if (!options || !this.helper) return;
      if (this.helper.value !== value || this.options !== options || this.cascade !== cascade) {
        this.options = options;
        this.helper.value = value;
        const { rowAlias, useRowIndex } = this.data;
        this.setData(
          this.helper.changeProps({
            options,
            value,
            rowAlias,
            useRowIndex,
            cascade
          }),
          () => {
            this.triggerEvent('change', this.helper.data);
          }
        );
      }
    }
  },
  observers: {
    // eslint-disable-next-line func-names
    'options,value,cascade': function (options, value, cascade) {
      if (!options || this.status !== 'ready') return;
      if (this.helper.value !== value || this.options !== options || this.cascade !== cascade) {
        this.options = options;
        this.helper.value = value;
        const { rowAlias, useRowIndex } = this.data;
        this.setData(
          this.helper.changeProps({
            options,
            value,
            rowAlias,
            useRowIndex,
            cascade
          }),
          () => {
            this.triggerEvent('change', this.helper.data);
          }
        );
      }
    }
  },
  methods: {
    onSelect(e: WechatMiniprogram.TouchEvent) {
      const { colIndex } = e.target.dataset;
      const { rowIndex, colAlias } = e.detail;
      const { list, rowAlias } = this.data;
      const update = this.helper.update(rowIndex, list[colIndex]);
      this.setData(update, () => {
        this.triggerEvent('change', {
          ...this.helper.data,
          colIndex,
          colAlias,
          rowIndex,
          rowAlias
        });
      });
    },
    updateColumn(
      colAlias: string | number,
      value: {
        value: unknown;
        options: unknown;
        rowIndex: unknown;
        colIndex?: number;
        rowAlias: unknown;
      },
      inSelect = false
    ) {
      this.helper.columnMap.set(colAlias, {
        value: value.value,
        options: value.options
      });
      [...this.helper.columnMap.keys()].forEach((key) => {
        if (!this.children?.some((pickerColumnElement) => pickerColumnElement.data.colAlias === key)) {
          this.helper.columnMap.delete(key);
        }
      });
      this.triggerEvent(
        'change',
        inSelect
          ? {
              ...this.helper.data,
              rowIndex: value.rowIndex,
              colAlias,
              colIndex: value.colIndex,
              rowAlias: value.rowAlias
            }
          : this.helper.data
      );
    },
    onReachTop(e: WechatMiniprogram.TouchEvent) {
      const { rowIndex, colAlias } = e.detail;
      const { colIndex } = e.target.dataset;
      this.triggerEvent('reachTop', {
        ...this.helper.data,
        rowIndex,
        colAlias,
        colIndex
      });
    },
    onReachBottom(e: WechatMiniprogram.TouchEvent) {
      const { rowIndex, colAlias } = e.detail;
      const { colIndex } = e.target.dataset;
      this.triggerEvent('reachBottom', {
        ...this.helper.data,
        rowIndex,
        colAlias,
        colIndex
      });
    },
    onCancel() {
      this.triggerEvent('cancel', this.helper.data);
    },
    onConfirm() {
      this.triggerEvent('confirm', this.helper.data);
    },
    updateDistance(visibleItemCount: number | undefined) {
      const update: {
        curLoading: boolean;
        height: number;
        top: number;
        visibleItemCount?: number;
      } = {
        curLoading: false,
        height: this.height,
        top: this.top
      };
      if (typeof visibleItemCount !== 'undefined') {
        update.visibleItemCount = visibleItemCount;
      }
      this.setData(update);
      this.children?.forEach((child) => {
        child.calcDistance({ columns: child.columns, value: child.val });
      });
    }
  }
});
