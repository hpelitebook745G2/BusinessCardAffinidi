import {Layout} from '@/config/theme';
import {images} from '@/constants';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SubText} from '.';
import Header2Text from './Header2Text';

type Props = {
  user?: string;
  cardNumber?: number;
  withBack?: boolean;
  isCreate?: boolean;
  isEditing?: boolean;
  onBack?: () => void;
  onRightBtn?: () => void;
};

const {row, column, alignItemsCenter} = Layout();

const Header = React.memo((props: Props) => {
  const {
    withBack,
    isCreate,
    isEditing = false,
    user,
    cardNumber,
    onBack,
    onRightBtn,
  } = props;
  const [avatars] = useState([
    'https://api.lorem.space/image/face?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/face?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/face?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/face?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/face?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/face?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/face?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/face?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/face?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/face?w=150&h=150&hash=2D297A22',
  ]);

  /* Picks a random answer word from the API response array  */
  const arrayRandomizer = (items: any) =>
    items[Math.floor(Math.random() * items.length)];

  return (
    <View style={styles.container}>
      {withBack ? (
        <TouchableOpacity style={styles.left} onPress={onBack}>
          <Image source={images.CHEVRONLEFT} style={styles.back} />
        </TouchableOpacity>
      ) : (
        <View style={styles.left}>
          <Header2Text text={`Hi ${user ?? ''}`} />
          <SubText
            text={`${cardNumber ?? 0} contact${
              cardNumber && cardNumber === 1 ? '' : 's'
            } listed`}
          />
        </View>
      )}
      <View style={styles.center}>
        {withBack ? (
          <Header2Text
            text={isCreate ? 'New Business Card' : 'Contact Details'}
          />
        ) : null}
      </View>
      <View style={styles.right}>
        {withBack ? (
          isCreate ? null : (
            <TouchableOpacity onPress={onRightBtn}>
              <Image
                source={isEditing ? images.CLOSE : images.EDIT}
                style={styles.icRight}
              />
            </TouchableOpacity>
          )
        ) : (
          <Image
            source={{uri: arrayRandomizer(avatars)}}
            style={styles.avatar}
          />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...row,
    ...alignItemsCenter,
    padding: 20,
  },
  left: {flex: 0.3333, ...column},
  center: {
    flex: 0.5,
    ...alignItemsCenter,
  },
  right: {
    flex: 0.3333,
    alignItems: 'flex-end',
  },
  back: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  icRight: {
    width: 20,
    height: 20,
  },
});

export default Header;
