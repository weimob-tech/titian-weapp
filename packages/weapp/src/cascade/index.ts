/* eslint-disable class-methods-use-this */
import BasicComponent from '../common/basic/BasicComponent';
import Cascade, { Option } from './cascade';

BasicComponent<
  { columnValueList: Option[]; columnList: Option[][]; last: number },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption,
  {
    cascadeHelper: Cascade;
    code: string;
    value: unknown[];
    options: Option[];
    cascade: string;
  }
>({
  properties: {
    tabs: { type: Array, value: [] },
    titlebar: { type: Boolean, value: true },
    title: { type: String, value: '选择地址' },
    subTitle: String,
    code: { type: String, value: 'code' },
    label: { type: String, value: 'label' },
    value: { type: Array, value: [] },
    options: { type: Array, value: [] },
    active: { type: Number, value: 0 },
    getOptions: null,
    cascade: { type: String, value: 'children' },
    extHeaderStyle: String,
    extTabStyle: String,
    extOptionItemStyle: String
  },
  lifetimes: {
    ready() {
      const { options, cascade, code, value } = this.data;
      this.code = code;
      this.value = value;
      this.options = options;
      this.cascade = cascade;
      this.createCascade();
    }
  },
  observers: {
    // eslint-disable-next-line func-names
    'code,value,options,cascade': function (code: string, value: unknown[], options: Option[], cascade: string) {
      if (this.code !== code || this.value !== value || this.options !== options || this.cascade !== cascade) {
        this.code = code;
        this.value = value;
        this.options = options;
        this.cascade = cascade;
        this.createCascade();
      }
    }
  },
  data: {
    columnValueList: [],
    last: 0,
    columnList: []
  },
  methods: {
    onSelectTab(event: MouseEvent) {
      const { dataset } = event.currentTarget as HTMLElement;
      const { columnList } = this.data;
      const active = Number(dataset.index);
      if (active + 1 > columnList.length) {
        return;
      }
      if (this.data.active === active) {
        return;
      }
      this.setData({ active }, () => {
        this.triggerEvent('changeSwiper', { source: '', current: active });
      });
    },
    async onSelect(event: MouseEvent) {
      const { dataset } = event.currentTarget as HTMLElement;
      const index = Number(dataset.index);
      const { id } = dataset;
      const { columnList, code, columnValueList } = this.data;

      const data = await this.cascadeHelper.getNextData({
        columnList,
        columnValueList,
        index,
        code,
        id
      });
      if (data) {
        const { value, options } = this.cascadeHelper.getResult({
          columnValueList: data.columnValueList,
          code
        });
        const active = typeof data.active === 'number' ? data.active : this.data.active;
        this.triggerEvent('change', { value, options, active });
        this.setData(data);
      }
    },
    onChangeSwiper(event: CustomEvent) {
      const { source, current } = event.detail;
      if (source === 'touch') {
        this.setData({ active: current }, () => {
          this.triggerEvent('changeSwiper', { source, current });
        });
      }
    },
    async createCascade() {
      const { tabs, options, getOptions, cascade, active, code, value } = this.data;
      this.cascadeHelper = new Cascade({ tabs, options, getOptions, cascade });
      const data = await this.cascadeHelper.getData(active, code, value);
      this.setData(data);
    },
    onClose() {
      this.triggerEvent('close');
    }
  }
});
