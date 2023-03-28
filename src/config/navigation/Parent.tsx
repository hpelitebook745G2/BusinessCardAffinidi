import CustomModal from '@/components/CustomModal';
import {ModalInitialStateType} from '@/models/ModalModel';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../ReduxStore';
import AppNavigator from './AppNavigator';

export const Parent: FC = () => {
  const {isVisible} = useSelector<RootState, ModalInitialStateType>(
    state => state.modal,
  );

  return (
    <>
      <AppNavigator />
      <CustomModal isVisible={isVisible} />
    </>
  );
};
