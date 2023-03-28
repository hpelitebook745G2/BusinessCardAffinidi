export type ContactsType = {
  isPermissionGranted: boolean;
  selectedCard: BusinessCard;
  businessCards: BusinessCard[];
};

export type BusinessCard = {
  recordID: string;
  company: string;
  emailAddresses: EmailAddress[];
  familyName: string;
  givenName: string;
  phoneNumbers: PhoneNumber[];
  isStarred: boolean;
  note?: string;
  jobTitle: string;
  linkedinUrl?: string;
};

export type EmailAddress = {
  label: string;
  email: string;
};

export type PhoneNumber = {
  label: string;
  number: string;
};
