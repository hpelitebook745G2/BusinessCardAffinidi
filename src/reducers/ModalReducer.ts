import {ModalInitialStateType} from '@/models/ModalModel';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const modalInitialState: ModalInitialStateType = {
  isVisible: false,
  modalOptions: {
    modalType: '',
    buttonType: '',
    headerText: '',
    contentText: '',
    txtLeft: '',
    txtRight: '',
    txtBtn: '',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalInitialStateType>) => {
      const {isVisible, modalOptions} = action.payload;
      state.isVisible = isVisible;
      state.modalOptions = modalOptions;
    },
    dismissModal: () => modalInitialState,
  },
  extraReducers: builder => {},
});

export const {showModal, dismissModal} = modalSlice.actions;

export default modalSlice.reducer;
