/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
import BasicComponent from '../common/basic/BasicComponent';

BasicComponent<
  {
    subBgColor: string;
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>({
  properties: {
    // 是否显示动作面板
    visible: Boolean,

    // 标题
    title: String,

    // 菜单选项
    actions: {
      type: Array,
      value: []
    },

    // 按钮
    cancelText: String,

    // 指定按钮按下去的样式类
    hoverClass: {
      type: String,
      value: 'active'
    },
    alias: {
      type: Object,
      value: {}
    }
  },
  data: {
    subBgColor: ''
  },
  observers: {},
  methods: {
    onSelect(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;
      const { actions } = this.data;
      const action = actions[index];
      if (action[this.data.alias.disabled || 'disabled'] || action[this.data.alias.loading || 'loading']) return;
      // 选中选项时触发，禁用或加载状态下不会触发
      this.triggerEvent('select', action);
    },
    onCancel() {
      this.setData({
        visible: false
      });
      // 取消按钮点击时触发
      this.triggerEvent('cancel');
    },
    onClose() {
      this.setData({
        visible: false
      });
      // 取消按钮点击时触发
      this.triggerEvent('close');
    }
  }
});
