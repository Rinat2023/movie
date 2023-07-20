import React from 'react';
import { styled } from 'styled-components';

export const ModalInput = ({ type, value, placeholder, onChange }) => {
  return (
    <>
      <ModalInputCss
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
const ModalInputCss = styled.input`
  padding: 20px 20px;
  width: 540px;
  outline: none;
  border: none;
  border-radius: 10px;
  &:focus {
    transition-duration: 1s;
    transform: scale(1.03);
  }
`;
