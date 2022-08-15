import Caver from 'caver-js';

import { 
    COUNT_CONTRACT_ADDRESS, 
    NFT_CONTRACT_ADDRESS,
    MARKET_CONTRACT_ADDRESS,
    ACCESS_KEY, 
    SECRET_KEY, 
    CHAIN_ID } from "../constants";

// import CountABI from '../abi/CountABI.json';
import KIP17TokenABI from '../abi/KIP17TokenABI.json';

// import PRIVATE_KEY from "../data/data.json";

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY + ":" + SECRET_KEY).toString("base64")
    },
    {
      name: "x-chain-id",
      value: CHAIN_ID
    }
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(KIP17TokenABI, NFT_CONTRACT_ADDRESS)

export const fetchCardsOf = async (address) => {
  const balance = await NFTContract.methods.balanceOf(address).call();
  console.log(balance);

  const tokenIds = [];
  for(let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  const tokenUris = [];
  for(let i = 0; i < balance; i++) {
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  const nfts = [];
  for(let i = 0; i < balance; i++) {
    nfts.push({
      tokenId: tokenIds[i],
      tokenURI: tokenUris[i]
    })
  }
  return nfts
}


export const getBalance = async (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(balance, 'Klay left!');
    return balance;
  })
}


// const CountContract = new caver.contract(CountABI, COUNT_CONTRACT_ADDRESS);

// export const readCount = async () => {
//   const _count = await CountContract.methods.count().call();
//   console.log(_count)
// }

// export const setCount = async (newCount) => {
//   try {
//     // Define account
//     const deployer = caver.wallet.keyring.createFromPrivateKey(PRIVATE_KEY);
//     caver.wallet.add(deployer);
//     // Send Smart contract Transaction
//     // Show Result
//     const receipt = await CountContract.methods.setCount(newCount).send({
//       from: deployer.address,
//       gas: '0x4bfd200'
//     })
//     console.log(receipt);
//   } catch (error) {
//     console.log(error);
//   }
// }