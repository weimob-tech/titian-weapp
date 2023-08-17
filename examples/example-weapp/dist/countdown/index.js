/* eslint-disable @typescript-eslint/ban-ts-comment */ /* eslint-disable no-underscore-dangle */ import BasicComponent from '../common/basic/BasicComponent';
import { formatDuration, formatDate, isDifferentTime } from './utils';
var ECountdownVariant;
(function(ECountdownVariant) {
    ECountdownVariant[/** 纯净型 */ "PURE"] = 'pure';
    ECountdownVariant[/** 块状风格 */ "BLOCK"] = 'block';
    ECountdownVariant[/** 混合风格 */ "MIXTURE"] = 'mixture';
})(ECountdownVariant || (ECountdownVariant = {}));
var ECountdownSize;
(function(ECountdownSize) {
    ECountdownSize["SMALL"] = 'small';
    ECountdownSize["MEDIUM"] = 'medium';
    ECountdownSize["BIG"] = 'big';
    ECountdownSize["LARGE"] = 'large';
})(ECountdownSize || (ECountdownSize = {}));
BasicComponent({
    properties: {
        // 倒计时时长，单位毫秒
        time: {
            type: Number,
            value: 1200
        },
        // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
        format: {
            type: String,
            value: 'HH:mm:ss'
        },
        // 是否自动开始倒计时
        autoplay: Boolean,
        // 是否使用自定义样式插槽
        useSlot: Boolean,
        // 根节点样式
        extStyle: String,
        variant: {
            type: String,
            value: 'pure'
        },
        size: {
            type: String,
            value: 'medium'
        }
    },
    data: {
        timeData: {},
        formattedTime: ''
    },
    observers: {
        'useSlot, format, time': function fn(useSlot, format, time) {
            if (time !== undefined) {
                this.reset();
            }
        }
    },
    lifetimes: {
        detached () {
            this.pause();
        }
    },
    pageLifetimes: {
        show () {
            if (this.status === 'pause' && this.data.autoplay) {
                const remainTime = Math.max(this.endTime - Date.now(), 0);
                this.setClock(remainTime);
                this.ticker();
            }
        },
        hide () {
            this.pause();
        }
    },
    methods: {
        start () {
            if (this.lock) return;
            this.endTime = Date.now() + this.remainTime;
            this.lock = true;
            this.status = 'play';
            this.setClock(this.remainTime);
            this.ticker();
        },
        pause () {
            clearTimeout(this.timerId);
            this.lock = false;
            this.status = 'pause';
        },
        reset () {
            this.pause();
            this.remainTime = +this.data.time;
            this.setClock(this.remainTime);
            if (this.data.autoplay) {
                this.start();
            }
        },
        ticker () {
            this.timerId = setTimeout(()=>{
                const remainTime = Math.max(this.endTime - Date.now(), 0);
                if (remainTime > 0) {
                    if (isDifferentTime(remainTime, this.remainTime, this.data.format)) {
                        this.setClock(remainTime);
                        this.remainTime = remainTime;
                    }
                    this.ticker();
                } else {
                    this.setClock(remainTime);
                    this.remainTime = remainTime;
                    this.pause();
                    // 倒计时结束时触发
                    this.status = 'finish';
                    this.triggerEvent('finish');
                }
            }, 30);
        },
        setClock (remainTime) {
            const timeGroup = formatDuration(remainTime);
            // 时间变化时触发
            if ([
                'block',
                'mixture'
            ].includes(this.data.variant)) {
                this.setData({
                    timeData: formatDate(timeGroup, this.data.format, 'group')
                });
            }
            this.triggerEvent('change', timeGroup);
            if (!this.data.useSlot) {
                const formattedTime = formatDate(timeGroup, this.data.format);
                this.setData({
                    formattedTime
                });
            }
        }
    }
});
