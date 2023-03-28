import {colors, images} from '@/constants';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {
  isVisible: boolean;
};

const CustomModal = (props: Props) => {
  const {isVisible} = props;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const {
    // isVisible,
    modalOptions: {
      txtLeft,
      txtRight,
      txtBtn,
      modalType,
      buttonType,
      headerText,
      contentText,
      onPressBtnLeft,
      onPressBtnRight,
      onPressBtn,
    },
  } = useSelector((state: any) => state.modal);

  let icon = images.WARNING;
  if (modalType === 'success') {
    icon = images.CHECK;
  } else if (modalType === 'error') {
    icon = images.ERROR;
  }

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (buttonType === 'single') {
        onPressBtn && onPressBtn();
      } else {
        onPressBtnLeft();
      }
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalMainView}>
        <Animated.View
          style={[styles.modalView, {transform: [{scale: scaleValue}]}]}>
          <Image source={icon} style={styles.modalIcon} />
          <Text style={styles.headerModalText}>{headerText}</Text>
          <Text style={styles.contentModalText}>{contentText}</Text>
          <View style={styles.buttonContainer}>
            {buttonType === 'single' ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={closeModal} style={styles.btnMiddle}>
                  <Text style={styles.txtRight}>{txtBtn}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={closeModal} style={styles.btnLeft}>
                  <Text style={styles.txtLeft}>{txtLeft}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressBtnRight}
                  style={styles.btnRight}>
                  <Text style={styles.txtRight}>{txtRight}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 20,
    // padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModalText: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.primary,
    marginHorizontal: 20,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
  contentModalText: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.secondary,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalIcon: {
    width: 48,
    height: 48,
    marginTop: 34,
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  btnMiddle: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  btnLeft: {
    flex: 0.5,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginRight: 5,
  },
  btnRight: {
    flex: 0.5,
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginLeft: 5,
  },
  txtLeft: {
    color: colors.secondary,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  txtRight: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
