import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const CustomButton = styled.button`
  display: block;
  padding: 0.35em 1.2em;
  border: 0.2em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.7em;
  box-sizing: border-box;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  transition: all 0.2s;
  background-color: transparent;
  cursor: pointer;
  
  &:hover {
    color: rgba(79, 70, 229, 1);
    background-color: #FFFFFF;
  }
`;

const ActionButton = ({ content, path }) => {
  return (
    <Link href={path}>
      <a>
        <CustomButton>{content}</CustomButton>
      </a>
    </Link>
  );
};

export default ActionButton;
