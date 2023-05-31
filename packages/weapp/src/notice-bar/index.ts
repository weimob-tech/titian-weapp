import BasicComponent from '../common/basic/BasicComponent';
import { getRect, getFieldStyle } from '../common/utils/index';

const NOTICE_TARGET = '.titian-notice-bar-content';

BasicComponent<
  {
    // bgColor: string;
    // height: string;
    // text: string;
    // list: string[];
    // show: boolean;
    // animationData: WechatMiniprogram.Animation;
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>({
  options: {
    multipleSlots: true
  },
  properties: {
    // 颜色
    color: String,

    // 左侧图标
    leftIcon: {
      type: String,
      value: 'speaker'
    },

    // 右侧图标
    rightIcon: {
      type: String,
      value: 'arrow-right'
    },

    // 通知文本内容
    content: {
      type: String,
      optionalTypes: [Array],
      value: ''
    },

    // 滚动速率 (px/s)
    speed: {
      type: Number,
      value: 50
    },

    // 滚动方式，可选值`horizontal` `vertical`
    variant: {
      type: String,
      value: 'horizontal'
    },

    // 是否开启滚动播放，内容长度溢出时默认开启
    scrollable: {
      type: String,
      optionalTypes: [Boolean],
      value: ''
    },

    // 根节点样式
    extStyle: String,

    // 文字溢出，取值 'auto' 'wrap' 'ellipsis' 'clip'
    textMode: {
      type: String,
      value: 'auto'
    }
  },
  data: {
    bgColor: '',
    height: '',
    text: '',
    list: [],
    show: true,
    animationData: wx.createAnimation({}),
    timer: null
  },
  observers: {
    'scrollable, variant': function fn(scrollable) {
      if (this.data.textMode === 'wrap' && scrollable !== false) {
        scrollable = false;
      }
      if (scrollable === false) {
        // #ifdef MP-WEIXIN
        this.clearAnimation(NOTICE_TARGET);
        // #endif
        // #ifndef MP-WEIXIN
        this.clearTimer();
        // #endif
      } else {
        // #ifdef MP-WEIXIN
        this.clearAnimation(NOTICE_TARGET, () => {
          this.initAnimation();
        });
        // #endif
        // #ifndef MP-WEIXIN
        this.clearTimer();
        this.initAnimation();
        // #endif
      }
    },
    color() {
      this.setBgColor();
    },
    textMode(textMode) {
      if (textMode === 'wrap') {
        this.setData({ scrollable: false });
      }
    }
  },
  lifetimes: {
    attached() {
      if (Array.isArray(this.data.content)) {
        this.setData({ text: this.data.content.join(' ') });
        this.setData({ list: this.data.content });
      } else {
        this.setData({ text: this.data.content });
        this.setData({ list: [this.data.content] });
      }
      this.initAnimation();
    },
    detached() {
      // #ifdef MP-WEIXIN
      this.clearAnimation(NOTICE_TARGET);
      // #endif
      // #ifndef MP-WEIXIN
      this.clearTimer();
      // #endif
    }
  },
  methods: {
    setBgColor() {
      getFieldStyle(this, '.titian-notice-bar', ['color', 'width', 'height']).then((res) => {
        const [r, g, b] = res.rgbColor;
        this.setData({
          bgColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
          height: res.height
        });
      });
    },
    initAnimation() {
      if (this.data.variant === 'horizontal') {
        this.initHorizontalAnimation();
      } else if (this.data.variant === 'vertical') {
        this.initVerticalAnimation();
      }
    },
    initHorizontalAnimation() {
      if (this.data.scrollable === false) return;
      Promise.all([getRect(this, '.titian-notice-bar-container'), getRect(this, '.titian-notice-bar-content')]).then(
        (res) => {
          const offsetLeft = res[1].left - res[0].left;
          const containerWidth = res[0].width;
          const wrapWidth = res[1].width;
          if (this.data.scrollable === '' && wrapWidth <= containerWidth) return;
          const duration = ((containerWidth + wrapWidth) / this.data.speed) * 1000;
          const firstDuration = ((wrapWidth + offsetLeft) / this.data.speed) * 1000;
          const leftPosition = -wrapWidth - offsetLeft;
          const rightPosition = containerWidth - offsetLeft;
          // #ifdef MP-WEIXIN
          const creatAnimation = () =>
            this.animate(NOTICE_TARGET, [{ translateX: leftPosition }, { translateX: rightPosition }], 1, () => {
              this.animate(
                NOTICE_TARGET,
                [{ translateX: rightPosition }, { translateX: leftPosition }],
                duration,
                () => {
                  creatAnimation();
                }
              );
            });
          this.animate(NOTICE_TARGET, [{ translateX: 0 }, { translateX: leftPosition }], firstDuration, () => {
            creatAnimation();
          });
          // #endif

          // #ifndef MP-WEIXIN
          this.horizontalAnimation(firstDuration, duration, leftPosition, rightPosition);
          // #endif
        }
      );
    },
    initVerticalAnimation() {
      if (this.data.scrollable === false) return;
      if (this.data.scrollable === '' && this.data.list.length === 1) return;
      // 在最后一条后面添加第一条。当只有一条时不需要滚动
      const { list } = this.data;
      list.push(list[0]);
      this.setData({ list });
      getRect(this, '.titian-notice-bar').then((res: { height: number }) => {
        const wrapHeight = res.height;
        // #ifdef MP-WEIXIN
        const duration = ((this.data.list.length * wrapHeight) / this.data.speed) * 1000;
        const keyframes = this.data.list.map((item: string, index: number) => ({
          translateY: -index * wrapHeight,
          ease: 'ease-in-out'
        }));
        const creatAnimation = () =>
          this.animate(NOTICE_TARGET, keyframes, duration, () => {
            const lastAnimation = keyframes[keyframes.length - 1];
            this.animate(NOTICE_TARGET, [lastAnimation, { translateY: 0 }], 1, () => {
              creatAnimation();
            });
          });
        creatAnimation();
        // #endif

        // #ifndef MP-WEIXIN
        this.verticalAnimation(wrapHeight);
        // #endif
      });
    },
    onClick() {
      if (this.data.rightIcon === 'close') {
        this.close();
      }
      // 点击通知栏时触发
      this.triggerEvent('click');
    },
    close() {
      this.setData({ show: false });
    },

    // 横向滚动 兼容非微信渠道，不支持关键帧动画的场景
    horizontalAnimation(firstDuration: number, duration: number, leftPosition: number, rightPosition: number) {
      const animation = wx.createAnimation({});
      this.setData({
        animationData: animation.translateX(leftPosition).step({ duration: firstDuration }).export()
      });
      const circulation = (time: number) => {
        const timer = setTimeout(() => {
          this.setData({
            animationData: animation.translateX(rightPosition).step({ duration: 0 }).export()
          });
          setTimeout(() => {
            this.setData({
              animationData: animation.translateX(leftPosition).step({ duration }).export()
            });
            circulation(duration);
          }, 100);
        }, time);
        this.setData({ timer });
      };
      circulation(firstDuration);
    },

    // 纵向滚动 兼容非微信渠道，不支持关键帧动画的场景
    verticalAnimation(wrapHeight: number) {
      const animation = wx.createAnimation({ timingFunction: 'ease-in-out' });
      const firstDuration = (wrapHeight / this.data.speed) * 1000;
      const keyframes = this.data.list.map((item: string, index: number) => -index * wrapHeight);
      const n = keyframes.length - 1;
      let i = 0;
      const circulation = (time: number, timeout: number) => {
        const timer = setTimeout(() => {
          let translateY = keyframes[i];
          let duration = time;
          if (i > n) {
            translateY = 0;
            duration = 0;
            i = 0;
            timeout = 100;
          } else {
            timeout = i === 0 ? 0 : duration;
            i += 1;
          }
          this.setData({
            animationData: animation.translateY(translateY).step({ duration }).export()
          });
          circulation(time, timeout);
        }, timeout);
        this.setData({ timer });
      };
      circulation(firstDuration, 0);
    },
    clearTimer() {
      clearTimeout(this.data.timer);
      const animation = wx.createAnimation({ duration: 0 });
      this.setData({
        animationData: animation.translate(0, 0).step().export()
      });
    }
  }
});
