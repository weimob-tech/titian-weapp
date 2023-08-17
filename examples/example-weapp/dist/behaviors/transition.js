/* eslint-disable @typescript-eslint/ban-ts-comment */ // @ts-nocheck
import { isPlainObject, requestAnimationFrame } from '../common/utils/index';
var TransitionStatus;
(function(TransitionStatus) {
    TransitionStatus[TransitionStatus["enter"] = 0] = "enter";
    TransitionStatus[TransitionStatus["exit"] = 1] = "exit";
})(TransitionStatus || (TransitionStatus = {}));
function getTransitions(name) {
    const transitionsMapping = new Map();
    // 支付宝上externalClasses异步设置，titan-cli支持的有问题，用下面的方法兼容
    let enterClass = 'enter-class';
    let enterActiveClass = 'enter-active-class';
    let enterDoneClass = 'enter-done-class';
    let exitClass = 'exit-class';
    let exitActiveClass = 'exit-active-class';
    let exitDoneClass = 'exit-done-class';
    // #ifdef MP-ALIPAY
    enterClass = this.data.enterClass || enterClass;
    enterActiveClass = this.data.enterActiveClass || enterActiveClass;
    enterDoneClass = this.data.enterDoneClass || enterDoneClass;
    exitClass = this.data.exitClass || exitClass;
    exitActiveClass = this.data.exitActiveClass || exitActiveClass;
    exitDoneClass = this.data.exitDoneClass || exitDoneClass;
    // #endif
    transitionsMapping.set('enter', `titian-${name}-enter titian-${name}-enter-active ${enterClass} ${enterActiveClass}`);
    transitionsMapping.set('enter-done', `titian-${name}-enter-done titian-${name}-enter-active ${enterDoneClass} ${enterActiveClass}`);
    transitionsMapping.set('exit', `titian-${name}-exit titian-${name}-exit-active ${exitClass} ${exitActiveClass}`);
    transitionsMapping.set('exit-done', `titian-${name}-exit-done titian-${name}-exit-active ${exitDoneClass} ${exitActiveClass}`);
    return transitionsMapping;
}
const transition = (options = {})=>{
    const DEFAULT_TIMEOUT = options.duration || 300;
    return Behavior({
        properties: {
            extStyle: String,
            show: {
                type: Boolean,
                value: false,
                observer: 'toggleShow'
            },
            timeout: {
                type: null,
                value: DEFAULT_TIMEOUT,
                observer: ''
            },
            name: {
                type: String,
                value: options.name || 'fade'
            },
            enterName: String,
            exitName: String,
            destroyOnExit: {
                type: Boolean,
                value: false
            },
            timingFunction: {
                type: String,
                value: options.timingFunction || 'linear'
            }
        },
        data: {
            classes: '',
            initialized: false,
            display: false,
            duration: DEFAULT_TIMEOUT
        },
        lifetimes: {
            ready () {
                const { show  } = this.data;
                if (show) {
                    this.toggleShow(true, false);
                }
            }
        },
        methods: {
            toggleShow (newVal, oldVal) {
                if (newVal !== oldVal) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    newVal ? this.enter() : this.exit();
                }
            },
            enter () {
                const { name , enterName , timeout  } = this.data;
                const duration = isPlainObject(timeout) ? timeout.appear || DEFAULT_TIMEOUT : timeout;
                const transitionsMapping = getTransitions.call(this, enterName || name);
                this.status = 0;
                this.triggerEvent('enter');
                requestAnimationFrame(()=>{
                    if (this.status !== 0) {
                        return;
                    }
                    this.triggerEvent('entering');
                    this.setData({
                        duration,
                        initialized: true,
                        display: true,
                        classes: transitionsMapping.get('enter')
                    }, ()=>{
                        requestAnimationFrame(()=>{
                            if (this.status !== 0) {
                                return;
                            }
                            this.transitionEnd = false;
                            this.setData({
                                classes: transitionsMapping.get('enter-done')
                            });
                            setTimeout(()=>{
                                this.onTransitionEnd();
                            }, duration);
                        });
                    });
                });
            },
            exit () {
                const { display , exitName , name , timeout  } = this.data;
                if (!display) {
                    return;
                }
                const duration = isPlainObject(timeout) ? timeout.exit || DEFAULT_TIMEOUT : timeout;
                const transitionsMapping = getTransitions.call(this, exitName || name);
                this.status = 1;
                this.triggerEvent('exit');
                requestAnimationFrame(()=>{
                    if (this.status !== 1) {
                        return;
                    }
                    this.triggerEvent('exiting');
                    this.setData({
                        classes: transitionsMapping.get('exit'),
                        duration
                    }, ()=>{
                        requestAnimationFrame(()=>{
                            if (this.status !== 1) {
                                return;
                            }
                            this.transitionEnd = false;
                            this.setData({
                                classes: transitionsMapping.get('exit-done')
                            });
                            setTimeout(()=>this.onTransitionEnd(), duration);
                        });
                    });
                });
            },
            onTransitionEnd () {
                if (this.transitionEnd) {
                    return;
                }
                this.transitionEnd = true;
                this.triggerEvent(this.status === 0 ? 'entered' : 'exited');
                {
                    const { show , display , destroyOnExit , initialized  } = this.data;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newData = {
                        classes: ''
                    };
                    if (!show && display) {
                        newData.display = false;
                        newData.initialized = destroyOnExit ? false : initialized;
                        this.setData(newData);
                    }
                }
            }
        }
    });
};
export default transition;
