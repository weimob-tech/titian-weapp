/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicComponent from '../common/basic/BasicComponent';
import { $tiToast } from '../index';

BasicComponent({
  externalClasses: ['ext-main-action-class', 'ext-sub-action-class'],
  properties: {
    skus: Array,
    specs: Array,
    value: String,
    visible: Boolean,
    defaultDispayInfo: { type: Object, value: {} },
    priceUnit: String,
    mainActionText: String,
    hasSubAction: Boolean,
    subActionText: String,
    hasActionSlot: Boolean,
    hasQuantityEditor: {
      type: Boolean,
      value: true
    },
    hasActionBar: {
      type: Boolean,
      value: true
    },
    hasSelectedSpecsText: {
      type: Boolean,
      value: true
    },
    toastSelector: String
  },
  data: {
    skuCountMap: new Map() as Map<string, number>,
    selectedOptions: [] as any[],
    selectedOptionIds: [] as string[],
    displaySkuViewModel: {},
    selectedSku: null as any,
    innerCount: 0,
    maxCount: 0
  },
  observers: {
    skus: function generateSkuCountMap(skus) {
      const skuCountMap = new Map();
      skus.forEach((s: any) => {
        skuCountMap.set(s.skuId, s.initCount);
      });

      this.setData({
        skuCountMap
      });
    },
    'selectedSku, selectedOptions': function generateVM(selectedSku, selectedOptions) {
      this.generateDisplaySkuViewModel(selectedSku, selectedOptions);
    }
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onSkuChange(event: any) {
      const { value } = event.detail;
      this.setData({
        selectedSku: value
      });
    },
    onSkuOptionChange(event: any) {
      const { options, optionIds } = event.detail;
      this.setData({
        selectedOptions: options,
        selectedOptionIds: optionIds
      });
    },

    generateDisplaySkuViewModel(selectedSku: any, selectedOptions: any[]) {
      if (this.data.defaultDispayInfo === null) {
        return;
      }
      let displayVM = this.data.defaultDispayInfo;
      const { specs } = this.data;
      let { stock, maxLimitBuy } = this.data.defaultDispayInfo;
      // -1 即为默认的 SKU，为空
      if (selectedSku === null) {
        displayVM = this.data.defaultDispayInfo;
      } else {
        displayVM = { ...selectedSku };
        stock = displayVM.stock;
        maxLimitBuy = displayVM.maxLimitBuy;
      }

      const vm = { ...displayVM, stockText: '', specsText: '' };
      vm.stockText = `库存：${displayVM.stock}件`;

      if (specs.length > 0) {
        if (selectedSku !== null) {
          vm.specsText = `已选：${displayVM.specOptionDesc.join('/')}`;
        } else if (selectedOptions.length > 0) {
          const text = selectedOptions.map((i: any) => i.label).join('/');
          vm.specsText = `已选：${text}`;
        } else if (selectedOptions.length === 0) {
          const text = specs.map((s: any) => s.label).join('/');
          vm.specsText = `请选择：${text}`;
        }
      }

      const innerCount = selectedSku ? this.data.skuCountMap.get(selectedSku.skuId) : 1;

      this.setData({
        innerCount,
        maxCount: maxLimitBuy || stock,
        displaySkuViewModel: vm
      });
    },

    onCountChange(event: InputEvent) {
      let value = event.detail;

      const { selectedSku, defaultDispayInfo } = this.data;
      let { stock } = defaultDispayInfo;
      if (selectedSku !== null) {
        stock = selectedSku.stock;
      } else {
        const text = this.getToastText();
        $tiToast({
          selector: this.data.toastSelector
        }).info(`请选择 ${text}`);

        return;
      }

      if (value > stock) {
        value = stock;
      }
      if (value < 1) {
        value = 1;
      }

      if (selectedSku !== null) {
        this.data.skuCountMap.set(selectedSku.skuId, value);
      }

      this.setData({
        innerCount: value
      });
    },

    getToastText() {
      const { specs, selectedOptions } = this.data;
      const unselected = specs.filter((s) => !s.options.find((x: any) => selectedOptions.includes(x.optionId)));
      if (unselected.length) {
        const text = unselected.map((i: any) => i.label).join('/');
        return text;
      }
      return '';
    },

    onTapAction(event: WechatMiniprogram.TouchEvent) {
      const { type } = event.target.dataset;

      const { selectedSku } = this.data;
      if (selectedSku === null) {
        const text = this.getToastText();
        $tiToast({
          selector: this.data.toastSelector
        }).info(`请选择 ${text}`);

        return;
      }

      this.triggerEvent(type, {
        sku: selectedSku,
        count: this.data.innerCount
      });
    }
  }
});
