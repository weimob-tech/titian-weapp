/* eslint-disable no-underscore-dangle */ /* eslint-disable @typescript-eslint/naming-convention */ import BasicComponent from '../common/basic/BasicComponent';
import { clamp, isArrayEqual, percentToValue, roundByStep, valueToPercent } from '../common/utils/index';
BasicComponent({
    externalClasses: [
        'track-class',
        'rail-class',
        'thumb-class'
    ],
    properties: {
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1,
            observer: '_stepChanged'
        },
        orientation: {
            type: String
        },
        value: {
            type: Number,
            optionalTypes: [
                Array
            ],
            value: 0,
            observer: '_valueChanged'
        }
    },
    options: {
        pureDataPattern: /^_/
    },
    data: {
        isRangeValue: false,
        _railSize: [
            0,
            0
        ],
        _railPosition: [
            0,
            0
        ],
        _stepPercent: 0,
        thumbPercent1: 0,
        thumbPercent2: 0,
        trackLengthPercent: 0,
        trackStartPercent: 0,
        _originThumbValue1: 0,
        _originThumbValue2: 0,
        _thumbValue1: 0,
        _thumbValue2: 0
    },
    lifetimes: {
        ready () {
            this.init();
        }
    },
    observers: {
        'thumbPercent1, thumbPercent2': function thumbPercentChanged(thumbPercent1, thumbPercent2) {
            const { isRangeValue , min , max , step , value , _originThumbValue1 , _originThumbValue2  } = this.data;
            let { _thumbValue1 , _thumbValue2  } = this.data;
            let trackStartPercent = 0;
            let trackLengthPercent = 0;
            if (isRangeValue) {
                [_thumbValue1, _thumbValue2] = [
                    thumbPercent1,
                    thumbPercent2
                ].map((p)=>percentToValue(p, min, max));
                trackStartPercent = Math.min(thumbPercent1, thumbPercent2);
                trackLengthPercent = Math.abs(thumbPercent2 - thumbPercent1);
            } else {
                _thumbValue1 = percentToValue(thumbPercent1, min, max);
                trackStartPercent = 0;
                trackLengthPercent = thumbPercent1;
            }
            this.setData({
                _thumbValue1,
                _thumbValue2,
                trackStartPercent,
                trackLengthPercent
            });
            if (Array.isArray(value) && (_thumbValue1 !== _originThumbValue1 || _thumbValue2 !== _originThumbValue2)) {
                [_thumbValue1, _thumbValue2] = [
                    _thumbValue1,
                    _thumbValue2
                ].map((v)=>roundByStep(v, step));
                this.triggerEvent('change', {
                    value: [
                        _thumbValue1,
                        _thumbValue2
                    ]
                });
            } else if (_thumbValue1 !== _originThumbValue1) {
                this.triggerEvent('change', {
                    value: _thumbValue1
                });
            }
        }
    },
    methods: {
        init () {
            this._stepChanged(this.data.step);
            this._valueChanged(this.data.value);
            wx.createSelectorQuery().in(this).select('.titian-slider-rail').fields({
                id: true,
                dataset: true,
                rect: true,
                size: true
            }).exec((rect = [])=>{
                this.setData({
                    _railSize: [
                        rect[0].width,
                        rect[0].height
                    ],
                    _railPosition: [
                        rect[0].left,
                        rect[0].top
                    ]
                });
            });
        },
        _stepChanged (step, oldStep) {
            if (step === oldStep) {
                return;
            }
            const _stepPercent = valueToPercent(step + this.data.min, this.data.min, this.data.max);
            this.setData({
                _stepPercent
            });
        },
        _valueChanged (value, oldValue) {
            if (Array.isArray(value) && Array.isArray(oldValue) && isArrayEqual(value, oldValue) || value === oldValue) {
                return;
            }
            const { max , min  } = this.data;
            let thumbPercent1 = 0;
            let thumbPercent2 = 0;
            let _originThumbValue1 = 0;
            let _originThumbValue2 = 0;
            const isRangeValue = Array.isArray(value);
            if (isRangeValue) {
                [_originThumbValue1, _originThumbValue2] = value;
                [thumbPercent1, thumbPercent2] = [
                    _originThumbValue1,
                    _originThumbValue2
                ].map((v)=>valueToPercent(v, min, max));
            } else {
                _originThumbValue1 = value;
                thumbPercent1 = valueToPercent(value, min, max);
            }
            this.setData({
                thumbPercent1,
                thumbPercent2,
                isRangeValue,
                _originThumbValue1,
                _originThumbValue2
            });
        },
        onThumbTouchMove (event) {
            const { thumb  } = event.currentTarget.dataset;
            const { _railPosition , _railSize  } = this.data;
            const { pageX  } = event.touches[0];
            const deltaX = pageX - _railPosition[0];
            let thumbPercent = Math.round(deltaX / _railSize[0] * 10000) / 100;
            thumbPercent = roundByStep(thumbPercent, this.data._stepPercent);
            thumbPercent = clamp(thumbPercent, 0, 100);
            const params = {
                [`thumbPercent${thumb}`]: thumbPercent
            };
            this.setData({
                ...params
            });
        },
        onTapSlider (event) {
            const { _railPosition , _railSize , isRangeValue , thumbPercent1 , thumbPercent2  } = this.data;
            const pageX = event.detail.x || event.detail.pageX;
            const deltaX = pageX - _railPosition[0];
            let thumbPercent = Math.round(deltaX / _railSize[0] * 10000) / 100;
            thumbPercent = roundByStep(thumbPercent, this.data._stepPercent);
            thumbPercent = clamp(thumbPercent, 0, 100);
            let params = {};
            if (isRangeValue) {
                const [diff1, diff2] = [
                    thumbPercent1,
                    thumbPercent2
                ].map((p)=>Math.abs(p - thumbPercent));
                const thumbIndex = diff1 <= diff2 ? 1 : 2;
                params = {
                    [`thumbPercent${thumbIndex}`]: thumbPercent
                };
            } else {
                params = {
                    thumbPercent1: thumbPercent
                };
            }
            this.setData({
                ...params
            });
        }
    }
});
