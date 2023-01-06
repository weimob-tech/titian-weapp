export interface IDialogProps {
  title?: string;
  content?: string;
  hasCancelButton?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
  isTextButton?: boolean;
  extClass?: string;
  extStyle?: string;
}

export interface IDialogStaticOptions {
  confirmBtnText: string;
  cancelBtnText: string;
  isTextButton: boolean;
  hasCancelButton: boolean;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
}
