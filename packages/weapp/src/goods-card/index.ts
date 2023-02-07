import BasicComponent from '../common/basic/BasicComponent';

interface IGoodsCart {
  name: string;
  title: string;
  imageUrl: string;
  priceUnit: string;
  price: number;
  pricePrefix: string;
  pricePostfix: string;
  priceLabel: string;
  hasSubPrice: boolean;
  subPriceLabel: string;
  subPrice: number;
  stockText: string;
  specsText: string;
  hasSelectedSpecsText: boolean;
}

BasicComponent({
  properties: {
    goodsData: {
      type: Object
    },
    extStyle: String
  },
  methods: {
    onClick(e: WechatMiniprogram.TouchEvent) {
      this.triggerEvent('click-image', e);
    }
  }
});
