export type ModalInitialStateType = {
  isVisible: boolean;
  modalOptions?: ModalOptionsType;
};

export type ModalOptionsType = {
  modalType: string;
  buttonType: string;
  headerText: string;
  contentText: string;
  txtLeft?: string;
  txtRight?: string;
  txtBtn?: string;
  onPressBtnLeft?: () => void;
  onPressBtnRight?: () => void;
  onPressBtn?: () => void;
};
