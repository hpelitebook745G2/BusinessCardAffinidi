import {images} from '@/constants';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

type Props = {
  isStarred: boolean;
  onStar: () => void;
  style?: ViewStyle;
  isDisabled?: boolean;
};

const Starbox = React.memo((props: Props) => {
  const source = props.isStarred ? images.STARRED : images.UNSTARRED;

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onStar}
      style={props.style}>
      <Image source={source} style={styles.icStar} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  icStar: {
    width: 30,
    height: 30,
  },
});

export default Starbox;
