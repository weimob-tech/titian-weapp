/**
 * TODO:
 *  难以扩展,只能限制在配置内使用
 *  扩展方向:与picker-column重新组织
 */

/* eslint-disable func-names */
import BasicComponent from '../common/basic/BasicComponent';
import getCurYear, {
  DateTimePickerColumnEnum,
  DateTimePickerEnum,
  DateTimePickerHelper,
  getOrderPickerValue,
  getOrderValue,
  DateTimeTypeMapping
} from './utils';

const currentYear = getCurYear();

BasicComponent<
  {
    yearOption: unknown[];
    yearValue: unknown;
    monthOption: unknown[];
    monthValue: unknown;
    dayOption: unknown[];
    dayValue: unknown;
    hourOption: unknown[];
    hourValue: unknown;
    minuteOption: unknown[];
    minuteValue: unknown;
    pickerSort: DateTimePickerColumnEnum[];
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption,
  {
    max: number;
    result: number;
    helper: DateTimePickerHelper;
  }
>({
  externalClasses: ['ext-hairline-class', 'ext-mask-class', 'ext-option-class', 'ext-option-item-class'],
  properties: {
    value: null,
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime()
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime()
    },
    filter: null,
    formatter: null,
    loading: Boolean,
    type: {
      type: String,
      value: DateTimePickerEnum.DATE
    },
    sort: {
      type: Array,
      value: [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH, DateTimePickerColumnEnum.DAY]
    },
    label: {
      type: String,
      value: 'label'
    },
    titlebar: {
      type: Boolean,
      value: true
    },
    title: { type: String, value: '标题' },
    subTitle: String,
    confirmText: { type: String, value: '确定' },
    cancelText: { type: String, value: '取消' },
    visibleItemCount: { type: Number, value: 5 },
    optionItemHeight: {
      type: Number,
      optionalTypes: [String],
      value: 108
    },
    yearUseSelectSlot: Boolean,
    monthUseSelectSlot: Boolean,
    dayUseSelectSlot: Boolean,
    hourUseSelectSlot: Boolean,
    minuteUseSelectSlot: Boolean,
    extStyle: String,
    extOptionStyle: String
  },
  data: {
    yearOption: [],
    yearValue: '',
    monthOption: [],
    monthValue: '',
    dayOption: [],
    dayValue: '',
    hourOption: [],
    hourValue: '',
    minuteOption: [],
    minuteValue: '',
    pickerSort: []
  },
  observers: {
    'value,minDate,maxDate,type, label, sort, formatter, filter': function (...params) {
      if (this.status !== 'ready') return;
      const [value, minDate, maxDate, type, label, sort, formatter, filter] = params;
      if (
        this.helper.value !== value ||
        this.helper.minDate !== minDate ||
        this.helper.maxDate !== maxDate ||
        this.helper.type !== type ||
        this.helper.label !== label ||
        this.helper.sort !== sort ||
        this.helper.formatter !== formatter ||
        this.helper.filter !== filter
      ) {
        this.updateValue({
          value,
          minDate,
          maxDate,
          type,
          label,
          sort,
          formatter,
          filter
        });
      }
    }
  },
  lifetimes: {
    created() {
      this.status = 'created';
      this.helper = new DateTimePickerHelper();
      this.result = 0;
      this.max = 0;
    },
    ready() {
      this.status = 'ready';
      if (!this.helper.isChangeProps) {
        this.updateValue(this.data);
      }
    }
  },
  methods: {
    onCalendarChange(e: WechatMiniprogram.CustomEvent) {
      const { colAlias, value } = e.detail;
      const { type } = this.data;
      if (!colAlias) {
        this.result += 1;
        if (this.result < this.max) {
          return;
        }
        this.result = 0;
      }
      if (
        (type === DateTimePickerEnum.YEARMONTH && colAlias === DateTimePickerColumnEnum.YEAR) ||
        (type === DateTimePickerEnum.DATE &&
          (colAlias === DateTimePickerColumnEnum.YEAR || colAlias === DateTimePickerColumnEnum.MONTH)) ||
        (type === DateTimePickerEnum.DATETIME &&
          (colAlias === DateTimePickerColumnEnum.YEAR ||
            colAlias === DateTimePickerColumnEnum.MONTH ||
            colAlias === DateTimePickerColumnEnum.DAY ||
            colAlias === DateTimePickerColumnEnum.HOUR))
      ) {
        const newValue = getOrderPickerValue(type, value).map(
          (item: { colAlias: DateTimePickerColumnEnum; value: string }) => {
            if (item.colAlias === 'month') {
              return Number.parseInt(item.value, 10) - 1;
            }
            return Number.parseInt(item.value, 10);
          }
        ) as [number, number, number];
        const day = new Date(newValue[0], newValue[1] + 1, 0).getDate();
        newValue[2] = newValue[2] > day ? day : newValue[2];

        if (type === DateTimePickerEnum.YEARMONTH) {
          const min = new Date(this.minDate);
          const [minYear, minMonth] = [min.getFullYear(), min.getMonth()];
          const max = new Date(this.maxDate);
          const [maxYear, maxMonth] = [max.getFullYear(), max.getMonth()];
          if (minYear === newValue[0] && minMonth === newValue[1]) {
            newValue[2] = min.getDate();
          } else if (maxYear === newValue[0] && maxMonth === newValue[1]) {
            newValue[2] = max.getDate();
          } else {
            newValue[2] = 1;
          }
        }

        const newDate = new Date(...newValue);
        this.helper.changeValue(newDate);
        this.helper.setPickValue();
        this.helper.setScope();
        this.helper.setPickColumns();
        let list = DateTimeTypeMapping[type as DateTimePickerEnum];
        const start = list.findIndex((item: any) => item === colAlias);
        if (start === list.length - 1) {
          return;
        }
        list = list.slice(start + 1, list.length);
        const update = list.reduce((target: { [x: string]: any }, item: any) => {
          const optionKey = `${item}Option`;
          const valueKey = `${item}Value`;
          target[optionKey] = this.helper[optionKey as keyof DateTimePickerHelper];
          target[valueKey] = this.helper[valueKey as keyof DateTimePickerHelper];
          return target;
        }, {});
        this.max = Object.keys(update).length / 2;
        this.setData(update);
        return;
      }
      const val = getOrderValue(type, value);
      this.helper.changeValue(val);
      this.helper.setPickValue();
      this.triggerEvent('change', { type, value: this.helper.standardValue });
    },
    onCalendarCancel(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      const { type } = this.data;
      const val = getOrderValue(type, value);
      this.helper.changeValue(val);
      this.triggerEvent('cancel', { type, value: this.helper.standardValue });
    },
    onCalendarConfirm(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      const { type } = this.data;
      const val = getOrderValue(type, value);
      this.helper.changeValue(val);
      this.triggerEvent('confirm', { type, value: this.helper.standardValue });
    },
    updateValue(params: Parameters<typeof this.helper.changeProps>[0]) {
      const data = this.helper.changeProps(params);
      this.max = this.helper.sort.length;
      this.setData(data);
    },
    noop() {}
  }
});
