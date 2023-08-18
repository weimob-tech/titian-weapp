import BasicComponent from '../common/basic/BasicComponent';
import zIndexTool from '../common/utils/zIndexTool';

interface IPreviewItem {
  fileType: string;
  path: string;
  name?: string;
}

interface IPreviewData {
  list: IPreviewItem[];
  index: number;
  zIndex: number;
  visible: boolean;
  vertical: boolean;
}

BasicComponent<IPreviewData>({
  properties: {
    displayNumber: {
      type: Boolean,
      value: true
    },
    displayTitle: {
      type: Boolean,
      value: true
    }
  },
  data: {
    list: [],
    index: 0,
    vertical: false,
    visible: false,
    zIndex: Math.max(zIndexTool.getZIndex(), 11000)
  },
  methods: {
    show(list: IPreviewItem[] = [], index = 0) {
      this.setData({
        list,
        index,
        visible: true
      });
    },

    close(e: WechatMiniprogram.TouchEvent) {
      const isImageClick = e?.target?.id.indexOf('titian-preview-image') > -1;

      if (!isImageClick) {
        this.setData({
          styles: this.data.list.map(() => 'transform: matrix(1, 0, 0, 1, 0, 0)'),
          visible: false
        });
      }
    },
    handleSwiperChange(e: CustomEvent<{ current: number; source: string }>) {
      if (e.detail.source !== 'touch') {
        return;
      }
      this.triggerEvent('change', {
        current: e.detail.current,
        item: this.data.list?.[e.detail.current]
      });
      this.setData({
        index: e.detail.current
      });
    },
    fn() {}
  }
});
