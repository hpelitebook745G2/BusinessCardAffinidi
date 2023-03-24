import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import {BusinessCard} from '@/models/ContactsModel';
import React from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, View} from 'react-native';
import Header2Text from './Header2Text';
import Starbox from './Starbox';
import SubText from './SubText';

type Props = {
  businessCard: BusinessCard;
  style?: TextStyle;
  onStar: () => void;
  onPress: () => void;
};

const {row, column, cardShadow, justifyContentBetween} = Layout();

const CardRow = React.memo((props: Props) => {
  const {
    style,
    businessCard: {
      givenName,
      familyName,
      phoneNumbers,
      emailAddresses,
      note,
      isStarred,
    },
    onStar,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <View style={[row, justifyContentBetween]}>
        <View style={[column]}>
          <Header2Text
            text={givenName + ' ' + familyName + ' - ' + phoneNumbers[0].number}
            style={styles.cardTitle}
          />
          <SubText
            text={emailAddresses[0].email}
            style={styles.subtext}
            otherProps={{numberOfLines: 1}}
          />
        </View>
        <Starbox isStarred={isStarred} onStar={onStar} />
      </View>
      {note ? (
        <>
          <View style={styles.separator} />
          <SubText
            text={note}
            style={styles.subtext}
            otherProps={{
              multiline: true,
              numberOfLines: 3,
              ellipsizeMode: 'tail',
            }}
          />
        </>
      ) : null}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    ...cardShadow,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  cardTitle: {fontSize: 16},
  subtext: {
    fontSize: 14,
    marginTop: 5,
  },
  separator: {height: 1, backgroundColor: colors.mildGray, marginVertical: 10},
});

export default CardRow;
