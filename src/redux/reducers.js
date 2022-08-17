import { SET_ADDRESS, SET_QRCODE } from "./actions";
import { combineReducers } from 'redux';

const initialAddress = 'DEFAULT_ADDRESS';
const initialQrCode = 'DEFAULT_QRCODE';

const addressReducer = (currentState = initialAddress, action) => {
  if(action.type === SET_ADDRESS) {
    return { value: action.address}
  }
  return { value: currentState };
}

const qrCodeReducer = (currentState = initialQrCode, action) => {
  if(action.type === SET_QRCODE) {
    return { value: action.qrCode }
  }
  return { value: currentState };
}

const reducer =  combineReducers({
  address: addressReducer,
  qrCode: qrCodeReducer
});

export default reducer;