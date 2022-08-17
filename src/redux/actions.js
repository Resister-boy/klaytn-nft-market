export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_QRCODE = 'SET_QRCODE';

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    address
  }
}

export function setQrCode(qrCode) {
  return {
    type: SET_QRCODE,
    qrCode
  }
}