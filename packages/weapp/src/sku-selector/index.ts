/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicComponent from '../common/basic/BasicComponent';
import Graph from './graph';

BasicComponent({
  properties: {
    skus: Array,
    specs: Array,
    value: String,
    optionIds: Array
  },
  data: {
    graph: {} as Graph,
    allOptions: [],
    optionIdsToSpecIdMap: new Map() as Map<string, string>,
    disabledOptions: [] as string[],
    selectedOptions: [] as string[],
    soldoutOptions: [] as string[],
    specsViewModel: [] as object[],
    innerCount: 0,
    maxCount: 0
  },
  observers: {
    skus: function makeOptionIdsToSpecIdMap(skus) {
      // 建立 map，用 specs optionId 的组合来反查 skuId
      const map = new Map();
      skus.forEach((s: any) => {
        map.set(s.specOptionIds.sort().join(','), s.skuId);
      });

      this.setData({
        optionIdsToSpecIdMap: map
      });
    },
    specs: function makeAllOptions(specs) {
      const allOptions = specs.map((s: any) => s.options).reduce((x: any, y: any) => [...x, ...y], []);
      this.setData({
        allOptions
      });
    },
    'specs,skus': function makeGraph(specs, skus) {
      const graph = new Graph(specs, skus);
      this.setData({
        graph
      });
    },

    'value, optionIds': function makeSelectedOptions(value, optionIds) {
      const { skus } = this.data;
      let selectedOptions = [];
      if (value) {
        const defaultSku = skus.find((i) => i.skuId === value);
        selectedOptions = defaultSku?.specOptionIds || [];
      } else if (Object.prototype.toString.call(optionIds) === '[object Array]' && optionIds.length > 0) {
        selectedOptions = optionIds;
      }
      this.setData({
        selectedOptions
      });
    },
    selectedOptions: function makeOthersOptions(selectedOptions) {
      let disabledOptions = [];
      if (selectedOptions.length !== 0) {
        disabledOptions = selectedOptions
          .map((i: any) => [...(this.data.graph.nonConnectableEdges.get(i) || [])])
          .reduce((a: any, b: any) => [...a, ...b], []);
      }
      const soldoutOptions = selectedOptions
        .map((i: any) => [...(this.data.graph.soldoutEdges.get(i) || [])])
        .reduce((a: any, b: any) => [...a, ...b], []);

      this.setData({
        disabledOptions,
        soldoutOptions
      });
      this.generateSpecsViewModel(selectedOptions, disabledOptions, soldoutOptions);
      this.triggerChange();
    }
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    triggerChange() {
      // trigger events
      const { selectedOptions } = this.data;
      let selectedSku = null;

      if (selectedOptions.length === this.data.specs.length) {
        const key = [...selectedOptions].sort().join(',');
        const selectedSkuId = this.data.optionIdsToSpecIdMap.get(key) || this.value;

        const selected = this.data.skus.find((x) => x.skuId === selectedSkuId);
        selectedSku = selected;
      }

      this.triggerEvent('ti-change', {
        value: selectedSku
      });

      const selectedOptionObj = this.data.allOptions.filter((x: any) => selectedOptions.includes(x.optionId));

      this.triggerEvent('ti-option-change', {
        optionIds: selectedOptions,
        options: selectedOptionObj
      });
    },
    generateSpecsViewModel(selectedOptions: any[], disabledOptions: any[], soldoutOptions: any[]) {
      const { specs } = this.data;
      // 生成 specsViewModel
      if (specs.length === 0) {
        this.setData({
          specsViewModel: []
        });
        return;
      }
      const viewModel = specs.map((s: any) => ({
        ...s,
        options: s.options.map((o: any) => ({
          ...o,
          isSelected: selectedOptions.includes(o.optionId),
          isDisabled: disabledOptions.includes(o.optionId),
          isSoldout: soldoutOptions.includes(o.optionId)
        }))
      }));
      this.setData({
        specsViewModel: viewModel
      });
    },
    getSelectedSiblingOptionId(optionId: string) {
      return [...this.data.graph.siblingsEdges.get(optionId)].find(
        (x) => this.data.selectedOptions.includes(x) && x !== optionId
      );
    },
    onTapOptionHandler(event: WechatMiniprogram.TouchEvent) {
      const { optionId } = event.target.dataset;

      if (this.data.disabledOptions.includes(optionId)) return;
      // 仅多规格会触发该事件

      const toBeReplacedOptionId = this.getSelectedSiblingOptionId(optionId);
      let selectedOptions = [] as string[];

      if (toBeReplacedOptionId) {
        // replace 替换
        selectedOptions = [...this.data.selectedOptions.filter((x) => x !== toBeReplacedOptionId), optionId];
      } else if (this.data.selectedOptions.includes(optionId)) {
        // deselect 反选
        selectedOptions = this.data.selectedOptions.filter((x) => x !== optionId);
      } else {
        // select 选择
        selectedOptions = [...this.data.selectedOptions, optionId];
      }

      this.setData({
        selectedOptions
      });
    }
  }
});
