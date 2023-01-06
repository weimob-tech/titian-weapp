import BasicComponent from '../common/basic/BasicComponent';

const defaultActions = { composed: true, bubbles: true };

enum TabBarItemStateEnum {
  'SELECT' = 'select',
  'NO_SELECT' = 'no_select'
}
BasicComponent({
  parent: 'tabbar',
  relationAction() {
    this.updateDataFromParent();
  },
  properties: {
    value: null,
    icon: String,
    title: String,
    activeColor: {
      type: String,
      value: '#FF2E2E'
    },
    color: {
      type: String,
      value: '#757575'
    },
    iconSize: {
      type: Number,
      value: 48
    },
    titleSize: {
      type: Number,
      value: 20
    },
    extStyle: String
  },
  data: {
    status: TabBarItemStateEnum.NO_SELECT
  },
  lifetimes: {
    attached() {
      this.updateDataFromParent();
    }
  },
  methods: {
    onClick() {
      if (!this.parent) {
        return;
      }
      const { parent } = this;
      const { value, icon, title } = this.data;
      let idx = -1;
      const index = parent.children.indexOf(this);
      idx = index;
      const active = this.data.value || index;
      this.triggerEvent('click', { value, icon, title, index: idx }, defaultActions);
      parent.switch(active);
    },
    updateDataFromParent() {
      if (!this.parent) {
        return;
      }
      const { parent } = this;
      const state = {
        activeColor: parent.data.activeColor || this.data.activeColor,
        color: parent.data.color || this.data.color,
        iconSize: parent.data.iconSize || this.data.iconSize,
        titleSize: parent.data.titleSize || this.data.titleSize
      };
      const index = parent.children.indexOf(this);
      const active = this.data.value || index;
      if (parent.selectValue === active) {
        this.setData({ status: TabBarItemStateEnum.SELECT, ...state });
        return;
      }
      this.setData({ status: TabBarItemStateEnum.NO_SELECT, ...state });
    }
  }
});
