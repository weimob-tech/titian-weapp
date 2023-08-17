import transition from '../behaviors/transition';
import BasicComponent from '../common/basic/BasicComponent';
import { getWindowHeightForRPX } from '../common/utils/index';
BasicComponent({
    behaviors: [
        transition({
            name: 'slide-up'
        })
    ],
    properties: {
        useSlot: Boolean,
        visibilityHeight: Number,
        text: String,
        duration: {
            type: Number,
            value: 300
        }
    },
    lifetimes: {
        attached () {
            const pages = getCurrentPages();
            const page = pages[pages.length - 1];
            const pageScroll = page?.onPageScroll?.bind(page);
            page.onPageScroll = (e)=>{
                if (e) {
                    const { scrollTop  } = e;
                    this.changeScrollTop(scrollTop);
                }
                if (pageScroll) {
                    pageScroll(e);
                }
            };
        }
    },
    methods: {
        changeScrollTop (val) {
            const { show , visibilityHeight  } = this.data;
            const targetShow = val > (visibilityHeight || getWindowHeightForRPX());
            if (targetShow === show) {
                return;
            }
            this.setData({
                show: targetShow
            });
        },
        onClick () {
            const { duration  } = this.data;
            this.triggerEvent('click');
            wx.pageScrollTo({
                scrollTop: 0,
                duration
            });
        }
    }
});
