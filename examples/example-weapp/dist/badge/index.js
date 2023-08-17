import BasicComponent from '../common/basic/BasicComponent';
import { getRect } from '../common/utils/index';
var EBadgeSpread;
(function(EBadgeSpread) {
    EBadgeSpread[// 两侧
    "BOTH"] = 'bothSides';
    EBadgeSpread[// 向右
    "RIGHT"] = 'toRight';
})(EBadgeSpread || (EBadgeSpread = {}));
BasicComponent({
    properties: {
        // badge根节点样式
        extStyle: String,
        // 不展示数字，只有一个小红点
        dot: Boolean,
        // 展示的内容
        content: {
            type: String,
            optionalTypes: [
                Number
            ],
            value: ''
        },
        // 内容的撑开方向
        spread: {
            type: String,
            value: 'bothSides'
        },
        // 内容部分为图标时的图标名称
        icon: String,
        // 设置状态点的位置偏移,[number, number],默认单位rpx
        offset: Array,
        // 取消定位相关样式，用作普通展示
        static: Boolean,
        // 用在文字内容的右上角展示
        atText: Boolean,
        useSlot: Boolean
    },
    data: {
        subBgColor: '',
        circle: false,
        relative: false,
        visible: false
    },
    observers: {
        'content, icon, dot': function fn(content, icon, dot) {
            let circle = !!icon;
            const visible = content !== '' || dot || !!icon;
            if (content) {
                circle = content.toString().length === 1;
            }
            this.setData({
                circle,
                visible
            });
        }
    },
    lifetimes: {
        ready () {
            getRect(this, '.titian-badge').then((res)=>{
                const relative = !!res.width || !!res.height || this.data.useSlot;
                this.setData({
                    relative
                });
            });
        }
    },
    methods: {}
});
