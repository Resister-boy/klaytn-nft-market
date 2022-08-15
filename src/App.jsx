import Gallery from './components/Gallery';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import Footer from './components/Footer';
import MintNFT from './components/MintNFT';

// Smart Contract 배포 주소 가져오기
// caver.js를 이용해서 Smart Contract 연동하기
// Smart Contract 실행 결과 화면 구현하기

function App() {
  return (
    <div className='App'>
      <Header />
      <UserInfo />
      <Gallery />
      <MintNFT />
      <Footer />
    </div>
  );
}

export default App;
