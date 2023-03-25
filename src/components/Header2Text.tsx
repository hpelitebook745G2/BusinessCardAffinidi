import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  text?: string;
  style?: TextStyle;
};

const Header2Text = React.memo((props: Props) => {
  return <Text style={[styles.txt, props.style]}>{props.text}</Text>;
});

const styles = StyleSheet.create({
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default Header2Text;
