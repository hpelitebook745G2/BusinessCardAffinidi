import {RootState} from '@/config/ReduxStore';
import {Layout} from '@/config/theme';
import {
  BusinessCard,
  ContactsType,
  EmailAddress,
  PhoneNumber,
} from '@/models/ContactsModel';
import {ModalOptionsType} from '@/models/ModalModel';
import {selectCard, setBusinessCards} from '@/reducers/ContactsReducer';
import {dismissModal, showModal} from '@/reducers/ModalReducer';
import {colors, images} from '@constants';
import {
  BottomComponent,
  Button,
  EditText,
  Header,
  Starbox,
  SubText,
} from 'components';
import React, {FC, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';

type ItemScreenProps = {
  navigation?: any;
};

const {fill, row, column} = Layout();

const ItemScreen: FC = ({navigation}: ItemScreenProps) => {
  const dispatch = useDispatch();
  const {businessCards, selectedCard} = useSelector<RootState, ContactsType>(
    state => state.contacts,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [contact, setContact] = useState<BusinessCard>(selectedCard);
  let isEveryValueEmpty = true;

  if (
    contact.familyName !== '' &&
    contact.givenName !== '' &&
    contact.phoneNumbers[0].label !== '' &&
    contact.phoneNumbers[0].number !== '' &&
    contact.emailAddresses[0].label !== '' &&
    contact.emailAddresses[0].email !== ''
  ) {
    isEveryValueEmpty = false;
  }

  const deleteCard = () => {
    openModal({
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
          (item: BusinessCard) => item.recordID !== selectedCard.recordID,
        );
        dispatch(setBusinessCards(updatedCards));
        navigation.goBack();
      },
    });
  };

  const exportCard = () => {
    openModal({
      modalType: 'warning',
      txtLeft: 'Cancel',
      txtRight: 'Export',
      buttonType: 'double',
      headerText: 'Export Contact',
      contentText: 'Are you sure you want to export?',
      onPressBtnLeft: () => {
        dispatch(dismissModal());
      },
      onPressBtnRight: () => {
        dispatch(dismissModal());

        // Apply 1 second timeout to allow gap for iOS to dismiss previous modal and open Contact form
        setTimeout(() => {
          console.log('Current contact: ', contact);
          const check = Contacts.getContactById(contact.recordID);
          check
            .then(existingContact => {
              console.log('existingContact: ', existingContact);
              openNewContact(existingContact !== null);
            })
            .catch(err => {
              console.error('getContactById() error: ', err);
              openErrorModal();
            });
        }, 1000);
      },
    });
  };

  const openNewContact = async (isExisting: boolean) => {
    console.log('Does contact exist? ', isExisting);
    try {
      let openContactForm;
      if (isExisting) {
        openContactForm = Contacts.openExistingContact(contact);
      } else {
        openContactForm = Contacts.openContactForm(contact);
      }

      openContactForm
        .then(innerContact => {
          if (innerContact) {
            // Updated local state contact
            const copyContact: BusinessCard = {...contact};
            const {
              recordID,
              company,
              emailAddresses,
              familyName,
              givenName,
              phoneNumbers,
              isStarred,
              note,
              jobTitle,
            } = innerContact;
            copyContact.recordID = recordID;
            copyContact.company = company ?? '';
            copyContact.emailAddresses = emailAddresses;
            copyContact.familyName = familyName;
            copyContact.givenName = givenName;
            copyContact.phoneNumbers = phoneNumbers;
            copyContact.isStarred = isStarred;
            copyContact.note = note;
            copyContact.jobTitle = jobTitle;
            setContact(copyContact);

            // Updated redux selectedCard
            dispatch(selectCard(copyContact));

            // Updated redux businessCards
            let copyCards: BusinessCard[] = [...businessCards];
            copyCards = copyCards.map((item: BusinessCard) => {
              if (item.recordID === selectedCard.recordID) {
                item = copyContact;
              }

              return item;
            });
            dispatch(setBusinessCards(copyCards));
            // updateContactDetails('recordID', innerContact.recordID); // First, update local state - contact. Second, update redux businessCards array using update() in useEffect
          }
        })
        .catch(err => {
          console.error('openNewContact() error: ', err);
          openErrorModal();
        });

      const {action} = await openContactForm;
      if (action === 'cancel') {
        openErrorModal();
      } else {
        openModal({
          modalType: 'success',
          txtBtn: 'Got it!',
          buttonType: 'single',
          headerText: 'Exported successfully!',
          contentText: 'Please check your phone contact app',
          onPressBtn: () => {
            dispatch(dismissModal());
          },
        });
      }
    } catch (error) {
      openErrorModal();
    }
  };

  const openModal = (modalOptions: ModalOptionsType) => {
    dispatch(showModal({isVisible: true, modalOptions}));
  };

  const openErrorModal = () => {
    openModal({
      modalType: 'error',
      txtBtn: 'Got it!',
      buttonType: 'single',
      headerText: 'Export failed!',
      contentText: 'Please try again',
      onPressBtn: () => {
        dispatch(dismissModal());
      },
    });
  };

  const updateCard = () => {
    let copyCards: BusinessCard[] = [...businessCards];
    copyCards = copyCards.map((item: BusinessCard) => {
      if (item.recordID === selectedCard.recordID) {
        item = contact;
      }

      return item;
    });
    dispatch(setBusinessCards(copyCards));
  };

  const updateContactDetails = (
    field: keyof BusinessCard,
    value: string | boolean | EmailAddress | PhoneNumber,
    subfield?: string,
  ) => {
    let copyContact: any = {...contact};

    if (subfield) {
      copyContact[field] = [
        {...copyContact[field][0], [subfield]: value},
        ...copyContact[field].slice(1),
      ];
    } else {
      copyContact[field] = value;
    }

    setContact(copyContact);
  };

  return (
    <View style={[fill, styles.container]}>
      <Header
        withBack
        isCreate={false}
        isEditing={isEditing}
        onBack={() => navigation.goBack()}
        onRightBtn={() => {
          setIsEditing(!isEditing);
        }}
      />
      <ScrollView style={[fill, styles.content]}>
        <View style={[row, styles.btnModifyContainer]}>
          {!isEditing ? (
            <TouchableOpacity onPress={() => exportCard()}>
              <Image source={images.EXPORT} style={styles.btnExport} />
            </TouchableOpacity>
          ) : null}
          <Starbox
            isStarred={contact.isStarred}
            isDisabled={!isEditing}
            onStar={() => updateContactDetails('isStarred', !contact.isStarred)}
            style={{marginHorizontal: 20} as ViewStyle}
          />
          {isEditing ? (
            <TouchableOpacity onPress={() => deleteCard()}>
              <Image source={images.DELETE} style={styles.btnModify} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Given name */}
        <EditText
          isMandatory={true}
          editable={isEditing}
          onChangeText={(val: string) => updateContactDetails('givenName', val)}
          value={contact.givenName}
          placeholder={'First name'}
        />
        {/* Last name */}
        <EditText
          isMandatory={true}
          editable={isEditing}
          onChangeText={(val: string) =>
            updateContactDetails('familyName', val)
          }
          value={contact.familyName}
          placeholder={'Last name'}
        />
        {/* Job Title */}
        <EditText
          editable={isEditing}
          onChangeText={(val: string) => updateContactDetails('jobTitle', val)}
          value={contact.jobTitle}
          placeholder={'Job Title'}
        />
        {/* Company */}
        <EditText
          editable={isEditing}
          onChangeText={(val: string) => updateContactDetails('company', val)}
          value={contact.company}
          placeholder={'Company'}
        />
        {/* LinkedIn */}
        <EditText
          editable={isEditing}
          onChangeText={(val: string) =>
            updateContactDetails('linkedinUrl', val)
          }
          value={contact.linkedinUrl}
          placeholder={'LinkedIn URL'}
        />
        {/* Phone */}
        <View style={[row]}>
          <EditText
            isMandatory={true}
            editable={isEditing}
            onChangeText={(val: string) =>
              updateContactDetails('phoneNumbers', val, 'label')
            }
            style={[{flex: 0.3} as TextStyle]}
            value={contact.phoneNumbers[0].label}
            placeholder={'Label'}
          />
          <View style={[{flex: 0.7} as TextStyle]}>
            <EditText
              isMandatory={true}
              editable={isEditing}
              style={{marginLeft: 0} as TextStyle}
              onChangeText={(val: string) => {
                let formattedText = val.replace(/[^0-9]/g, '');
                updateContactDetails('phoneNumbers', formattedText, 'number');
              }}
              value={contact.phoneNumbers[0].number}
              placeholder={'Phone number'}
              keyboardType={'phone-pad'}
            />
          </View>
        </View>
        {/* Email address */}
        <View style={[row]}>
          <EditText
            isMandatory={true}
            editable={isEditing}
            onChangeText={(val: string) =>
              updateContactDetails('emailAddresses', val, 'label')
            }
            style={[
              {
                flex: 0.3,
              } as TextStyle,
            ]}
            value={contact.emailAddresses[0].label}
            placeholder={'Label'}
          />
          <View style={[column, {flex: 0.7} as TextStyle]}>
            <EditText
              isMandatory={true}
              editable={isEditing}
              onChangeText={(val: string) => {
                const emailRegex =
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (val === '' || emailRegex.test(val)) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }

                updateContactDetails('emailAddresses', val, 'email');
              }}
              style={[{marginLeft: 0} as TextStyle]}
              value={contact.emailAddresses[0].email}
              placeholder={'Email address'}
              keyboardType={'email-address'}
            />
            {isValidEmail ? null : (
              <SubText
                text={'Email address is invalid'}
                style={styles.txtEmailError}
              />
            )}
          </View>
        </View>
        {/* Note */}
        <EditText
          editable={isEditing}
          onChangeText={(val: string) => updateContactDetails('note', val)}
          style={[styles.cardNote, {marginBottom: 40} as TextStyle]}
          value={contact.note}
          placeholder={'Notes'}
          multiline
          numberOfLines={5}
          minHeight={150}
          maxHeight={150}
          textAlignVertical="top"
        />
      </ScrollView>
      {isEditing ? (
        <BottomComponent>
          <Button
            disabled={isEveryValueEmpty || !isValidEmail}
            text={'Update'}
            style={styles.btnUpdate}
            onPress={() => {
              updateCard();
              navigation.goBack();
            }}
          />
        </BottomComponent>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white},
  content: {
    backgroundColor: colors.background,
  },
  cardNote: {
    fontSize: 16,
    paddingTop: 15,
    marginTop: 20,
  },
  btnModifyContainer: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnExport: {
    width: 30,
    height: 30,
  },
  btnModify: {
    width: 35,
    height: 35,
  },
  btnUpdate: {
    width: '70%',
  },
  txtEmailError: {
    marginLeft: 15,
    marginTop: 5,
    color: 'red',
  },
});

export default ItemScreen;
