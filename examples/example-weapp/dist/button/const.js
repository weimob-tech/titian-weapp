var EButtonVariant;
(function(EButtonVariant) {
    EButtonVariant[/** 实心 */ "CONTAINED"] = 'contained';
    EButtonVariant[/** 填充 */ "FILLED"] = 'filled';
    EButtonVariant[/** 描边 */ "OUTLINED"] = 'outlined';
    EButtonVariant[/** 文字 */ "TEXT"] = 'text';
})(EButtonVariant || (EButtonVariant = {}));
var EButtonSize;
(function(EButtonSize) {
    EButtonSize["TINY"] = 'tiny';
    EButtonSize["SMALL"] = 'small';
    EButtonSize["MEDIUM"] = 'medium';
    EButtonSize["BIG"] = 'big';
    EButtonSize["LARGE"] = 'large';
})(EButtonSize || (EButtonSize = {}));
var EButtonShape;
(function(EButtonShape) {
    EButtonShape[/** 圆角胶囊 */ "CAPSULE"] = 'capsule';
    EButtonShape[/** 圆角 */ "ROUND"] = 'round';
    EButtonShape[/** 矩形 */ "RECT"] = 'rect';
})(EButtonShape || (EButtonShape = {}));
var EButtonType;
(function(EButtonType) {
    EButtonType[/** 默认主题 */ "PRIMARY"] = 'primary';
    EButtonType[/** 警告 */ "WARNING"] = 'warning';
    EButtonType[/** 错误 */ "ERROR"] = 'error';
    EButtonType[/** 成功 */ "SUCCESS"] = 'success';
    EButtonType[/** 信息 */ "INFO"] = 'info';
    EButtonType[/** outlined 模式下可用，灰色调 */ "SIMPLE"] = 'simple';
})(EButtonType || (EButtonType = {}));
export { EButtonVariant, EButtonSize, EButtonShape, EButtonType };
