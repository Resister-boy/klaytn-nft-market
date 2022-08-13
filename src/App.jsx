import './App.css';

import CONTRACT_ADDRESS from "./data/data.json";

import { 
    readCount, 
    getBalance, 
    setCount } from './api/UseCaver';


// Smart Contract 배포 주소 가져오기
// caver.js를 이용해서 Smart Contract 연동하기
// Smart Contract 실행 결과 화면 구현하기





function App() {
  return (
    <div className="App">
      <button onClick={readCount}>readCount 실행</button>
      <button onClick={() => {getBalance(CONTRACT_ADDRESS)}}>getBalance 실행</button>
      <button onClick={() => {
        setCount(100)
      }}>setCount 실행</button>
    </div>
  );
}

export default App;
