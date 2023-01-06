import BasicComponent from '../common/basic/BasicComponent';
import { getSystemInfoSync, nextTick } from '../common/utils/index';

const instanceCache: Set<WechatMiniprogram.Component.TrivialInstance> = new Set();

BasicComponent({
  externalClasses: ['item-class'],
  parent: 'dropdown-menu',
  relationAction() {
    this.getParentRect();
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: 'visibleChange'
    },
    title: String,
    mode: {
      type: String,
      value: 'single' // single, multiple
    },
    icon: {
      type: String,
      value: 'selected'
    },
    options: {
      type: Array,
      value: []
    },
    disabled: Boolean,
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'checkbox' // switch, checkbox
    },

    hasMask: {
      type: Boolean,
      value: true
    },
    closeOnMask: {
      type: Boolean,
      value: true
    },
    activeColor: String,
    hasSubmit: Boolean,
    submitText: {
      type: String,
      value: '确定'
    },
    direction: {
      type: String,
      value: 'down' // up, down
    }
  },
  data: {
    maskStyle: '',
    titleFromProp: '',
    show: false,
    timeout: { appear: 300, exit: 200 }
  },
  lifetimes: {
    created() {
      this.windowHeight = getSystemInfoSync()?.windowHeight || 0;
      instanceCache.add(this);
    },
    attached() {
      this.setData({
        titleFromProp: this.data.title
      });
    },
    detached() {
      instanceCache.delete(this);
    }
  },
  methods: {
    toggle() {
      if (this.parent) {
        this.parent.onChildToggle(this);
      }
    },
    onSubmit() {
      const { mode, value, visible } = this.data;

      if (!visible) return;

      this.triggerEvent('submit', {
        value: mode === 'multiple' ? value.split(',') : value
      });
      this.onClose();
    },

    onCellTap(event: WechatMiniprogram.TouchEvent) {
      const { item } = event.currentTarget.dataset;
      const { value, mode, hasSubmit, titleFromProp } = this.data;

      if (mode === 'multiple') {
        let values = value.split(',').filter(Boolean);

        if (values.includes(item.value)) {
          values = values.filter((v) => v !== item.value);
        } else {
          values.push(item.value);
        }

        this.setData({ title: titleFromProp, value: values.join(',') });
      } else {
        const newData = { value: item.value, title: item.title };
        if (this.data.value === item.value) {
          newData.value = '';
          newData.title = this.data.titleFromProp;
        }
        this.setData(newData);
      }

      // 改变时触发
      this.triggerEvent('change', {
        value: mode === 'multiple' ? this.data.value.split(',') : this.data.value
      });

      if (hasSubmit || mode === 'multiple') {
        return;
      }

      this.onClose();
    },

    onPopupClose() {
      const { mode, hasSubmit } = this.data;
      if (hasSubmit || mode === 'multiple') {
        return;
      }
      this.onClose();
    },

    onClose() {
      this.setData({ visible: false });

      nextTick(() => {
        this.parent?.getChildrenData();
      });
    },

    visibleChange(visible: boolean, oldVisible: boolean) {
      if (visible === oldVisible) {
        return;
      }
      const instance = this.parent || this;
      if (visible) {
        this.triggerEvent('open');
      } else {
        this.triggerEvent('close'); // 关闭时触发
      }
      if (instance && instance.handleItemToggle) {
        instance.handleItemToggle(visible, this);
      }
    },

    closeOtherItems(item: WechatMiniprogram.Component.TrivialInstance) {
      let isClosing = false;
      instanceCache.forEach((instance) => {
        if (instance !== item) {
          if (instance.data.visible) {
            instance.onClose();
            isClosing = true;
          }
        }
      });
      return isClosing;
    },

    getParentRect() {
      this.parent?.getMenuRect().then((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
        const { direction } = this.data;

        let bottom = this.windowHeight - rect.top;
        let top = rect.bottom || 0;
        const { getPosition } = this.parent?.data || {};
        if (typeof getPosition === 'function') {
          const customStyle = getPosition({ rect, direction: this.direction, position: { bottom, top } }) || {};
          if (customStyle.bottom !== undefined) {
            bottom = customStyle.bottom;
          }
          if (customStyle.top !== undefined) {
            top = customStyle.top;
          }
        }
        this.setData({
          maskStyle: direction === 'up' ? `bottom: ${bottom}px` : `top: ${top}px`
        });
      });
    },
    onEnter() {
      this.parent?.setData({
        isMoving: true
      });
      this.setData({
        show: true
      });
    },
    onEntered() {
      this.parent?.setData({
        isMoving: false
      });
    },
    onExit() {
      this.parent?.setData({
        isMoving: true
      });
    },
    onExited() {
      this.parent?.setData({
        isMoving: false
      });
      this.setData({
        show: false
      });
    }
  }
});
