import BasicComponent from '../common/basic/BasicComponent';
import zIndexTool from '../common/utils/zIndexTool';
import { EPosition, ETransitionClass } from './const';
const defaultZIndex = zIndexTool.getZIndex();
BasicComponent({
    externalClasses: [
        'ext-content-class',
        'ext-mask-class'
    ],
    properties: {
        // 遮罩z-index 层级
        maskZIndex: {
            type: Number,
            value: defaultZIndex
        },
        // 内容z-index 层级
        contentZIndex: {
            type: Number,
            value: defaultZIndex + 1
        },
        // 是否显示遮罩
        hasMask: {
            type: Boolean,
            value: true
        },
        // 是否
        safeArea: {
            type: Boolean,
            value: true
        },
        // 是否显示弹出层
        visible: {
            type: Boolean,
            value: false,
            observer (newVal, oldVal) {
                if (newVal === oldVal) return;
                if (newVal) {
                    this.triggerEvent('show');
                }
            }
        },
        // 	是否锁定背景滚动
        preventScroll: {
            type: Boolean,
            value: true
        },
        // 是否在点击遮罩层后关闭
        closeOnMask: {
            type: Boolean,
            value: true
        },
        // 弹出位置，可选值为 top bottom right left
        position: {
            type: String,
            value: EPosition.CENTER
        },
        // 圆角，默认单位为 rpx
        radius: {
            type: String,
            optionalTypes: [
                Number
            ],
            value: ''
        },
        // 动画时间，默认单位为 ms
        timeout: null,
        // 自定义遮罩层样式
        extMaskStyle: String,
        // 自定义弹出层样式
        extContentStyle: String,
        extStyle: String,
        // 过渡动画类型
        transition: {
            type: String,
            value: ''
        },
        destroyOnClose: {
            type: Boolean,
            value: false
        }
    },
    data: {
        EPosition,
        transitionClass: ''
    },
    observers: {
        // eslint-disable-next-line func-names
        'position,transition': function(position, transition) {
            if (this.position !== position || this.transition !== transition) {
                this.position = position;
                this.transition = transition;
                let transitionClass = transition;
                if (!transitionClass) {
                    transitionClass = ETransitionClass[position];
                }
                if (position === EPosition.CENTER && transitionClass !== 'fade') {
                    transitionClass = `${transitionClass}-center`;
                }
                this.setData({
                    transitionClass
                });
            }
        }
    },
    methods: {
        onShow () {
            // 弹出层打开时触发
            this.triggerEvent('show');
        },
        onClose () {
            // 弹出层关闭时触发
            this.triggerEvent('close');
            this.setData({
                visible: false
            });
        },
        onTapMask () {
            const { closeOnMask  } = this.data;
            if (closeOnMask) {
                this.onClose();
            }
        },
        onEnter () {
            this.triggerEvent('enter');
        },
        onEntered () {
            this.triggerEvent('entered');
        },
        onExit () {
            this.triggerEvent('exit');
        },
        onExited () {
            this.triggerEvent('exited');
        },
        noop () {}
    }
});
