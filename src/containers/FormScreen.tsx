import {RootState} from '@/config/ReduxStore';
import {Layout} from '@/config/theme';
import {
  BusinessCard,
  ContactsType,
  EmailAddress,
  PhoneNumber,
} from '@/models/ContactsModel';
import {setBusinessCards} from '@/reducers/ContactsReducer';
import {colors} from '@constants';
import {BottomComponent, Button, EditText, Header, SubText} from 'components';
import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, TextStyle, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type FormScreenProps = {
  route?: any;
  navigation?: any;
};

const {fill, column, row} = Layout();

const FormScreen: FC = ({navigation}: FormScreenProps) => {
  const dispatch = useDispatch();
  const {businessCards} = useSelector<RootState, ContactsType>(
    state => state.contacts,
  );

  const initialState = {
    recordID: '0',
    company: '',
    emailAddresses: [
      {
        label: '',
        email: '',
      },
    ],
    familyName: '',
    givenName: '',
    phoneNumbers: [
      {
        label: '',
        number: '',
      },
    ],
    isStarred: false,
    note: '',
    jobTitle: '',
    linkedinUrl: '',
  };
  const [contact, setContact] = useState<BusinessCard>(initialState);
  const [isValidEmail, setIsValidEmail] = useState(true);

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

  const createCard = () => {
    const uid = new Date().getTime() * Math.random() * 100000;

    const copyCards = [...businessCards];
    copyCards.push({
      ...contact,
      recordID: uid.toString(),
    });
    dispatch(setBusinessCards(copyCards));

    navigation.goBack();
  };

  return (
    <View style={[fill, styles.container]}>
      <Header withBack isCreate onBack={() => navigation.goBack()} />
      <ScrollView style={[fill, styles.content]}>
        {/* Given name */}
        <EditText
          isMandatory={true}
          onChangeText={(val: string) => updateContactDetails('givenName', val)}
          value={contact.givenName}
          placeholder={'First name'}
        />
        {/* Last name */}
        <EditText
          isMandatory={true}
          onChangeText={(val: string) =>
            updateContactDetails('familyName', val)
          }
          value={contact.familyName}
          placeholder={'Last name'}
        />
        {/* Job Title */}
        <EditText
          isMandatory={true}
          onChangeText={(val: string) => updateContactDetails('jobTitle', val)}
          value={contact.jobTitle}
          placeholder={'Job Title'}
        />
        {/* Company */}
        <EditText
          onChangeText={(val: string) => updateContactDetails('company', val)}
          value={contact.company}
          placeholder={'Company'}
        />
        {/* LinkedIn */}
        <EditText
          onChangeText={(val: string) =>
            updateContactDetails('linkedinUrl', val)
          }
          value={contact.linkedinUrl}
          placeholder={'LinkedIn URL'}
        />
        {/* Phone number */}
        <View style={[row]}>
          <EditText
            isMandatory={true}
            style={{flex: 0.3} as TextStyle}
            onChangeText={(val: string) =>
              updateContactDetails('phoneNumbers', val, 'label')
            }
            value={contact.phoneNumbers[0].label}
            placeholder={'Label'}
          />
          <View style={[{flex: 0.7} as TextStyle]}>
            <EditText
              isMandatory={true}
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
            style={{flex: 0.3} as TextStyle}
            onChangeText={(val: string) =>
              updateContactDetails('emailAddresses', val, 'label')
            }
            value={contact.emailAddresses[0].label}
            placeholder={'Label'}
          />
          <View style={[column, {flex: 0.7} as TextStyle]}>
            <EditText
              isMandatory={true}
              style={{marginLeft: 0} as TextStyle}
              onChangeText={(val: string) => {
                const emailRegex =
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (val === '') {
                  setIsValidEmail(true);
                } else if (emailRegex.test(val)) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }

                updateContactDetails('emailAddresses', val, 'email');
              }}
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
          style={[styles.cardNote, {marginBottom: 40} as TextStyle]}
          onChangeText={(val: string) => updateContactDetails('note', val)}
          value={contact.note}
          placeholder={'Notes'}
          multiline
          numberOfLines={5}
          minHeight={150}
          maxHeight={150}
          textAlignVertical="top"
        />
      </ScrollView>
      <BottomComponent>
        <Button
          disabled={isEveryValueEmpty || !isValidEmail}
          text="Add business card"
          style={styles.btnAdd}
          onPress={createCard}
        />
      </BottomComponent>
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
  btnAdd: {
    width: '70%',
  },
  txtEmailError: {
    marginLeft: 15,
    marginTop: 5,
    color: 'red',
  },
});

export default FormScreen;
