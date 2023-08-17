/* eslint-disable @typescript-eslint/naming-convention */ import BasicComponent from '../common/basic/BasicComponent';
import { getRect } from '../common/utils/index';
const instances = new Set();
const THRESHOLD = 2;
BasicComponent({
    externalClasses: [
        'left-class',
        'right-class'
    ],
    properties: {
        leftWidth: {
            type: Number,
            value: 0,
            observer: 'widthChange'
        },
        rightWidth: {
            type: Number,
            value: 0,
            observer: 'widthChange'
        },
        visible: {
            type: Boolean,
            value: false,
            observer: 'visibleChange'
        },
        disabled: Boolean,
        asyncClose: Boolean,
        name: String
    },
    lifetimes: {
        created () {
            this.offset = 0;
            instances.add(this);
        },
        attached () {
            this.getElementRect();
            setTimeout(()=>{
                this.visibleChange(this.data.visible);
            }, 200);
        },
        detached () {
            instances.delete(this);
        }
    },
    data: {
        wrapStyle: '',
        _leftWidth: 0,
        _rightWidth: 0
    },
    methods: {
        widthChange (value, oldValue) {
            if (value !== oldValue) {
                if (this.position === 'left') {
                    this.swipeMove(value);
                } else if (this.position === 'right') {
                    this.swipeMove(-value);
                }
                if (value === 0) {
                    this.resetMoveStatus();
                }
            }
        },
        visibleChange (value, oldValue) {
            const { rightWidth  } = this.data;
            if (value !== oldValue) {
                this.getElementRect();
                if (value) {
                    this.open(rightWidth === 0 ? 'left' : 'right');
                } else {
                    this.close();
                }
            }
        },
        swipeMove (offset = 0) {
            const transform = `translate3d(${offset}rpx, 0, 0)`;
            const transition = this.isDragging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.setData({
                wrapStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
            });
        },
        open (type) {
            const { disabled , _rightWidth , _leftWidth  } = this.data;
            if (disabled) return;
            this.closeOthers();
            this.swipeMove(type === 'right' ? `-${_rightWidth}` : _leftWidth);
        },
        getElementRect () {
            getRect(this, '.titian-swipe-cell-left').then((res)=>{
                this.setData({
                    _leftWidth: this.data.leftWidth || (res.width || 0) * 2
                });
            });
            getRect(this, '.titian-swipe-cell-right').then((res)=>{
                this.setData({
                    _rightWidth: this.data.rightWidth || (res.width || 0) * 2
                });
            });
        },
        resetMoveStatus () {
            this.startX = 0;
            this.startY = 0;
            this.offset = 0;
            this.position = '';
        },
        close () {
            this.swipeMove(0);
            if (this.position) {
                this.triggerEvent('close', {
                    position: this.position,
                    instance: this,
                    name: this.data.name
                });
            }
            this.resetMoveStatus();
        },
        closeOthers () {
            instances.forEach((instance)=>{
                if (instance !== this) {
                    instance.close();
                }
            });
        },
        onTouchStart (e) {
            if (this.data.disabled) return;
            this.getElementRect();
            this.touchStartTime = e.timeStamp;
            const { clientX , clientY  } = e.touches[0];
            this.startX = clientX;
            this.startY = clientY;
        },
        onTouchMove (e) {
            const { disabled , _leftWidth , _rightWidth  } = this.data;
            if (disabled) return;
            this.isDragging = true;
            this.touchStartTime = 0;
            const { clientX  } = e.touches[0];
            const { startX , offset  } = this;
            let offsetX = clientX - startX + offset;
            if (offsetX > 0) {
                offsetX = Math.min(offsetX, _leftWidth);
            } else if (offsetX < 0) {
                offsetX = Math.max(offsetX, -_rightWidth);
            }
            this.closeOthers();
            this.swipeMove(offsetX);
        },
        endTouchMove (e) {
            const { disabled , _leftWidth , _rightWidth  } = this.data;
            if (disabled) return;
            this.isDragging = false;
            this.offset = e.changedTouches[0].clientX - this.startX + this.offset;
            if (this.offset > 0) {
                this.offset = Math.min(this.offset, _leftWidth);
            } else if (this.offset < 0) {
                this.offset = Math.max(this.offset, -_rightWidth);
            }
            if (e.timeStamp - this.touchStartTime < 200) {
                return;
            }
            const offsetX = this.offset;
            if (offsetX > _leftWidth / THRESHOLD) {
                this.swipeMove(_leftWidth);
                this.offset = _leftWidth;
                if (this.position !== 'left') {
                    this.position = 'left';
                    this.triggerEvent('open', {
                        position: 'left',
                        name: this.data.name
                    });
                }
            } else if (offsetX < -_rightWidth / THRESHOLD) {
                this.swipeMove(-_rightWidth);
                this.offset = -_rightWidth;
                if (this.position !== 'right') {
                    this.position = 'right';
                    this.triggerEvent('open', {
                        position: 'right',
                        name: this.data.name
                    });
                }
            } else {
                this.close();
            }
        },
        onTouchEnd (e) {
            this.endTouchMove(e);
        },
        onTouchcancel (e) {
            this.endTouchMove(e);
        },
        onClick (event) {
            const { key: position = 'outside'  } = event.currentTarget.dataset;
            this.triggerEvent('click', position);
            if (!this.offset) {
                return;
            }
            if (this.data.asyncClose) {
                this.triggerEvent('close', {
                    position,
                    instance: this,
                    name: this.data.name
                });
            } else {
                this.close();
            }
        }
    }
});
