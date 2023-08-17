import BasicComponent from '../common/basic/BasicComponent';
import { hexToRGB, RGBAToHex } from '../common/utils/color';
BasicComponent({
    // 可扩展的文本class
    externalClasses: [
        'text-class'
    ],
    properties: {
        // 进度条颜色
        color: {
            type: String,
            observer: 'changeBgColor'
        },
        // 进度条可设置成渐变色
        gradientColor: {
            type: null,
            optionalTypes: [
                String,
                Object
            ],
            observer: 'changeBgColor'
        },
        // 进度条轨道颜色
        strokeColor: String,
        // 缓冲条颜色
        bufferBgColor: String,
        // 进度值
        value: {
            type: null,
            optionalTypes: [
                Number
            ]
        },
        // 进度条宽度
        strokeWidth: {
            type: Number,
            value: 4
        },
        // 是否展示进度值， 默认false
        showProgress: Boolean,
        // 缓冲值
        buffer: {
            type: Number,
            value: 0
        }
    },
    methods: {
        changeBgColor (newVal, oldVal) {
            const { gradientColor: defaultColor , strokeColor  } = this.data;
            if (strokeColor === '' || newVal !== oldVal) {
                const query = wx.createSelectorQuery().in(this).select('.titian-progress-bar');
                query.fields({
                    computedStyle: [
                        'backgroundColor',
                        'color'
                    ]
                }, (res)=>{
                    let color = res?.backgroundColor;
                    const matchColors = /^rgba?\((.+)\)$/g;
                    const match = matchColors.exec(color);
                    if (!match) return;
                    color = RGBAToHex(color);
                    if (defaultColor && typeof defaultColor === 'object') {
                        color = defaultColor.to || color;
                    }
                    this.setData({
                        strokeColor: hexToRGB(color, 0.1),
                        bufferBgColor: hexToRGB(color, 0.3)
                    });
                }).exec();
            }
        }
    },
    lifetimes: {
        attached () {
            this.changeBgColor();
        }
    }
});
