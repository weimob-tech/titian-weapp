function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
let Modal = class Modal {
    close() {
        if (this.node) {
            this.node.setData({
                visible: false
            }, ()=>{
                if (this.options && this.options.onClose) {
                    this.options.onClose();
                }
            });
        }
        return this.node;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData(data, callback) {
        if (this.node) {
            this.node.setData({
                ...data
            }, ()=>{
                if (callback) {
                    callback.apply(this.node);
                }
            });
        }
    }
    open() {
        if (this.node) {
            this.node.setData({
                visible: true
            }, ()=>{
                if (this.options && typeof this.options.onOpen === 'function') {
                    this.options.onOpen();
                }
            });
        }
        return this.node;
    }
    clear() {
        if (this.node) {
            this.node.setData({
                visible: false
            }, ()=>{
                if (this.options && this.options.onClose) {
                    this.options.onClose();
                }
            });
        }
        return this.node;
    }
    constructor(modalOptions){
        this.node = null;
        this.options = null;
        const options = modalOptions;
        const context = options.context || getContext();
        this.node = context.selectComponent(options.selector);
        if (!this.node) {
            // eslint-disable-next-line no-console
            console.error(`未找到 ${options.selector} 节点，请确认 selector 及 context 是否正确`);
            return;
        }
        this.options = options;
        this.node.setData(options);
        if (this.options.duration && this.options.duration > 0) {
            this.node.timer = setTimeout(()=>{
                this.clear();
            }, this.options.duration);
        }
    }
};
export { Modal as default };
