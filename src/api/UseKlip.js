import axios from "axios";
import store from "../redux/store";
import { setAddress, setQrCode } from "../redux/actions";
import { COUNT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../constants/constant.cypress";

const A2P_API_PREPARE = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const A2P_NAME = "KLAY_MARKET";

export const sellCard = async(fromAddress, tokenId, setQrValue, callback) => {
  const functionJSON = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }'
  executeContract(NFT_CONTRACT_ADDRESS, functionJSON, "0", `["${fromAddress}", "${MARKET_CONTRACT_ADDRESS}", "${tokenId}"]`, setQrValue, callback);
}

export const buyCard = async(tokenId, setQrValue, callback) => {
  const functionJSON = ' { "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
  executeContract(MARKET_CONTRACT_ADDRESS, functionJSON, "10000000000000000", `["${tokenId}", "${NFT_CONTRACT_ADDRESS}"]`, setQrValue, callback);
}

export const mintWithTokenURI = (toAddress, tokenId, uri, setQrValue, callback) => {
  const functionJSON = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
  executeContract(NFT_CONTRACT_ADDRESS, functionJSON, "0", `["${toAddress}", "${tokenId}", "${uri}"]`, setQrValue, callback);
};

export const executeContract = (txTo, functionJSON, value, params, callback) => {
  axios.post(A2P_API_PREPARE, {
    bapp: {
      name: A2P_NAME
    },
    type: "execute_contract",
    transaction: {
      to: txTo,
      abi: functionJSON,
      value: value,
      params: params
    },
  })
  .then((response) => {
    console.log(response)
    const { request_key } = response.data;
    const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
    store.dispatch(setAddress(qrcode));
    let timerId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
        .then((response) => {
          if(response.data.result) {
            console.log('SUCCESS', response);
            callback(response.data.result);
            clearInterval(timerId)
          } else {
            console.log(response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000)
  })
} 

export const setCount = (count, setQrValue) => {
  axios.post(A2P_API_PREPARE, {
    bapp: {
      name: A2P_NAME
    },
    type: "execute_contract",
    transaction: {
      to: COUNT_CONTRACT_ADDRESS,
      abi: '{ "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }',
      value: "0",
      params: `["${count}"]`

    }
  })
  .then((response) => {
    const { request_key} = response.data;
    const qrCode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
    setQrValue(qrCode)
    let timerId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
        .then((response) => {
          if(response.data.result) {
            console.log(response.data.result);
            if(response.data.result.status === "success") {
              clearInterval(timerId)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000)
  })
}

export const getAddress = (setQrValue, callback) => {
  axios.post(A2P_API_PREPARE, {
    bapp: {
      name: A2P_NAME
    },
    type: "auth"
  })
  .then((response) => {
    const { request_key } = response.data;
    const qrCode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
    setQrValue(qrCode)
    let timerId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
        .then((response) => {
          if(response.data.result) {
            console.log(response.data.result);
            store.dispatch(setAddress(response.data.result.klaytn_address));
            store.dispatch(setQrCode(qrCode));
            callback(response.data.result.klaytn_address);
            clearInterval(timerId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000)
  })
}