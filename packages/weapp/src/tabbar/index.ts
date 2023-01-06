import BasicComponent from '../common/basic/BasicComponent';

const defaultActions = { composed: true, bubbles: true };

enum SeparationEnum {
  BORDER = 'border',
  SHADOW = 'shadow',
  EMPTY = ''
}
BasicComponent({
  children: 'tabbar-item',
  externalClasses: ['ext-option-class'],
  properties: {
    value: {
      type: null,
      observer: 'observer'
    },
    placeholder: {
      type: Boolean,
      value: true,
      observer: 'heightObserver'
    },
    separation: {
      type: String,
      value: SeparationEnum.EMPTY // border || shadow || ''
    },
    options: {
      type: Array,
      value: []
    },
    safeArea: {
      type: Boolean,
      value: true
    },
    activeColor: String,
    color: String,
    iconSize: Number,
    titleSize: Number,
    extOptionStyle: String,
    extStyle: String
  },
  data: {
    height: 0
  },
  lifetimes: {
    attached() {
      this.updateChildren();
    }
  },
  methods: {
    heightObserver() {
      const query = wx.createSelectorQuery().in(this);
      query
        .select('.titian-tab-bar')
        .boundingClientRect((rect) => {
          if (rect) {
            this.setData({
              height: rect.height
            });
          }
        })
        .exec();
    },
    observer() {
      const { value } = this.data;
      this.selectValue = value;
      this.updateChildren();
    },
    updateChildren() {
      (this.children || []).forEach((child) => {
        child?.updateDataFromParent();
      });
    },

    switch(active: unknown) {
      this.selectValue = active;
      this.triggerEvent('select', this.selectValue, defaultActions);
      this.updateChildren();
    }
  }
});
