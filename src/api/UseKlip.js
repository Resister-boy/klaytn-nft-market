import axios from "axios";
import { COUNT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../constants/constant.cypress";

const A2P_API_PREPARE = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const A2P_NAME = "KLAY_MARKET";

export const mintCardWithURI = (toAddress, tokenId, uri, setQrValue, callback) => {
  const functionJSON = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }'
  executeContract(NFT_CONTRACT_ADDRESS, functionJSON, "0", `["${toAddress}", "${tokenId}", "${uri}"]`, setQrValue, callback)
}

export const executeContract = (txTo, functionJSON, value, params, setQrValue, callback) => {
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
              callback(response.data.result)
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
    const { request_key} = response.data;
    const qrCode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
    setQrValue(qrCode)
    let timerId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
        .then((response) => {
          if(response.data.result) {
            console.log(response.data.result);
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