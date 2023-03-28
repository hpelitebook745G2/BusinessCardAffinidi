import {BusinessCard, ContactsType} from '@/models/ContactsModel';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export let initialState: ContactsType = {
  isPermissionGranted: false,
  selectedCard: {
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
  },
  businessCards: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    toggleIsPermissionGranted: state => {
      state.isPermissionGranted = !state.isPermissionGranted;
    },
    selectCard: (state, action: PayloadAction<BusinessCard>) => {
      state.selectedCard = action.payload;
    },
    setBusinessCards: (state, action: PayloadAction<BusinessCard[]>) => {
      state.businessCards = action.payload;
    },
  },
});

export const {toggleIsPermissionGranted, selectCard, setBusinessCards} =
  contactsSlice.actions;

export default contactsSlice.reducer;
