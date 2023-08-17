import BasicComponent from '../common/basic/BasicComponent';
import { requestAnimationFrame } from '../common/utils/index';
import zIndexTool from '../common/utils/zIndexTool';
import Calendar from './calendar';
import { CalTypeEnum, DateStatusEnum, WEEK } from './const';
const defaultZIndex = zIndexTool.getZIndex();
BasicComponent({
    externalClasses: [
        'ext-popup-class',
        'ext-popup-mask-class',
        'ext-popup-content-class',
        'ext-scroll-class'
    ],
    properties: {
        start: {
            type: String,
            value: WEEK[0].name
        },
        mode: {
            type: String,
            value: CalTypeEnum.SINGLE
        },
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
        defaultValue: null,
        value: null,
        minDate: {
            type: null,
            value: Date.now()
        },
        maxDate: {
            type: null,
            value: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
        },
        position: {
            type: String,
            value: 'bottom'
        },
        closeOnMask: {
            type: Boolean,
            value: true
        },
        destroyOnClose: Boolean,
        usePopup: {
            type: Boolean,
            value: true
        },
        visible: {
            type: Boolean,
            value: false,
            observer (val) {
                if (val && this.calendar.init) {
                    requestAnimationFrame(()=>{
                        this.calendar.id = this.calendar.findMonthLocation();
                        const position = this.calendar.monthList.find((month, index)=>`month${index}` === this.calendar.id);
                        const upldate = position ? {
                            id: this.calendar.id,
                            monthTitle: position.title
                        } : {
                            id: this.calendar.id
                        };
                        this.setData(upldate, ()=>{
                            setTimeout(()=>{
                                this.intersectionObserver();
                            }, 100);
                        });
                    });
                }
            }
        },
        /** 允许同一天 */ allowSameDay: Boolean,
        maxRange: {
            type: Number,
            value: 0
        },
        maxSize: {
            type: Number,
            value: 0
        },
        color: {
            type: String,
            value: '#2580FF'
        },
        round: Boolean,
        title: {
            type: String,
            value: '日期选择'
        },
        formatter: null,
        confirmText: {
            type: String,
            value: '确定'
        },
        extStyle: String
    },
    data: {
        id: '',
        week: [],
        monthList: [],
        monthTitle: ''
    },
    observers: {
        // eslint-disable-next-line func-names
        'minDate,maxDate,mode,maxRange,allowSameDay,start,value,defaultValue,maxSize,formatter': function(minDate, maxDate, mode, maxRange, allowSameDay, start, value, defaultValue, maxSize, formatter) {
            if (this.status !== 'ready') return;
            if (this.minDate !== minDate || this.maxDate !== maxDate || this.mode !== mode || this.maxRange !== maxRange || this.allowSameDay !== allowSameDay || this.start !== start || this.value !== value || this.defaultValue !== defaultValue || this.formatter !== formatter || this.maxSize !== maxSize) {
                this.updateDataByProps({
                    minDate,
                    maxDate,
                    mode,
                    maxRange,
                    allowSameDay,
                    start,
                    defaultValue,
                    value,
                    maxSize,
                    formatter
                });
            }
        }
    },
    lifetimes: {
        created () {
            this.status = 'created';
            this.monthTitle = '';
            this.calendar = new Calendar();
        },
        ready () {
            this.status = 'ready';
            if (!this.calendar.init) {
                this.updateDataByProps(this.data);
            }
            if (this.data.visible) {
                this.intersectionObserver();
            }
        },
        detached () {
            if (this.contentObserver != null) {
                this.contentObserver.disconnect();
            }
        }
    },
    methods: {
        onSelect (e) {
            const { monthIndex , dateIndex  } = e.currentTarget.dataset;
            const date = this.data.monthList[monthIndex].dateList[dateIndex];
            if (date.status === DateStatusEnum.DISABLED) {
                const error = {
                    type: 'disabled',
                    message: '当前日期禁用'
                };
                // eslint-disable-next-line @titian-design/check-life-items
                this.triggerEvent('error', {
                    error,
                    date,
                    currentDate: this.calendar.data
                });
                return;
            }
            if (this.calendar.controlled) {
                this.triggerEvent('select', {
                    date,
                    currentDate: this.calendar.currentDate
                });
                return;
            }
            const gen = this.calendar.calcUpdateData(date);
            let genNext = gen.next();
            while(!genNext.done){
                const error1 = genNext.value;
                // eslint-disable-next-line @titian-design/check-life-items
                this.triggerEvent('error', {
                    error: error1,
                    date,
                    currentDate: this.calendar.data
                });
                genNext = gen.next();
            }
            const updateData = genNext.value;
            if (updateData) {
                this.setData(updateData, ()=>{
                    this.calendar.monthList = this.data.monthList;
                });
                this.triggerEvent('select', {
                    date,
                    currentDate: this.calendar.data
                });
            }
        },
        intersectionObserver () {
            if (this.contentObserver != null) {
                this.contentObserver.disconnect();
            }
            this.contentObserver = this.createIntersectionObserver({
                thresholds: [
                    0,
                    0.1,
                    0.9,
                    1
                ],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dataset: true,
                observeAll: true
            });
            this.contentObserver.relativeTo('.titian-calendar-header');
            this.contentObserver.observe('.titian-calendar-month', (res)=>{
                if (res.intersectionRatio > 0.1) {
                    const { title , id  } = res.dataset;
                    if (this.monthTitle === title) {
                        return;
                    }
                    this.monthTitle = title;
                    this.calendar.id = id;
                    this.setData({
                        monthTitle: title
                    });
                }
            });
        },
        updateDataByProps ({ minDate , maxDate , mode , maxRange , allowSameDay , start , defaultValue , value , maxSize , formatter  }) {
            this.minDate = minDate;
            this.maxDate = maxDate;
            this.mode = mode;
            this.maxRange = maxRange;
            this.allowSameDay = allowSameDay;
            this.maxSize = maxSize;
            this.start = start;
            this.defaultValue = defaultValue;
            this.value = value;
            this.formatter = formatter;
            this.calendar.isControlled(value);
            this.calendar.changeProps({
                minDate,
                maxDate,
                mode,
                maxRange,
                allowSameDay,
                start,
                defaultValue,
                value,
                maxSize,
                formatter
            });
            this.setData({
                monthList: this.calendar.monthList,
                week: this.calendar.week
            }, ()=>{
                this.triggerEvent('select', {
                    date: null,
                    currentDate: this.calendar.data
                });
                if (this.data.visible && !this.calendar.controlled) {
                    this.setData({
                        id: this.calendar.id
                    });
                }
            });
        },
        onClose () {
            this.triggerEvent('close');
        },
        onConfirm () {
            this.triggerEvent('confirm', this.calendar.data);
        },
        noop () {}
    }
});
