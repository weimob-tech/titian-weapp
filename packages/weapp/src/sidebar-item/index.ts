import BasicComponent from '../common/basic/BasicComponent';

BasicComponent<
  {
    active: boolean;
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>({
  parent: 'sidebar',
  properties: {
    // 每项内容
    label: String,

    // 是否禁用
    disabled: Boolean,

    // 徽标内容
    badge: String,

    // 是否为圆点徽标
    dot: Boolean
  },
  data: {
    active: false
  },
  observers: {},
  lifetimes: {
    ready() {
      const { parent } = this;
      if (parent) {
        const index = parent.children.indexOf(this);
        this.setData({ active: index === parent.data.activeIndex });
      }
    }
  },
  methods: {
    onClick() {
      if (this.data.disabled) return;
      const { parent } = this;
      if (parent) {
        const index = parent.children.indexOf(this);
        parent.setActive(index);
        this.triggerEvent('click', index);
      }
    },
    toggle(active: boolean) {
      this.setData({ active });
    }
  }
});
