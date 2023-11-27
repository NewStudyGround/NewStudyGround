import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const PasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmClick = () => {
    if (password === '123') {
      onConfirm();
      onClose();
      toast.success('비밀번호 확인 성공!');
    } else {
      toast.error('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="password-modal">
      <h2>비밀번호 확인</h2>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleConfirmClick}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

PasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PasswordModal;
