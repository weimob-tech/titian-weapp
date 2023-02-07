import BasicComponent from '../common/basic/BasicComponent';
import { isDisabled } from '../common/utils/index';

/**
 * picker-column 组合使用
 * this.val 承接外部value,同时与内部运动结果统一
 * this.insideVal 实时与内部运动结果统一
 */

BasicComponent({
  parent: 'picker',
  relationAction() {
    this.relationAction();
  },
  properties: {
    colAlias: {
      type: null,
      optionalTypes: [Number, String]
    },

    rowAlias: null,

    // 父子组合场景下使用
    value: null,

    // 父子组合场景下使用
    columns: Array,
    height: Number,
    sports: Boolean,
    row: Number,
    label: String,

    useSelectSlot: Boolean,

    /**
     * 是否使用下标 true:使用，false:不使用
     * 如果使用下标 则无论列表(columns)如何变化,选中项始终跟随 下标
     * 如果不使用下标 则列表(columns)变化时,选中项始终与列表中对应值保持一致
     */
    useRowIndex: Boolean,
    top: {
      type: Number,
      value: 108
    },
    y: Number,
    extStyle: String
  },
  externalClasses: ['ext-option-item-class'],
  lifetimes: {
    created() {
      this.init = false;
    }
  },
  observers: {
    value(outsidevalue) {
      if (this.val !== outsidevalue) {
        this.val = outsidevalue;
      }
    },
    columns(columns) {
      if (this.columns !== columns) {
        this.columns = columns;
      }
    },
    // eslint-disable-next-line func-names
    'value,columns': function (outsidevalue, columns) {
      if (this.insideVal !== outsidevalue || this.observerColumns !== columns) {
        this.observerColumns = columns;
        this.calcDistance({ value: this.val, columns: this.columns });
      }
    }
  },
  methods: {
    relationAction() {
      if (this.parent && !this.init) {
        this.init = true;
        if (!this.parent.height) {
          return;
        }
        this.val = this.data.value;
        this.insideVal = this.data.value;
        this.calcDistance({ value: this.val, columns: this.columns || [] });
      }
    },
    calcDistance({ columns, value }: { columns: unknown[]; value: unknown }) {
      if (!this.parent) {
        return;
      }
      const { top, height } = this.parent;
      const { rowAlias, colAlias, useRowIndex } = this.data;
      if (!colAlias) {
        throw new Error('colAlias is required');
      }
      let row = 0;
      if (rowAlias === null) {
        if (useRowIndex) {
          row = columns.findIndex((item, idx) => idx === value && !isDisabled(item));
        } else {
          row = columns.findIndex((item) => item === value && !isDisabled(item));
        }
      } else {
        row = columns.findIndex(
          (item) => (item as { [key: string]: unknown })[rowAlias] === value && !isDisabled(item)
        );
      }
      if (row === -1) {
        row = columns.findIndex((item) => !isDisabled(item));
      }
      let resetValue = value;
      if (rowAlias === null) {
        if (useRowIndex) {
          resetValue = row;
        } else {
          resetValue = columns[row];
        }
      } else {
        resetValue = (columns[row] as { [key: string]: unknown })[rowAlias];
      }
      this.parent.updateColumn(colAlias, {
        value: resetValue,
        options: columns[row]
      });
      this.val = resetValue;
      this.insideVal = resetValue;
      this.setData({ top, height, row, y: row * height * -1 });
    },
    onSelect({ rowIndex, colAlias }: { rowIndex: number; colAlias: string | number }) {
      if (!this.parent) {
        this.triggerEvent('select', { rowIndex, colAlias });
        return;
      }
      const { rowAlias, height, useRowIndex, columns } = this.data;
      if (rowAlias === null) {
        if (useRowIndex) {
          this.val = rowIndex;
        } else {
          this.val = columns[rowIndex];
        }
      } else {
        this.val = columns[rowIndex][rowAlias];
      }
      this.insideVal = this.val;
      const index = this.parent?.children.indexOf(this);

      this.setData({ row: rowIndex, y: rowIndex * height * -1 }, () => {
        this.parent?.updateColumn(
          colAlias,
          {
            value: this.val,
            options: columns[rowIndex],
            colIndex: index,
            rowAlias,
            rowIndex
          },
          true
        );
      });
    },

    /**
     * picker-column 组合使用
     * 在wxs中调用
     */
    synchronous({
      isTop,
      isBottom,
      rowIndex,
      colAlias
    }: {
      isTop?: boolean;
      isBottom?: boolean;
      rowIndex: number;
      colAlias: string | number;
    }) {
      if (!this.parent) {
        if (isTop) {
          this.triggerEvent('reachTop', { rowIndex, colAlias });
          return;
        }
        if (isBottom) {
          this.triggerEvent('reachBottom', { rowIndex, colAlias });
          return;
        }
        return;
      }
      const index = this.parent.children.indexOf(this);
      if (isTop) {
        this.parent.onReachTop({
          detail: { rowIndex, colAlias },
          target: { dataset: { colIndex: index } }
        });
      }
      if (isBottom) {
        this.parent.onReachBottom({
          detail: { rowIndex, colAlias },
          target: { dataset: { colIndex: index } }
        });
      }
    }
  }
});
