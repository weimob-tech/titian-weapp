/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import BasicComponent from '../common/basic/BasicComponent';
import { isPlainObject, getRect, nextTick, isString } from '../common/utils/index';

const TABS_TARGET = '.titian-tabs-scroll';
const TAB_TARGET = '.titian-tabs-nav-gap';
enum ETabsDivider {
  /** 细线分割 */
  LINE = 'line',

  /** 阴影分割 */
  SHADOW = 'shadow',

  /** 无分割 */
  DEFAULT = 'default'
}

enum ETabsVariant {
  /** 滑块风格 */
  BLOCK = 'block',

  /** 纯净型 */
  PURE = 'pure',

  /** 多行类型 */
  MULTI = 'multi',

  /** 日期类型 */
  DOUBLE = 'calendar'
}

BasicComponent<{
  currentTabWidth: number;
  systemInfo: WechatMiniprogram.SystemInfo;
  preTranslateX: number;
  unit: string;
  tabsName: [];
  tabsLength: [];
  currentCount: number;
  translateList: number[];
  isReady: boolean;
  activeIndex: number;
}>({
  externalClasses: ['tab-active-class', 'swiper-class', 'tabs-class', 'tabs-mark-class', 'tab-text-class'],
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    tabs: Array,
    disabledTabs: Array,
    duration: {
      type: Number,
      value: 500
    },
    count: {
      type: Number,
      value: 5
    },
    divider: {
      type: String,
      value: ETabsDivider.DEFAULT
    },
    variant: {
      type: String,
      value: ETabsVariant.PURE
    },
    activeTab: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    sticky: Boolean,
    tabWidth: Number,
    tabKey: {
      type: String,
      value: 'label'
    },
    useSlot: Boolean,
    extStyle: String,
    focusUpdate: {
      type: Boolean,
      value: true
    },
    gap: {
      type: Number,
      value: -1
    },
    autoGap: {
      type: Boolean,
      value: true
    },
    offsetTop: {
      type: Number,
      value: 0
    },
    usePureCss: Boolean,

    alias: {
      type: Object,
      value: {}
    },
    scrollWithAnimation: {
      type: Boolean,
      value: true
    },
    asyncChange: Boolean
  },
  data: {
    currentTabWidth: 0,
    systemInfo: wx.getSystemInfoSync(),
    preTranslateX: 0,
    unit: '',
    tabsName: [],
    tabsLength: [],
    currentCount: 0,
    translateList: [],
    isReady: false,
    activeIndex: 0
  },
  observers: {
    'count, tabs, activeTab': function fn(count, tabs, activeTab) {
      let tabsName = tabs;
      let { tabsLength } = this.data;
      let activeIndex = activeTab || 0;

      if (tabs.length > 0 && isPlainObject(tabs[0])) {
        tabsName = tabs.map((el: any) => el[this.data.alias.label || this.data.tabKey]);
      }

      if (tabs.length > 0 && isString(activeTab)) {
        activeIndex = tabsName.findIndex((el: string) => activeTab === el);
      }

      if (this.data.focusUpdate || tabsLength.length !== tabsName.length) {
        tabsLength = tabsName.map((_: any, index: number) => index);
      }
      const focusUpdate = tabsLength !== this.data.tabsLength;

      this.setData({ activeIndex, ...(focusUpdate ? { tabsLength } : {}) });
      if (count === this.data.count && JSON.stringify(tabsName) === JSON.stringify(this.data.tabsName)) {
        this.setData({ activeIndex, tabsName });
        return;
      }
      this.setData({ tabsName });
      if (tabs.length <= count && this.data.autoGap) {
        count = tabs.length;
      }

      nextTick(() => this.setTabWidth(count));
    },
    tabWidth: function fn(tabWidth) {
      if (tabWidth <= 0) return;
      let { count } = this.data;
      if (this.data.tabs.length <= count && this.data.autoGap) {
        count = this.data.tabs.length;
      }
      this.setTabWidth(count);
    }
  },
  methods: {
    onClick(event: WechatMiniprogram.CustomEvent) {
      const { index } = event.currentTarget.dataset;
      const message = {
        index,
        item: this.data.tabs[index]
      };
      this.triggerEvent('click', message);
      if (this.data.disabledTabs.includes(index)) {
        this.triggerEvent('disabled', message);
        return;
      }
      if (index !== this.data.activeIndex) {
        this.setData({ duration: 0 });
        if (!this.data.asyncChange) {
          this.setData({ activeIndex: index });
        }
      }
      this.triggerEvent('change', message);
    },
    onChange(event: WechatMiniprogram.SwiperChange) {
      let { current } = event.detail;
      if (current === this.data.activeIndex) return;
      if (this.data.disabledTabs.includes(current)) {
        // 跳过disabled的tab
        if (this.data.activeIndex < current) {
          current += 1;
          if (current > this.data.tabs.length - 1) {
            current = this.data.activeIndex;
          }
        } else if (this.data.activeIndex > current) {
          current -= 1;
          if (current < 0) {
            current = this.data.activeIndex;
          }
        }
      }
      this.setData({ activeIndex: current });
      const message = {
        index: current,
        item: this.data.tabs[current]
      };
      this.triggerEvent('change', message);
    },
    onAnimationfinish() {
      this.setData({ duration: 500 });
    },
    setTabWidth(count: number) {
      let currentCount = count;
      const { windowWidth } = this.data.systemInfo;
      getRect(this, TABS_TARGET).then((dom: { width: number }) => {
        const scrollViewWidth = Math.min(dom.width, windowWidth) || windowWidth;
        let currentTabWidth = count > 0 ? scrollViewWidth / count : 0;
        let unit = 'px';
        // 如果自定义了tab-width,则采用自定义宽度
        if (this.data.tabWidth > 0) {
          currentTabWidth = this.data.tabWidth;
          const widthPx = Math.floor((currentTabWidth * windowWidth) / 750);
          currentCount = Math.floor(scrollViewWidth / widthPx);
          currentCount = Math.max(currentCount, 3);
          unit = 'rpx';
          // 如果tab总宽度不够一屏，且采用autoGap，则采用平铺
          if (count && widthPx * count < scrollViewWidth && this.data.autoGap) {
            currentTabWidth = scrollViewWidth / count;
            currentCount = count;
            unit = 'px';
          }
        }
        if (this.data.gap < 0) {
          this.setData({ currentTabWidth, unit, isReady: true });
          // 兼容当activeTab在屏幕外时，自动滑动到当前项
          nextTick(() => this.setData({ currentCount }));
          return;
        }
        // 处理自定义gap, 等间距模式
        this.createSelectorQuery()
          .selectAll(TAB_TARGET)
          .boundingClientRect((rect) => {
            // @ts-ignore
            if (!rect || rect.length === 0) return;
            let translateList: number[] = [];
            // @ts-ignore
            currentCount = rect.length;
            let once = false;
            // @ts-ignore
            const tabTotalWidth = rect.reduce((p: number, c: { width: number }, index: number) => {
              const translate: number = p + c.width / 2;
              translateList.push(translate);
              const total = p + c.width;
              if (!once && total > scrollViewWidth) {
                currentCount = Math.max(index, 3);
                once = true;
              }
              return total;
            }, 0);
            // 如果tab总宽度不够一屏，且采用autoGap，则采用平铺
            let { gap } = this.data;
            unit = 'rpx';
            if (this.data.autoGap && !once) {
              unit = 'px';
              // @ts-ignore
              currentCount = rect.length;
              const more = (scrollViewWidth - tabTotalWidth) / currentCount;
              // 微信内联样式rpx转px,进度丢失,3rpx -> 1px  1rpx -> 0.5px。所以用如下写法
              let gapPx = Math.floor(((this.data.gap / 2) * windowWidth) / 750) * 2;
              if (this.data.gap > 0) {
                gapPx = Math.max(1, gapPx);
              }
              gap = gapPx + more;
              translateList = translateList.map((el, index) => el + more * index + more / 2);
            }
            this.setData({ translateList, gap, unit, isReady: true });
            // 兼容当activeTab在屏幕外时，自动滑动到当前项
            nextTick(() => this.setData({ currentCount }));
          })
          .exec();
      });
    },
    onFixed(event: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('fixed', event.detail);
    }
  }
});
