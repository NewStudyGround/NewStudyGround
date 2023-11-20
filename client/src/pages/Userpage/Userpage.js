import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ComCard from '../../components/ComCard/Comcard';
import Comlist from '../../components/Comlist/Comlist';
import { GetUserInfo } from '../../utils/API';
// import UserInfoData from '../../utils/UserdataMockup';
// import { Link } from 'react-router-dom';

import { MypageStyle, Profile, Writelist } from './UserpageStyle';

const Userpage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const navigator = useNavigate();
  const [ViewType, setViewType] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('후기');

  console.log(userInfo.name);

  const openDetail = (boardId) => {
    navigator(`/community/boards/${boardId}`);
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await GetUserInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };
    fetchUserInfo();
  }, []);
  console.log(userInfo);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleViewChange = (newViewType) => {
    setViewType(newViewType);
  };

  const Writecon = () => {
    return (
      <div>
        {ViewType === 'card' ? (
          <ComCard
            username="사용자 이름"
            email="이메일 주소"
            tag="태그"
            title="글 제목"
            onClick={() => {
              // 클릭 이벤트 처리
            }}
            img="이미지 URL"
          />
        ) : (
          <Comlist
            username="사용자 이름"
            email="이메일 주소"
            tag="태그"
            title="글 제목"
            onClick={() => {
              // 클릭 이벤트 처리
            }}
          />
        )}
      </div>
    );
  };

  return (
    <MypageStyle>
      <Header />
      <Profile>
        <div className="display">
          <img src={userInfo.profileImage} alt="useravatar" />
          <div className="text">
            <div>
              {userInfo.name}/{userInfo.email}
            </div>
            {/* 자기소개 */}
          </div>
        </div>
      </Profile>
      <Writelist>
        <div>
          <button onClick={() => handleCategoryChange('후기')}>후기</button>
          <button onClick={() => handleCategoryChange('질문')}>질문</button>
          <button onClick={() => handleCategoryChange('자유')}>자유</button>
          {/* 선택한 카테고리에 따라 글 목록을 표시하는 컴포넌트나 요소 추가 */}
          {/* 예를 들어, <CategoryPostsList category={selectedCategory} viewType={viewType} /> */}
        </div>
        <div>{selectedCategory} 작성글</div>
        {userInfo?.boards?.length > 0 ? (
          <Writecon>
            <div>{selectedCategory} 작성글</div>
            <div>
              <button onClick={() => handleViewChange('card')}>카드형</button>
              <button onClick={() => handleViewChange('list')}>리스트형</button>
            </div>
            {userInfo?.boards
              .filter((board) => board.category === selectedCategory)
              .map((boards, index) => (
                <button
                  className="write"
                  key={index}
                  onClick={() => openDetail(boards.boardId)}
                >
                  {boards.title}
                </button>
              ))}
          </Writecon>
        ) : (
          <p>아직 작성한 글이 없어요😅</p>
        )}
      </Writelist>

      <Footer />
    </MypageStyle>
  );
};

export default Userpage;
