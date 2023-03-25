import {combineReducers} from 'redux';
import ContactsReducer from './ContactsReducer';
import ModalReducer from './ModalReducer';
import UsersReducer from './UsersReducer';

export const rootReducer = combineReducers({
  contacts: ContactsReducer,
  modal: ModalReducer,
  users: UsersReducer,
});
