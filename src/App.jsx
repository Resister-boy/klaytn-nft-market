import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Market from './routes/Market';
import Create from './routes/Create';
import About from './routes/About';
import NotFound from './routes/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Smart Contract 배포 주소 가져오기
// caver.js를 이용해서 Smart Contract 연동하기
// Smart Contract 실행 결과 화면 구현하기

function App() {
  return (
    <BrowserRouter className='App'>
      <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/market" element={ <Market /> } />
          <Route path="/create" element={ <Create /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="*" element={ <NotFound />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
