import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useForm } from 'react-hook-form';
import {
  GetUserInfo,
  DeleteUser,
  EditUser,
  UploadProfileImage,
} from '../../utils/API';
import {
  MypageStyle,
  Profile,
  TabContainer,
  CalendarContainer,
  BookMarkContainer,
  WriteContents,
  Producttab,
  PurchaseHistoryContainer,
  PointHistoryContainer,
  BookMarklist,
  Writelist,
  ProfileRight,
  ProfileLeft,
} from './MypageStyle';
import { toast } from 'react-toastify';
import { Calendar } from 'react-calendar';
import Modal from '../../components/Modal/Modal';
import 'react-calendar/dist/Calendar.css';
import ComCard from '../../components/ComCard/Comcard';
import Comlist from '../../components/Comlist/Comlist';
import DelModal from '../../components/DelModal/DelModal';
import { useNavigate } from 'react-router-dom';
import PasswordModal from '../../components/Password/PasswordModal';
localStorage.setItem('mypagetab', 'calendar');
const MyInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [isIndex, setIndex] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  // const [viewType, setViewType] = useState('card');
  const [selectedCategory, setSelectedCategory] = useState('후기');
  const [selectedCategory1, setSelectedCategory1] = useState('후기');
  const [ViewType, setViewType] = useState('list');
  const [ViewType1, setViewType1] = useState('list');
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigator = useNavigate();
  const [password, setPassword] = useState('');
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

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

  const route = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    // setSelectedTab이 완료된 후에 실행되도록 useEffect를 사용
  };

  useEffect(() => {
    localStorage.setItem('mypagetab', selectedTab);
  }, [selectedTab]);

  const handleViewChange = (newViewType) => {
    setViewType(newViewType);
  };

  const handleViewChange1 = (newViewType) => {
    setViewType1(newViewType);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCategoryChange1 = (category) => {
    setSelectedCategory1(category);
  };
  const openDetail = (boardId) => {
    navigator(`/community/boards/${boardId}`);
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

  const BookMarkcon = () => {
    return (
      <div>
        {ViewType1 === 'card' ? (
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

  const inputErrorClass = 'input-error';
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
  } = useForm();

  const [newUsername, setNewUsername] = useState(userInfo.name);
  const [newPhone, setNewPhone] = useState(userInfo.phone);

  const confirmEditUser = async () => {
    console.log('수정 시작');
    console.log('newUsername:', newUsername);
    console.log('newPhone:', newPhone);
    if (!newUsername && !newPhone) {
      toast.info('변경할 정보가 없습니다.');
      return;
    }
    try {
      await EditUser(newUsername, newPhone);
      onUpdateUserInfo(newUsername, newPhone);

      console.log('수정 완료');
      localStorage.setItem('name', newUsername);
      localStorage.setItem('phone', newPhone);

      setIsEditMode(false);
      toast.success('수정이 완료되었습니다.');
      window.location.reload();
    } catch (e) {
      console.error('수정 실패:', e);
      toast.error('수정에 실패하였습니다.');
      navigator('/mypage');
    }
  };

  const onUpdateUserInfo = (newUsername, newPhone) => {
    setNewUsername(newUsername);
    setNewPhone(newPhone);
  };

  const openDelModal = (message) => {
    setWarningMessage(message);
    setDelModalOpen(true);
  };
  const closeDelModal = () => {
    setDelModalOpen(false);
  };
  const handleDeleteUser = async () => {
    openDelModal('이 작업은 되돌릴 수 없어요!');
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const confirmDeleteUser = async () => {
    try {
      await DeleteUser();
      toast.success('그동안 이용해주셔서 감사합니다.');
      localStorage.clear();
      navigator('/');
    } catch (e) {
      console.error('회원 탈퇴 실패:', e);
      toast.error('탈퇴에 실패하였습니다.');
    } finally {
      closeDelModal();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);

    try {
      if (file) {
        setUserInfo({
          ...userInfo,
          profileImage: await UploadProfileImage(file),
        });
        //     const formData = new FormData();
        //     formData.append('profileImage', file);

        //     const response = await UploadProfileImage(file)

        //     const updatedProfileImage = response.data.profileImage;
        //     setUserInfo({ ...userInfo, profileImage: updatedProfileImage });

        //     console.log('프로필 이미지가 업로드되었습니다.');
        //   }
        window.location.reload();
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      console.log(file);
    }
  };

  const handleEditPhotoClick = () => {
    // "프로필 이미지 선택" 버튼 클릭 시 input[type=file]을 클릭
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleEditPasswordClick = () => {
    // 패스워드 확인 모달 열기
    setPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    // 패스워드 확인 모달 닫기
    setPasswordModalOpen(false);
  };

  // const handlePasswordVerification = async () => {
  //   try {
  //     // 서버에 패스워드 확인 요청
  //     // 'password' 상태 변수를 패스워드 입력에 사용
  //     // 패스워드가 올바르면 수정 모드로 진행
  //     // 그렇지 않으면 에러 메시지 표시 또는 이에 맞게 처리

  //     // 예시: 아래의 줄을 실제 패스워드 확인 로직으로 교체하세요
  //     const isPasswordCorrect = await verifyPassword(password);

  //     if (isPasswordCorrect) {
  //       // 패스워드가 올바를 경우, 수정 모드로 진행
  //       setIsEditMode(true);
  //       closePasswordModal();
  //     } else {
  //       // 패스워드가 올바르지 않을 경우 에러 메시지 표시
  //       toast.error('비밀번호가 잘못되었습니다. 다시 시도해주세요.');
  //     }
  //   } catch (error) {
  //     console.error('패스워드 확인 오류:', error);
  //     // 에러 처리: 에러 메시지 표시, 에러에 맞게 처리 등
  //   }
  // };
  const handlePasswordVerification = async () => {
    try {
      // 패스워드 확인 모달에서 입력받은 패스워드 값이 123일 때만 수정 모드로 진행
      if (password === '123') {
        setIsEditMode(true);
        closePasswordModal();
      }
    } catch (error) {
      console.error('패스워드 확인 오류:', error);
      // 에러 처리: 에러 메시지 표시, 에러에 맞게 처리 등
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
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
      <TabContainer>
        <button onClick={() => handleTabChange('calendar')}>달력</button>
        <button onClick={() => handleTabChange('boards')}>글 목록</button>
        <button onClick={() => handleTabChange('products')}>상품 목록</button>
        <button
          onClick={() => {
            handleTabChange('edit');
            handleEditPasswordClick();
          }}
        >
          정보 수정
        </button>
      </TabContainer>
      {selectedTab === 'calendar' && (
        <CalendarContainer style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 캘린더 부분 */}
          <div className="calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={date}
              showNeighboringMonth={false}
              formatDay={(locale, date) =>
                date.toLocaleString('en', { day: 'numeric' })
              }
              nextLabel={'▶'}
              prevLabel={'◀'}
              next2Label={null}
              prev2Label={null}
            />
          </div>
          <div className="bookmarks-wrapper">
            <div>나의 관심 자격증</div>
            {userInfo?.bookmarks?.length > 0 && (
              <BookMarkContainer>
                {isModalOpen === true && (
                  <Modal
                    date={userInfo.bookmarks[isIndex].licenseInfo.licenses}
                    setModalOpen={setModalOpen}
                    name={userInfo.bookmarks[isIndex].licenseInfo.name}
                    code={userInfo.bookmarks[isIndex].licenseInfo.code}
                    bookmark={userInfo.bookmarks[isIndex].licenseInfo.bookmark}
                  />
                )}
                {userInfo?.bookmarks?.map((bookmark, index) => (
                  <button
                    className="bookmark"
                    key={index}
                    onClick={() => route(index)}
                  >
                    {bookmark.licenseInfo.name}
                  </button>
                ))}
              </BookMarkContainer>
            )}
          </div>
        </CalendarContainer>
      )}

      {selectedTab === 'boards' && (
        <WriteContents>
          <Writelist>
            <div>작성한글</div>
            <div>
              <button onClick={() => handleCategoryChange('후기')}>후기</button>
              <button onClick={() => handleCategoryChange('질문')}>질문</button>
              <button onClick={() => handleCategoryChange('자유')}>자유</button>
              {/* 선택한 카테고리에 따라 글 목록을 표시하는 컴포넌트나 요소 추가 */}
              {/* 예를 들어, <CategoryPostsList category={selectedCategory} viewType={viewType} /> */}
            </div>
            <div>
              <button onClick={() => handleViewChange('card')}>카드형</button>
              <button onClick={() => handleViewChange('list')}>리스트형</button>
            </div>
            {userInfo?.boards?.length > 0 ? (
              <Writecon>
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
          <BookMarklist>
            <div>북마크한 글</div>
            <div>
              <button onClick={() => handleCategoryChange1('후기')}>
                후기
              </button>
              <button onClick={() => handleCategoryChange1('질문')}>
                질문
              </button>
              <button onClick={() => handleCategoryChange1('자유')}>
                자유
              </button>
              {/* 선택한 카테고리에 따라 글 목록을 표시하는 컴포넌트나 요소 추가 */}
              {/* 예를 들어, <CategoryPostsList category={selectedCategory} viewType={viewType} /> */}
            </div>
            <div>
              <button onClick={() => handleViewChange1('card')}>카드형</button>
              <button onClick={() => handleViewChange1('list')}>
                리스트형
              </button>
            </div>
            {userInfo?.boards?.length > 0 ? (
              <BookMarkcon>
                {userInfo?.boards
                  .filter((board) => board.category === selectedCategory1)
                  .map((boards, index) => (
                    <button
                      className="write"
                      key={index}
                      onClick={() => openDetail(boards.boardId)}
                    >
                      {boards.title}
                    </button>
                  ))}
              </BookMarkcon>
            ) : (
              <p>아직 북마크한 글이 없어요😅</p>
            )}
          </BookMarklist>
        </WriteContents>
      )}
      {selectedTab === 'products' && (
        <Producttab>
          <div>
            {' '}
            <PurchaseHistoryContainer>
              <div>구매내역</div>
            </PurchaseHistoryContainer>
          </div>
          <div>
            {' '}
            <PointHistoryContainer>
              <div>포인트내역</div>
            </PointHistoryContainer>
          </div>
        </Producttab>
      )}
      {selectedTab === 'edit' && (
        <Profile>
          <ProfileLeft>
            <img src={userInfo.profileImage} alt="useravatar" />
            <button className="edit" onClick={handleEditPhotoClick}>
              edit photo
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              disabled={isPasswordModalOpen}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="delBtn"
              disabled={isPasswordModalOpen}
              onClick={handleDeleteUser}
            >
              회원탈퇴하기
            </button>
            <DelModal
              isOpen={isDelModalOpen}
              onCancel={closeDelModal}
              onConfirm={confirmDeleteUser}
              warningMessage={warningMessage}
            />
          </ProfileLeft>
          <ProfileRight onSubmit={handleSubmit(confirmEditUser)}>
            {isEditMode ? (
              <>
                <div className="input-username">
                  <p>새 닉네임</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="새 닉네임을 입력해 주세요."
                    {...register('name', {
                      required: '닉네임은 필수 입력입니다.',
                    })}
                    onBlur={() => trigger('name')}
                    className={errors.name ? inputErrorClass : ''}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>

                <div className="input-phonenumber">
                  <p>새 전화번호</p>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="새 전화번호를 입력해 주세요."
                    {...register('phone', {
                      required: '전화번호는 필수 입력입니다.',
                    })}
                    onBlur={() => trigger('phone')}
                    className={errors.phone ? inputErrorClass : ''}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </div>

                <button
                  className="editinfo"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={confirmEditUser}
                >
                  수정완료
                </button>
              </>
            ) : (
              <div className="display">
                <div className="text">
                  닉네임<p>{userInfo.name}</p>
                  전화번호<p>{userInfo.phone}</p>
                </div>
                <button
                  className="editinfo"
                  disabled={isPasswordModalOpen}
                  onClick={() => setIsEditMode(true)}
                >
                  내정보 수정하기
                </button>
              </div>
            )}
            <PasswordModal
              isOpen={isPasswordModalOpen}
              onClose={closePasswordModal}
              onConfirm={handlePasswordVerification}
            >
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handlePasswordVerification}>
                비밀번호 확인
              </button>
              <button onClick={closePasswordModal}>취소</button>
            </PasswordModal>
          </ProfileRight>
        </Profile>
      )}

      <Footer />
    </MypageStyle>
  );
};

export default MyInfo;
