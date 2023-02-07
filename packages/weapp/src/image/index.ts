import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  properties: {
    // 图片资源地址
    src: {
      type: String,
      observer(val, oldVal) {
        if (val !== oldVal) {
          this.setData({ loading: true, isError: false });
        }
      }
    },

    // 图片填充模式, 同微信原生组件 image 的 mode
    mode: {
      type: String,
      value: 'scaleToFill'
    },

    // 宽度，默认单位为 rpx
    width: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },

    // 高度，默认单位为 rpx
    height: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },

    // 圆角，默认单位为 rpx
    radius: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },

    // 是否展示图片加载中提示
    showLoading: {
      type: Boolean,
      value: true
    },

    // 是否展示图片加载失败提示
    showError: {
      type: Boolean,
      value: true
    },

    // 加载中显示的图标
    loadingIcon: {
      type: String,
      value: 'default-pic'
    },

    // 加载失败显示的图标
    errorIcon: {
      type: String,
      value: 'default-pic'
    },

    // 加载中显示的图标，尺寸
    loadingIconSize: {
      type: Number,
      value: 72
    },

    // 加载失败显示的图标，尺寸
    errorIconSize: {
      type: Number,
      value: 72
    },

    // 使用 loading 插槽
    useLoadingSlot: Boolean,

    // 使用 error 插槽
    useErrorSlot: Boolean,

    // 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载
    lazyLoad: Boolean,

    // 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单。
    showMenuByLongpress: Boolean,

    // 根节点样式
    extStyle: String,

    // 是否跟随全局圆角风格
    useGlobalStyle: Boolean,

    aspectRatio: {
      type: Number,
      optionalTypes: [String],
      value: -1
    }
  },
  data: {
    fit: '',
    loading: true,
    isError: false,
    computedScaleDown: true,
    scaleDown: ''
  },
  observers: {
    mode(value) {
      const dataGroup: { fit?: string; computedScaleDown?: boolean } = {};
      if (value) {
        dataGroup.fit = value;
      }
      if (value === 'scaleDown') {
        if (this.data.scaleDown) {
          dataGroup.fit = this.data.scaleDown;
        } else {
          dataGroup.computedScaleDown = false;
        }
      }
      this.setData(dataGroup);
    }
  },
  lifetimes: {
    attached() {}
  },
  methods: {
    onLoad(event: WechatMiniprogram.ImageLoad) {
      this.setData({ loading: false });
      // 当图片载入完毕时触发，event.detail = {height, width}
      this.triggerEvent('load', event.detail);
      const { width, height } = event.detail; // 单位px
      this.setScaleDownMode(width, height);
    },
    onError(event: WechatMiniprogram.ImageError) {
      this.setData({ loading: false, isError: true });
      // 当错误发生时触发，event.detail = {errMsg}
      this.triggerEvent('error', event.detail);
    },
    setScaleDownMode(width: number, height: number) {
      wx.createSelectorQuery()
        .in(this)
        .select('.titian-image-target')
        .boundingClientRect((res) => {
          let fit;
          if (width > res.width || height > res.height) {
            fit = 'contain';
          } else {
            fit = 'none';
          }
          this.setData({ scaleDown: fit, computedScaleDown: true });
          if (this.data.mode === 'scaleDown') {
            this.setData({ fit });
          }
        })
        .exec();
    }
  }
});
