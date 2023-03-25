import {RootState} from '@/config/ReduxStore';
import {Layout} from '@/config/theme';
import {FORM, ITEM} from '@/constants/routes';
import {BusinessCard, ContactsType} from '@/models/ContactsModel';
import {selectCard, setBusinessCards} from '@/reducers/ContactsReducer';
import {dismissModal, showModal} from '@/reducers/ModalReducer';
import {isIOS, requestAndroidPermission, requestIOSPermission} from '@/utils';
import {colors, images} from '@constants';
import {
  BottomComponent,
  Button,
  CardRow,
  EmptyList,
  Header,
  Header2Text,
  SubText,
} from 'components';
import React, {FC} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useDispatch, useSelector} from 'react-redux';

type ListScreenProps = {
  navigation?: any;
};

const ListScreen: FC = ({navigation}: ListScreenProps) => {
  const {fill, row, column, justifyContentBetween} = Layout();
  const dispatch = useDispatch();
  const {businessCards} = useSelector<RootState, ContactsType>(
    state => state.contacts,
  );

  const clearAllCards = () => {
    dispatch(
      showModal({
        isVisible: true,
        modalOptions: {
          modalType: 'delete',
          txtLeft: 'Cancel',
          txtRight: 'Delete',
          buttonType: 'double',
          headerText: 'Delete Contact',
          contentText: 'Are you sure you want to delete?',
          onPressBtnLeft: () => {
            dispatch(dismissModal());
          },
          onPressBtnRight: () => {
            dispatch(dismissModal());

            dispatch(setBusinessCards([]));
          },
        },
      }),
    );
  };

  const updateCard = (selectedItem: BusinessCard) => {
    let copyCards = [...businessCards];
    copyCards = copyCards.map((item: BusinessCard) => {
      if (item.recordID === selectedItem.recordID) {
        return {
          ...item,
          isStarred: !selectedItem.isStarred,
        };
      } else {
        return item;
      }
    });
    dispatch(setBusinessCards(copyCards));
  };

  const deleteCard = (id: string) => {
    dispatch(
      showModal({
        isVisible: true,
        modalOptions: {
          modalType: 'delete',
          txtLeft: 'Cancel',
          txtRight: 'Delete',
          buttonType: 'double',
          headerText: 'Delete Contact',
          contentText: 'Are you sure you want to delete?',
          onPressBtnLeft: () => {
            dispatch(dismissModal());
          },
          onPressBtnRight: () => {
            dispatch(dismissModal());

            const updatedCards = businessCards.filter(
              (item: BusinessCard) => item.recordID !== id,
            );
            dispatch(setBusinessCards(updatedCards));
          },
        },
      }),
    );
  };

  const renderLeftActions = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => deleteCard(id)}
        style={styles.btnDeleteContainer}>
        <Image source={images.DELETE} style={styles.btnDelete} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[fill, styles.container]}>
      <Header user="Earl" cardNumber={businessCards.length} />
      <View style={[fill, column, styles.content]}>
        <View style={[row, justifyContentBetween, styles.txtCards]}>
          <Header2Text style={{}} text={'Your contacts'} />
          {businessCards.length > 0 ? (
            <TouchableOpacity
              onPress={clearAllCards}
              style={{justifyContent: 'center'} as ViewStyle}>
              <SubText text={'Clear all'} />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={businessCards}
          renderItem={({item}: {item: BusinessCard; index: number}) => (
            <Swipeable
              renderRightActions={() => renderLeftActions(item.recordID)}>
              <CardRow
                businessCard={item}
                onStar={() => {
                  dispatch(selectCard(item));

                  updateCard(item);
                }}
                onPress={() => {
                  dispatch(selectCard(item));

                  navigation.navigate(ITEM);
                }}
              />
            </Swipeable>
          )}
          style={styles.cardList}
          keyExtractor={(item, index) => `${item.recordID}-${index}`}
          ListEmptyComponent={() => <EmptyList />}
        />
        <BottomComponent>
          <Button
            text="Add Business Card"
            style={styles.btnStart}
            onPress={() => {
              if (isIOS) {
                requestIOSPermission(
                  () =>
                    navigation.navigate(FORM, {
                      isCreate: true,
                    }),
                  () => {
                    dispatch(
                      showModal({
                        isVisible: true,
                        modalOptions: {
                          modalType: 'error',
                          txtBtn: 'Got it!',
                          buttonType: 'single',
                          headerText: 'Permission denied',
                          contentText:
                            'Please enable permission in your phone settings',
                          onPressBtn: () => {
                            dispatch(dismissModal());
                          },
                        },
                      }),
                    );
                  },
                  () =>
                    dispatch(
                      showModal({
                        isVisible: true,
                        modalOptions: {
                          modalType: 'error',
                          txtBtn: 'Got it!',
                          buttonType: 'single',
                          headerText: 'Permission denied',
                          contentText:
                            'Please enable permission in your phone settings',
                          onPressBtn: () => {
                            dispatch(dismissModal());
                          },
                        },
                      }),
                    ),
                );

                return;
              }

              const onPermGranted = () => {
                ToastAndroid.show(
                  'Permission granted (Android)!',
                  ToastAndroid.SHORT,
                );
                navigation.navigate(FORM, {
                  isCreate: true,
                });
              };

              const onPermDenied = () => {
                ToastAndroid.show(
                  'Permission denied (Android)!',
                  ToastAndroid.SHORT,
                );
              };

              const onPermError = (err: any) => {
                ToastAndroid.show(
                  `Permission error (Android)!: ${JSON.stringify(err)}`,
                  ToastAndroid.SHORT,
                );
              };

              requestAndroidPermission(
                onPermGranted,
                onPermDenied,
                onPermError,
              );
            }}
          />
        </BottomComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white},
  content: {backgroundColor: colors.background},
  txtCards: {marginTop: 40, marginBottom: 10, marginHorizontal: 20},
  cardList: {marginBottom: 20},
  btnStart: {
    width: '70%',
  },
  btnDeleteContainer: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    width: 80,
  },
  btnDelete: {
    width: 40,
    height: 40,
  },
});

export default ListScreen;
