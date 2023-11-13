import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Info from './pages/LicenseInfo/Info';
import ComList from './pages/Community/ComList';
import SearchFiltered from './pages/Filtered/SearchFiltered';
import MyInfo from './pages/Mypage/MyInfo';
import PostContent from './pages/Community/PostContent';
import Edit from './pages/Community/Edit';
import Kakao from './pages/Login/Kakao';
import ComDetail from './pages/Community/ComDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import InfoMock from './pages/LicenseInfo/Infomock';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    function clearLocalStorage() {
      toast.error('토큰이 만료되어 로그아웃 되었습니다.');
      localStorage.clear();
      window.location.reload();
    }
    const delayMilliseconds = 6 * 60 * 60 * 1000;
    setTimeout(clearLocalStorage, delayMilliseconds);
  }, []);
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          {/* <Route path="/info" element={<InfoMock />} /> */}
          <Route path="/community" element={<ComList />} />
          <Route path="/write" element={<PostContent />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/mypage" element={<MyInfo />} />
          <Route path="/search" element={<SearchFiltered />} />
          <Route path="/login/oauth/code/kakao" element={<Kakao />} />
          <Route path="/community/boards/:id" element={<ComDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
