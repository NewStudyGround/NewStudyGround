/* eslint-disable react/prop-types */
import React from 'react';
import * as Styled from './ComlistStyle';

const Comlist = ({ username, email, tag, title, onClick, img }) => {
  return (
    <Styled.ComlistContainer onClick={onClick}>
      <img src={img} alt="useravatar" />
      <Styled.Username>{username}</Styled.Username>
      <Styled.Email>{email}</Styled.Email>
      <Styled.Tag>{tag}</Styled.Tag>
      <Styled.Title>{title}</Styled.Title>
    </Styled.ComlistContainer>
  );
};

export default Comlist;
