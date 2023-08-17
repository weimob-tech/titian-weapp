var ETagVariant;
(function(ETagVariant) {
    ETagVariant[/** 实心 */ "CONTAINED"] = 'contained';
    ETagVariant[/** 填充 */ "FILLED"] = 'filled';
    ETagVariant[/** 描边 */ "OUTLINED"] = 'outlined';
})(ETagVariant || (ETagVariant = {}));
var ETagSize;
(function(ETagSize) {
    ETagSize[/** 小 */ "SMALL"] = 'small';
    ETagSize[/** 中 */ "MEDIUM"] = 'medium';
    ETagSize[/** 大 */ "BIG"] = 'big';
})(ETagSize || (ETagSize = {}));
var ETagShape;
(function(ETagShape) {
    ETagShape[/** 圆角胶囊 */ "CAPSULE"] = 'capsule';
    ETagShape[/** 圆角 */ "ROUND"] = 'round';
    ETagShape[/** 矩形 */ "RECT"] = 'rect';
    ETagShape[/** 树叶形 */ "LEAF"] = 'leaf';
})(ETagShape || (ETagShape = {}));
export { ETagVariant, ETagSize, ETagShape };
