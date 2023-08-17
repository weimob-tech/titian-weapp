import BasicComponent from '../common/basic/BasicComponent';
import { isPlainArray, nextTick } from '../common/utils/index';
BasicComponent({
    parent: 'steps',
    relationAction () {
        this.updateDataFromParent();
    },
    properties: {
        title: String,
        subtitle: String,
        description: String,
        time: String,
        icon: String,
        checked: null,
        extStyle: String,
        subtitleAlign: String,
        hasLine: Boolean,
        useTitleSlot: Boolean,
        useSubtitleSlot: Boolean,
        useDescriptionSlot: Boolean,
        useTimeSlot: Boolean,
        current: null
    },
    data: {
        checkedFormParent: null
    },
    lifetimes: {
        attached () {
            this.updateDataFromParent();
        }
    },
    methods: {
        updateDataFromParent () {
            nextTick(()=>{
                const { parent  } = this;
                if (!parent) return;
                const index = parent.children.indexOf(this);
                const current = this.data.current || parent.data.current;
                this.setData({
                    subtitleAlign: this.data.subtitleAlign || parent.data.subtitleAlign,
                    checkedFormParent: this.data.checked ?? this.checkCurrent(current, index),
                    hasLine: index !== parent.children.length - 1
                });
            });
        },
        checkCurrent (current, index) {
            if (isPlainArray(current)) {
                return current.indexOf(index) > -1;
            }
            return current === index;
        }
    }
});
