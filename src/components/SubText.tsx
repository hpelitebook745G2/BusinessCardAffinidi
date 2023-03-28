import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  text?: string;
  style?: TextStyle;
  otherProps?: any;
  onPress?: () => void;
};

const SubText = React.memo((props: Props) => {
  return (
    <Text
      {...props.otherProps}
      style={[styles.txt, props.style]}
      onPress={props.onPress}>
      {props.text}
    </Text>
  );
});

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    color: colors.subHeaderText,
  },
});

export default SubText;
