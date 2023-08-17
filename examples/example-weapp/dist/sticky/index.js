/* eslint-disable @typescript-eslint/no-unused-expressions */ import BasicComponent from '../common/basic/BasicComponent';
import { getRect } from '../common/utils/index';
const STICKY_TARGET = '.titian-sticky';
BasicComponent({
    properties: {
        offsetTop: {
            type: Number,
            value: 0
        },
        container: null,
        disabled: {
            type: Boolean,
            value: false,
            observer: 'disabledChanged'
        },
        zIndex: {
            type: Number,
            value: 99
        },
        usePureCss: Boolean
    },
    data: {
        fixed: false,
        width: 0,
        height: 0
    },
    observers: {
        container (val) {
            if (typeof val !== 'function' || !this.data.height) return;
            this.creatContainerObserver();
        },
        offsetTop () {
            if (this.data.disabled) return;
            this.initObserver();
        }
    },
    lifetimes: {
        ready: function attached() {
            if (this.data.disabled) return;
            this.initObserver();
        },
        detached: function detached() {
            this.destroyObserver();
        }
    },
    methods: {
        disabledChanged (newVal) {
            newVal ? this.destroyObserver() : this.initObserver();
        },
        getContainerRect () {
            const nodesRef = this.data.container();
            return new Promise((resolve, reject)=>{
                nodesRef.boundingClientRect((rect)=>{
                    if (rect) {
                        resolve(rect);
                    } else {
                        reject(new Error(`get rect error:${rect}`));
                    }
                }).exec();
            });
        },
        initObserver () {
            this.destroyObserver();
            getRect(this, STICKY_TARGET).then((rect)=>{
                this.setData({
                    height: rect.height
                });
                if (rect.height === 0) return;
                this.createObserver();
                this.creatContainerObserver();
            });
        },
        createObserver () {
            let top = this.data.offsetTop;
            // 采用css sticky时，top和offsetTop一致就不会触发Observer
            if (this.data.usePureCss) {
                top += 1;
            }
            this.destroyObserver('contentObserver');
            const contentObserver = this.createIntersectionObserver({
                thresholds: [
                    1
                ],
                initialRatio: 1
            });
            // left和right如果不设置，特殊机型100vw会超出屏幕，会自动触发阈值
            contentObserver.relativeToViewport({
                top: -top,
                left: 1000,
                right: 1000
            });
            contentObserver.observe(STICKY_TARGET, (res)=>{
                this.setData({
                    width: res.boundingClientRect.width
                });
                this.setFixed(res.boundingClientRect.top);
            });
            this.contentObserver = contentObserver;
        },
        creatContainerObserver () {
            if (typeof this.data.container !== 'function') return;
            this.getContainerRect().then((rect)=>{
                getRect(this, STICKY_TARGET).then((contentRect)=>{
                    let top = rect.height - this.data.offsetTop - contentRect.height - (contentRect.top - rect.top);
                    if (this.data.usePureCss) {
                        top = 1 - this.data.offsetTop;
                    }
                    this.destroyObserver('containerObserver');
                    const containerObserver = this.createIntersectionObserver({
                        thresholds: [
                            1
                        ],
                        initialRatio: 1
                    });
                    containerObserver.relativeToViewport({
                        top,
                        left: 1000,
                        right: 1000
                    });
                    containerObserver.observe(STICKY_TARGET, (res)=>{
                        this.setFixed(res.boundingClientRect.top, top);
                    });
                    this.containerObserver = containerObserver;
                });
            });
        },
        destroyObserver (observerName) {
            if (observerName) {
                const observer = this[observerName];
                observer && observer.disconnect();
            } else {
                this.contentObserver && this.contentObserver.disconnect();
                this.containerObserver && this.containerObserver.disconnect();
            }
        },
        setFixed (top, containerObserverTop) {
            let fixed = false;
            if (this.data.usePureCss) {
                fixed = top === this.data.offsetTop;
            } else if (containerObserverTop !== undefined) {
                fixed = top >= -containerObserverTop && top < this.data.offsetTop;
            } else {
                fixed = top < this.data.offsetTop;
            }
            // 在吸顶状态改变是触发
            this.triggerEvent('fixed', {
                isFixed: fixed,
                top
            });
            if (this.data.usePureCss) return;
            this.setData({
                fixed
            });
        }
    }
});
