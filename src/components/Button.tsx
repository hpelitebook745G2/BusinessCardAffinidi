import {Layout} from '@config/theme';
import {colors} from '@constants';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  disabled?: boolean;
  completed?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  onPress?: () => void;
  text?: string;
};

const Button = React.memo((props: Props) => {
  const {strongUpperText} = Layout();

  const buttonStyle = () => {
    let style: ViewStyle = styles.button;

    if (props.disabled) {
      style = {
        ...style,
        backgroundColor: colors.inActiveBtn,
        borderColor: colors.border,
      };
    } else {
      style = {
        ...style,
        backgroundColor: colors.primary,
        borderColor: colors.border,
      };
    }

    return style;
  };

  const textStyle = () => {
    let style = {...strongUpperText, ...styles.buttonText, ...props.textStyle};

    if (props.disabled) {
      style = {...style, ...props.textStyle, color: colors.white};
    }

    return style;
  };

  return (
    <View style={props.style}>
      <TouchableOpacity
        style={buttonStyle()}
        onPress={props.onPress}
        disabled={props.disabled}>
        <Text style={textStyle()}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    padding: 10,
    color: colors.white,
  },
});

export default Button;
