import BasicComponent from '../common/basic/BasicComponent';
import { isBoolean, nextTick } from '../common/utils/index';

enum CollapseItemStateEnum {
  /** 折叠 */
  'FOLD' = 'fold',

  /** 展开 */
  'UN_FOLD' = 'un_fold'
}

BasicComponent({
  parent: 'collapse',
  relationAction() {
    this.updateDataFromParent();
  },
  properties: {
    value: null,
    title: String,

    // 标题下面的内容
    label: String,

    // 右侧显示内容
    desc: String,

    // 左侧图标
    icon: String,

    // 右侧图标
    rightIcon: String,

    // 是否禁用单元格
    disabled: Boolean,

    divider: null,
    clickable: {
      type: Boolean,
      value: false
    },

    useRightIconSlot: Boolean,
    extStyle: String,
    useCellSlot: Boolean
  },
  data: {
    index: -1,
    dilation: false,
    status: CollapseItemStateEnum.FOLD,
    height: '0',
    isReady: false
  },
  lifetimes: {
    created() {
      this.collapseAnimation = wx.createAnimation({
        timingFunction: 'ease-in-out'
      });
    },
    attached() {
      this.updateDataFromParent();
    }
  },
  methods: {
    updateDataFromParent() {
      if (!this.parent) {
        return;
      }
      const { parent } = this;
      const index: number = parent.children.indexOf(this); // 当前索引
      // 互斥模式 value 是值，不是互斥模式，value 是数组
      const status = this.getStatus();
      const icon = parent.data.icon || this.data.icon;
      const rightIcon = parent.data.rightIcon || this.data.rightIcon;
      const disabled = parent.data.disabled || this.data.disabled;
      const clickable = parent.data.clickable || this.data.clickable;

      const parentDivider = isBoolean(parent.data.divider);
      const childDivider = isBoolean(this.data.divider);
      let divider = true;
      if (childDivider) {
        divider = this.data.divider;
      } else if (parentDivider) {
        divider = parent.data.divider;
      }
      const state = { icon, rightIcon, disabled, clickable, divider };

      if (status !== this.data.status) {
        nextTick(() => {
          wx.createSelectorQuery()
            .in(this)
            .select('.titian-collapse-item-box')
            .boundingClientRect((rect) => {
              if (rect) {
                const animation = this.collapseAnimation.height(rect.height);
                if (status === CollapseItemStateEnum.UN_FOLD) {
                  animation.left(1).step({ duration: 300 }).height('auto').step();
                } else {
                  animation.left(0).step({ duration: 1 }).height(0).step({ duration: 300 });
                }
                this.setData({
                  ...state,
                  index,
                  status,
                  isReady: true,
                  animation: this.collapseAnimation.export()
                });
              }
            })
            .exec();
        });
      } else {
        this.setData({ ...state, index, status, isReady: true });
      }
    },
    onClick() {
      const { value, status, disabled } = this.data;
      if (disabled) {
        return;
      }
      const { parent } = this;
      if (!parent) {
        return;
      }
      const index = parent.children.indexOf(this);
      const currentName = value == null ? index : value;
      parent.switch(currentName, status === CollapseItemStateEnum.FOLD);
    },
    getStatus(): CollapseItemStateEnum {
      if (!this.parent) {
        throw new Error('parent is null');
      }
      const { parent } = this;

      const { repel } = parent.data;
      const { selectValue, children } = parent;
      const { value } = this.data; // 当前名称
      const index: number = children.indexOf(this); // 当前索引
      const currentName = value == null ? index : value; // 若有名称使用名称，没有名称，使用索引
      if (repel) {
        return selectValue === currentName ? CollapseItemStateEnum.UN_FOLD : CollapseItemStateEnum.FOLD;
      }
      return (selectValue || []).some((val: string | number) => val === currentName)
        ? CollapseItemStateEnum.UN_FOLD
        : CollapseItemStateEnum.FOLD;
    }
  },
  externalClasses: ['ext-content-class']
});
