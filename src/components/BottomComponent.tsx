import {Layout} from '@config/theme';
import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children?: ReactNode;
  style?: ViewStyle;
};

const {alignItemsCenter, bottomDockedShadow} = Layout();

const BottomComponent = React.memo((props: Props) => {
  return (
    <View style={[alignItemsCenter, styles.container, props.style]}>
      {props.children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...bottomDockedShadow,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
});

export default BottomComponent;
