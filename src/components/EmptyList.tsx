import {animations} from '@/constants';
import Lottie from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import SubText from './SubText';

const EmptyList = React.memo(() => {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        ref={animationRef}
        source={animations.EMPTYLIST}
        resizeMode="contain"
        style={styles.anim}
      />

      <SubText
        style={styles.txtEmpty}
        text={
          'List is empty...\n\nLooks like you need to add more connections!'
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloud: {
    height: 150,
  },
  txtEmpty: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },

  anim: {
    height: 300,
    width: '100%',
  },
});

export default EmptyList;
