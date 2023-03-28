import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import React, {FC, memo} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
} from 'react-native';

interface EditTextProps extends TextInputProps, TextProps {
  isMandatory?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const {cardShadow} = Layout();

export const EditText: FC<EditTextProps> = props => {
  const {isMandatory, value, style} = props;

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        isMandatory && !value
          ? ({borderWidth: 1, borderColor: colors.red} as TextStyle)
          : null,
        style,
      ]}
      placeholderTextColor={colors.inActiveBtn}
    />
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white},
  content: {
    backgroundColor: colors.background,
  },
  input: {
    ...cardShadow,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 15,
    marginHorizontal: 20,
    color: colors.subHeaderText,

    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default memo(EditText);
