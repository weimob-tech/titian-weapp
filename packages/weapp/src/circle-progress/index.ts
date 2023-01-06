import BasicComponent from '../common/basic/BasicComponent';
import { hexToRGB, RGBAToHex } from '../common/utils/color';
import { getFieldStyle } from '../common/utils/index';

BasicComponent({
  properties: {
    size: {
      type: Number,
      value: 160
    },
    value: {
      type: Number,
      value: 0,
      observer: 'valueChange'
    },

    buffer: {
      type: Number,
      value: 0,
      observer: 'bufferChange'
    },

    color: String,

    strokeColor: String,

    bufferBgColor: String,

    // 进度条宽度
    strokeWidth: {
      type: Number,
      value: 4
    },

    // 是否展示进度值， 默认false
    showProgress: Boolean,
    font: String
  },
  lifetimes: {
    attached() {
      this.currentValue = -0.5 * Math.PI;
      this.currentBufferValue = -0.5 * Math.PI;
      const selector = '.titian-circle-progress-canvas';

      getFieldStyle(this, selector, ['color']).then((res) => {
        const color = RGBAToHex(res.color);
        this.setData({ color: color || this.data.color || '#fa2c19' });
        wx.createSelectorQuery()
          .in(this)
          .select(selector)
          .fields({
            node: true,
            size: true
          })
          .exec(this.init.bind(this));
      });
    }
  },
  methods: {
    init(res: WechatMiniprogram.IAnyObject[]) {
      this.width = res[0].width;
      this.height = res[0].height;
      const canvas = res[0].node;
      if (!canvas) {
        return;
      }
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      this.ctx = ctx;
      this.canvas = canvas;
      this.doRender();
    },

    valueChange(val: number) {
      this.targetValue = ((val * 2) / 100 - 0.5) * Math.PI;

      if (this.canvas && this.rafId) {
        this.canvas.cancelAnimationFrame(this.rafId);
      }
      this.doRender();
    },

    bufferChange(val: number) {
      this.targetBufferValue = ((val * 2) / 100 - 0.5) * Math.PI;

      if (this.canvas && this.rafId) {
        this.canvas.cancelAnimationFrame(this.rafId);
      }
      this.doRender();
    },

    renderLoop() {
      this.render();
      if (this.currentValue < this.targetValue) {
        this.rafId = this.canvas.requestAnimationFrame(this.renderLoop.bind(this));
      }
    },

    doRender() {
      if (!this.canvas) return;

      this.rafId = this.canvas.requestAnimationFrame(this.renderLoop.bind(this));
    },

    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawBg();
      if (this.data.buffer > 0) {
        this.drawBuffer();
      }
      this.draw();
    },

    handleDraw(curValue: number, targetValue: number, zIndex: number, color: string, defaultEndAngle?: number) {
      const { ctx } = this;
      const { strokeWidth } = this.data;

      const endAngle = defaultEndAngle || Math.min(curValue, targetValue);

      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, (this.width - strokeWidth) / 2, -0.5 * Math.PI, endAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.zIndex = zIndex;
      ctx.stroke();
    },

    draw() {
      const { color } = this.data;
      this.currentValue += 0.01 * Math.PI;

      this.handleDraw(this.currentValue, this.targetValue, 3, color);
    },

    drawBuffer() {
      const { bufferBgColor } = this.data;

      this.currentBufferValue += 0.015 * Math.PI;

      this.handleDraw(
        this.currentBufferValue,
        this.targetBufferValue,
        2,
        bufferBgColor || hexToRGB(this.data.color, 0.3)
      );
    },

    drawBg() {
      const { strokeColor } = this.data;

      this.handleDraw(0, 0, 1, strokeColor || hexToRGB(this.data.color, 0.1), 2 * Math.PI);
    }
  }
});
