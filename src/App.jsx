import { useState } from 'react';
import CONTRACT_ADDRESS from "./data/data.json";
import QRCode from 'qrcode.react';

import { 
    readCount, 
    getBalance
   } from './api/UseCaver';

import * as KlipAPI from './api/UseKlip';

// Smart Contract 배포 주소 가져오기
// caver.js를 이용해서 Smart Contract 연동하기
// Smart Contract 실행 결과 화면 구현하기

const onPressButton = (_balance, _setBalance) => {
  _setBalance(_balance + 1);
}

function App() {
  const QR_DEFAULT = 'DEFAULT'
  const [balance, setBalance] = useState(0);
  const [qrValue, setQrValue] = useState(QR_DEFAULT)

  const getAddress = () => {
    KlipAPI.getAddress(setQrValue)
  }

  const setCount = () => {
    KlipAPI.setCount(2000, setQrValue)
  }
  

  return (
    <div className="App">
      {balance}
      <QRCode value={qrValue} />
      <button onClick={readCount}>readCount 실행</button>
      <button onClick={() => {getBalance(CONTRACT_ADDRESS)}}>getBalance 실행</button>
      <button onClick={() => {onPressButton(balance, setBalance)}}>onPressButton 실행</button>
      <button onClick={() => {getAddress(setQrValue)}}>getAddress 실행</button>
      <button onClick={() => {setCount()}}>onClickSetCount 실행</button>
    </div>
  );
}

export default App;
