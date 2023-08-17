/* eslint-disable no-underscore-dangle */ import BasicComponent from '../common/basic/BasicComponent';
import { throttle } from '../common/utils/index';
BasicComponent({
    externalClasses: [
        'ext-title-class',
        'ext-subtitle-class'
    ],
    properties: {
        type: {
            type: String,
            value: 'normal' // immersion、normal
        },
        background: {
            type: String,
            value: '#ffffff'
        },
        title: String,
        subtitle: String,
        leftIcons: Array,
        rightIcons: Array,
        usePlaceholder: {
            type: Boolean,
            value: true
        },
        useBackButton: {
            type: Boolean,
            value: true
        },
        backDelta: {
            type: Number,
            value: 1
        },
        useHomeButton: Boolean,
        homePath: String,
        extStyle: String,
        transitionDistance: {
            type: Number,
            value: 100
        },
        transitionStartTop: {
            type: Number,
            value: 50
        },
        fontColor: String,
        frostedGlass: Boolean,
        loading: Boolean,
        subtitleHeight: Number // 在使用了subtitle的插槽的情况下，subtitleHeight为必传
    },
    data: {
        statusBarHeight: 0,
        navbarHeight: 0,
        gap: 0,
        prefixIcons: [],
        backIconName: 'nav-back',
        homeIconName: 'home',
        menuClientRect: {
            top: 0,
            height: 0,
            width: 0
        },
        navbarPlaceholderHeight: 0,
        opacity: 0,
        top: 0
    },
    observers: {
        'leftIcons, useHomeButton, useBackButton': function fn() {
            this.setPrefixIcons();
        },
        'subtitle, subtitleHeight': function fn() {
            const { menuClientRect , statusBarHeight  } = this.data;
            this.setNavbarStyle(menuClientRect, statusBarHeight);
        },
        'fontColor, background': function fn(frontColor, background) {
            if (frontColor && background) {
                wx.setNavigationBarColor({
                    frontColor,
                    backgroundColor: background
                });
            }
        }
    },
    lifetimes: {
        attached () {
            const { statusBarHeight , screenHeight  } = wx.getSystemInfoSync();
            const menuClientRect = wx.getMenuButtonBoundingClientRect();
            const gap = menuClientRect.top - statusBarHeight;
            this.setData({
                statusBarHeight,
                menuClientRect,
                gap
            });
            this.setNavbarStyle(menuClientRect, statusBarHeight);
            this.setPrefixIcons();
            this.updateOpacity = throttle(this.setOpacity);
            this._screenHeight = screenHeight;
        }
    },
    methods: {
        setNavbarStyle (menuClientRect, statusBarHeight) {
            const gap = menuClientRect.top - statusBarHeight;
            let navbarHeight = menuClientRect.height + 2 * gap;
            let navbarPlaceholderHeight = Math.max(navbarHeight, 44) + statusBarHeight;
            if (this.data.subtitle || this.data.subtitleHeight) {
                const subtitleHeight = this.data.subtitleHeight || 18;
                navbarPlaceholderHeight = navbarHeight + statusBarHeight + subtitleHeight;
                navbarHeight = menuClientRect.height;
            }
            this.setData({
                navbarHeight,
                navbarPlaceholderHeight
            });
        },
        setPrefixIcons () {
            const prefixIcons = this.data.leftIcons || [];
            if (this.data.useHomeButton && !prefixIcons.includes(this.data.homeIconName)) {
                prefixIcons.unshift(this.data.homeIconName);
            }
            if (this.data.useBackButton && !prefixIcons.includes(this.data.backIconName)) {
                prefixIcons.unshift(this.data.backIconName);
            }
            this.setData({
                prefixIcons
            });
        },
        setOpacity (e) {
            const { scrollTop  } = e;
            let opacity = (scrollTop - this.data.transitionStartTop) / this.data.transitionDistance;
            opacity = Math.min(opacity, 1);
            if (opacity === this.data.opacity) return;
            this.setData({
                opacity
            });
        },
        scrollAnimate (self, selector, scrollSource) {
            // #ifdef MP-WEIXIN
            const keyframes = Array.from({
                length: 11
            }, (x, i)=>{
                const value = i / 10;
                return {
                    opacity: value,
                    offset: value
                };
            });
            self.animate(`${selector} >>> .titian-navbar-bg`, keyframes, 1000, {
                scrollSource,
                timeRange: 1000,
                startScrollOffset: this.data.transitionStartTop,
                endScrollOffset: this.data.transitionDistance
            });
            self.animate(`${selector} >>> .titian-navbar-animate-title`, keyframes, 1000, {
                scrollSource,
                timeRange: 1000,
                startScrollOffset: this.data.transitionStartTop,
                endScrollOffset: this.data.transitionDistance
            });
            self.animate(`${selector} >>> .titian-navbar-animate-subtitle`, keyframes, 1000, {
                scrollSource,
                timeRange: 1000,
                startScrollOffset: this.data.transitionStartTop,
                endScrollOffset: this.data.transitionDistance
            });
        // #endif
        },
        clearScrollAnimation (self, selector) {
            // #ifdef MP-WEIXIN
            self.clearAnimation(`${selector} >>> .titian-navbar-bg`);
            self.clearAnimation(`${selector} >>> .titian-navbar-animate-title`);
            self.clearAnimation(`${selector} >>> .titian-navbar-animate-subtitle`);
        // #endif
        },
        clickIcon (event) {
            const { index  } = event.currentTarget.dataset;
            const name = this.data.prefixIcons[index];
            const details = {
                index,
                name
            };
            if (name === 'nav-back') {
                this.triggerEvent('back', details);
                if (this.data.backDelta) {
                    const pages = getCurrentPages();
                    if (pages.length > 1) {
                        wx.navigateBack({
                            delta: this.data.backDelta
                        });
                    }
                }
            } else if (name === 'home') {
                this.triggerEvent('home', details);
                if (this.data.homePath) {
                    wx.reLaunch({
                        url: this.data.homePath
                    });
                }
            }
            this.triggerEvent('click-icon', details);
        },
        updateFixedTop ({ selector , height , isTitian =true , cursorSpacing =0  }) {
            this.getDiff({
                selector,
                height,
                isTitian,
                cursorSpacing
            }).then((diff)=>{
                if (height) {
                    if (diff > 0) {
                        this.setData({
                            top: diff
                        });
                        this._fixedTop = height;
                    }
                } else if (this._fixedTop) {
                    this.setData({
                        top: 0
                    });
                }
            });
        },
        getScrollTop ({ selector , height , isTitian =true , cursorSpacing =0 , currentScrollTop  }) {
            return new Promise((resolve)=>{
                this.getDiff({
                    selector,
                    height,
                    isTitian,
                    cursorSpacing
                }).then((diff)=>{
                    if (height) {
                        if (diff <= 0) {
                            this._currentScrollTop = undefined;
                        } else {
                            this._currentScrollTop = currentScrollTop || 0;
                            resolve({
                                placeholderHeight: diff,
                                scrollTop: this._currentScrollTop + diff
                            });
                        }
                    } else if (this._currentScrollTop !== undefined) {
                        resolve({
                            placeholderHeight: 0,
                            scrollTop: this._currentScrollTop
                        });
                    }
                });
            });
        },
        getDiff ({ selector , height , isTitian =true , cursorSpacing =0  }) {
            return new Promise((resolve, reject)=>{
                // #ifdef MP-WEIXIN
                if (isTitian) {
                    selector = `${selector} >>> .titian-field`;
                }
                // #endif
                if (this._timer) clearTimeout(this._timer);
                this._timer = setTimeout(()=>{
                    if (height === 0) {
                        resolve(0);
                        return;
                    }
                    wx.createSelectorQuery().select(selector).boundingClientRect((rect)=>{
                        if (!rect) {
                            reject();
                            return;
                        }
                        const bottom = this._screenHeight - rect.bottom;
                        const diff = +height - bottom + +cursorSpacing;
                        resolve(diff);
                    }).exec();
                }, 100);
                setTimeout(()=>{
                    reject();
                }, 1000);
            });
        }
    }
});
