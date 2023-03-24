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
      onPermGranted();
    } else {
      onPermDenied();
    }
  } catch (err) {
    onPermError(err);
  }
};

export const requestIOSPermission = (
  onPermGranted: ReqPermCallback,
  onPermDenied: ReqPermCallback,
  onPermError: ReqPermCallback,
) => {
  if (!isIOS) {
    return;
  }

  Contacts.checkPermission().then(permission => {
    // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    if (permission === 'undefined') {
      Contacts.requestPermission().then(innerPerm => {
        console.log('Permission requested (iOS): ', innerPerm);
        onPermError('Permission error!');
      });
    }
    if (permission === 'authorized') {
      console.log('Permission granted (iOS)!');
      onPermGranted();
    }
    if (permission === 'denied') {
      console.log('Permission denied (iOS)!');
      onPermDenied();
    }
  });
};
