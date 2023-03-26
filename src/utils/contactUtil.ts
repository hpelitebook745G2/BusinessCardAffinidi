import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

type ReqPermCallback = (err?: any) => void;

export const isIOS = Platform.OS === 'ios';

export const requestAndroidPermission = async (
  onPermGranted: ReqPermCallback,
  onPermDenied: ReqPermCallback,
  onPermError: ReqPermCallback,
) => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    ]);

    if (
      granted['android.permission.WRITE_CONTACTS'] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.READ_CONTACTS'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Permission granted (Android)!');
      onPermGranted();
    } else {
      console.log('Permission denied (Android)!');
      onPermDenied();
    }
  } catch (err) {
    console.log(`Permission error (Android)!: ${JSON.stringify(err)}`);
    onPermError();
  }
};

export const requestIOSPermission = (
  onPermGranted: ReqPermCallback,
  onPermDenied: ReqPermCallback,
  onPermError: ReqPermCallback,
) => {
  Contacts.checkPermission()
    .then(permission => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED

      if (permission.toLowerCase() === Contacts.PERMISSION_AUTHORIZED) {
        console.log('1Permission granted (iOS)!');
        onPermGranted();
      } else if (permission.toLowerCase() === Contacts.PERMISSION_DENIED) {
        console.log('2Permission denied (iOS)!');
        onPermDenied();
      } else if (
        permission.toLowerCase() === Contacts.PERMISSION_UNDEFINED ||
        permission.toLowerCase() === undefined ||
        permission.toLowerCase() === null
      ) {
        console.log('3Permission error (iOS)!');
        Contacts.requestPermission().then(innerPerm => {
          console.log('4Permission error (iOS): ', innerPerm);

          if (innerPerm.toLowerCase() === Contacts.PERMISSION_AUTHORIZED) {
            console.log('1.1Permission granted (iOS)!');
            onPermGranted();
          } else if (innerPerm.toLowerCase() === Contacts.PERMISSION_DENIED) {
            console.log('2.1Permission denied (iOS)!');
            onPermDenied();
          } else if (
            innerPerm.toLowerCase() === Contacts.PERMISSION_UNDEFINED ||
            innerPerm.toLowerCase() === undefined ||
            innerPerm.toLowerCase() === null
          ) {
            console.log('3.1Permission error (iOS)!');
            onPermError();
          }
        });
      }
    })
    .catch(err => {
      console.log(`5Permission error (iOS)!: ${JSON.stringify(err)}`);
      onPermError();
    });
};
