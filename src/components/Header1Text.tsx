import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  text?: string;
  style?: TextStyle;
};

const Header1Text = React.memo((props: Props) => {
  return <Text style={[props.style, styles.txt]}>{props.text}</Text>;
});

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default Header1Text;
