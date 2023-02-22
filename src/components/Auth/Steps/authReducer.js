import { USER_TYPE } from '../constants';

export const initialState = {
  userType: USER_TYPE.CUSTOMER,
  email: '',
  password: '',
  confPassword: '',
  shop: '',
  shopDescription: '',
};

const updater = (state, field, payload) => ({ ...state, [field]: payload });

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'changeUserType': {
      return updater(state, 'userType', action.payload);
    }
    case 'changeEmail': {
      return updater(state, 'email', action.payload);
    }
    case 'changePassword': {
      return updater(state, 'password', action.payload);
    }
    case 'changeConfPassword': {
      return updater(state, 'confPassword', action.payload);
    }
    case 'changeShop': {
      return updater(state, 'shop', action.payload);
    }
    case 'changeShopDescription': {
      return updater(state, 'shopDescription', action.payload);
    }
    case 'changeFirstname': {
      return updater(state, 'firstname', action.payload);
    }
    case 'changeLastname': {
      return updater(state, 'lastname', action.payload);
    }
    default: {
      return state;
    }
  }
};
