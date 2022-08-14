import axios from "axios";
import { COUNT_CONTRACT_ADDRESS } from "../constants/constant.cypress";

const A2P_API_PREPARE = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const A2P_NAME = "KLAY_MARKET";

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
            clearInterval(timerId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000)
  })
}

export const getAddress = (setQrValue) => {
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
            clearInterval(timerId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000)
  })
}