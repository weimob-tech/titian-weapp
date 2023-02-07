/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicComponent from '../common/basic/BasicComponent';
import { getRect, nextTick } from '../common/utils/index';

export type Child = {
  title?: string;
  visible?: boolean;
  disabled?: boolean;
  hasChoose?: boolean;
  direction?: string;
  activeColor?: string;
};

type Data = {
  childrenData: Child[];
  hasChoose: boolean;
  isMoving: boolean;
};

BasicComponent<Data>({
  externalClasses: ['title-class'],
  children: 'dropdown-item',
  relationAction() {
    this.updateChildrenData();
  },
  properties: {
    hasMask: {
      type: Boolean,
      value: true
    },
    closeOnMask: {
      type: Boolean,
      value: true
    },
    disabled: {
      type: null,
      observer: 'updateChildrenData'
    },
    icon: String,
    type: {
      type: null,
      observer: 'updateChildrenData'
    },
    mode: {
      type: String,
      observer: 'updateChildrenData'
    },
    activeColor: {
      type: String,
      observer: 'updateChildrenData'
    },
    direction: {
      type: String,
      observer: 'updateChildrenData'
    },
    getPosition: null
  },
  data: {
    childrenData: [],
    hasChoose: false,
    isMoving: false
  },
  lifetimes: {
    attached() {
      this.getMenuRect();
    }
  },
  methods: {
    updateChildrenData() {
      const { type, icon, disabled, mode, activeColor, direction, hasMask, closeOnMask } = this.data;
      this.children?.forEach((child: WechatMiniprogram.Component.TrivialInstance) => {
        const newData: any = {};

        if (icon) {
          newData.icon = icon;
        }
        newData.type = type !== null ? type : child?.data?.type;

        newData.disabled = disabled !== null ? disabled : child?.data?.disabled;

        if (mode) {
          newData.mode = mode;
        }

        if (direction) {
          newData.direction = direction;
        }

        if (activeColor) {
          newData.activeColor = activeColor;
        }

        if (!hasMask) {
          newData.hasMask = hasMask;
        }

        if (closeOnMask) {
          newData.closeOnMask = closeOnMask;
        }

        child?.setData(newData);
      });
      this.getChildrenData();
    },

    onChildToggle(child: WechatMiniprogram.Component.TrivialInstance) {
      const index = (this.children || []).findIndex((i) => i === child);
      this.onTitleToggle(undefined, index);
    },

    onTitleToggle(event: WechatMiniprogram.TouchEvent, index = 0) {
      index = event?.currentTarget?.dataset?.idx || index;
      const child = (this.children || [])[index];
      this.count = this.count || 0;
      if (child && child.closeOtherItems) {
        if (this.data.isMoving && this.count <= 15) {
          setTimeout(() => {
            this.count += 1;
            this.onTitleToggle(event, index);
          }, 1000 / 30);
          return;
        }
        this.data.isMoving = false;
        nextTick(() => {
          const isClosing = child.closeOtherItems(child);
          if (isClosing) {
            this.onTitleToggle(event, index);
            return;
          }
          this.count = 0;
          const { visible } = child.data;
          child.getParentRect();
          child.setData({ visible: !visible });
          this.getChildrenData();
        });
      }
    },

    getChildrenData() {
      const data = (this.children || []).map((child) => ({
        title: child.data.title,
        visible: child.data.visible,
        direction: child.data.direction,
        hasChoose: child.data.value !== '',
        disabled: child.data.disabled,
        activeColor: child.data.activeColor
      }));

      this.setData({
        childrenData: data
      });
    },

    handleItemToggle(visible: boolean, instance: WechatMiniprogram.Component.TrivialInstance) {
      const index = this.children?.indexOf(instance);
      if (!visible) {
        this.setData({
          [`childrenData[${index}].hasChoose`]: instance.data.value !== ''
        });
      }
      const selector = `.titian-dropdown-menu-title-${index} .titian-dropdown-menu-icon`;
      if (!this.animate) {
        return;
      }
      this.animate(
        selector,
        [
          {
            rotate: visible ? 0 : 180,
            ease: 'cubic-bezier(0.48, 0.33, 0.24, 0.95)'
          },
          {
            rotate: visible ? 180 : 360,
            ease: 'cubic-bezier(0.48, 0.33, 0.24, 0.95)'
          }
        ],
        300,
        () => {
          if (!visible) {
            this.clearAnimation(selector);
          }
        }
      );
    },

    getMenuRect() {
      return getRect(this, '.titian-dropdown-menu-title-wrap').then((rect) => rect);
    }
  }
});
