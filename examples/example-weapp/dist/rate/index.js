/* eslint-disable no-underscore-dangle */ /* eslint-disable @typescript-eslint/naming-convention */ import BasicComponent from '../common/basic/BasicComponent';
import { clamp, roundByStep } from '../common/utils/index';
BasicComponent({
    properties: {
        value: {
            type: Number,
            value: 0,
            observer: '_valueChanged'
        },
        allowHalf: {
            type: Boolean,
            value: false
        },
        clearable: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 5,
            observer: 'init'
        },
        icon: {
            type: String,
            value: 'rate-star-highlight'
        },
        iconSize: {
            type: String,
            value: '36'
        },
        emptyIcon: {
            type: String
        },
        readOnly: {
            type: Boolean,
            value: false
        }
    },
    data: {
        inputScore: 0,
        scoreList: [],
        cssVariableObj: {},
        _containerPosition: [
            0,
            0
        ],
        _containerSize: [
            0,
            0
        ],
        _starSize: [
            0,
            0
        ],
        _MIN_SCORE: 0,
        _MAX_SCORE: 5
    },
    options: {
        pureDataPattern: /^_/
    },
    lifetimes: {
        ready () {
            this.init(this.data.count, 0);
        }
    },
    methods: {
        init (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.setData({
                    scoreList: Array.from({
                        length: newVal
                    }, (v, i)=>i + 1)
                });
                this.setMaxMinScore();
                const query = wx.createSelectorQuery().in(this);
                query.select('.titian-rate').fields({
                    id: true,
                    dataset: true,
                    rect: true,
                    size: true
                }).exec((rect = [])=>{
                    if (rect[0]) {
                        this.setData({
                            _containerSize: [
                                rect[0].width,
                                rect[0].height
                            ],
                            _starSize: [
                                rect[0].width / this.data.count,
                                rect[0].height
                            ],
                            _containerPosition: [
                                rect[0].left,
                                rect[0].top
                            ]
                        });
                    }
                });
            }
        },
        setMaxMinScore () {
            const { count , clearable , allowHalf  } = this.data;
            let MIN_SCORE = 0;
            const MAX_SCORE = count;
            if (!clearable) {
                if (!allowHalf) {
                    MIN_SCORE = 1;
                } else {
                    MIN_SCORE = 0.5;
                }
            }
            this.setData({
                _MIN_SCORE: MIN_SCORE,
                _MAX_SCORE: MAX_SCORE
            });
        },
        onTouchMove (event) {
            const { _starSize , _containerPosition , allowHalf , readOnly , _MIN_SCORE , _MAX_SCORE  } = this.data;
            if (readOnly) return;
            const { pageX  } = event.touches[0];
            const deltaX = pageX - _containerPosition[0];
            const fingerPositionX = deltaX / _starSize[0];
            let score = 0;
            if (!allowHalf) {
                score = Math.ceil(fingerPositionX);
            } else {
                score = roundByStep(fingerPositionX, 0.5);
            }
            score = clamp(score, _MIN_SCORE, _MAX_SCORE);
            if (score !== this.data.value) {
                this.triggerEvent('change', {
                    value: score
                });
            }
        },
        onTapItem (event) {
            const { readOnly , _MIN_SCORE , _MAX_SCORE  } = this.data;
            if (readOnly) {
                return;
            }
            let { score  } = event.currentTarget.dataset;
            score = clamp(score, _MIN_SCORE, _MAX_SCORE);
            this.triggerEvent('change', {
                value: score
            });
        },
        _valueChanged (value) {
            let score = value;
            const { _MIN_SCORE , _MAX_SCORE  } = this.data;
            score = clamp(score, _MIN_SCORE, _MAX_SCORE);
            this.setData({
                inputScore: score
            });
        },
        update () {
            const { value  } = this.data;
            // 更新 myValue
            this.setData({
                inputScore: value
            });
        }
    }
});
