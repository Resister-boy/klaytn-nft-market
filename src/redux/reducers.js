import { SET_ADDRESS, SET_QRCODE } from "./actions";
import { combineReducers } from 'redux';

const initialAddress = 'DEFAULT_ADDRESS';
const initialQrCode = 'DEFAULT_QRCODE';

const addressReducer = (currentState = initialAddress, action) => {
  if(action.type === SET_ADDRESS) {
    return action.address
  }
  return currentState;
}

const qrCodeReducer = (currentState = initialQrCode, action) => {
  if(action.type === SET_QRCODE) {
    return action.qrCode
  }
  return currentState;
}

const reducer =  combineReducers({
  address: addressReducer,
  qrCode: qrCodeReducer
});

export default reducer;