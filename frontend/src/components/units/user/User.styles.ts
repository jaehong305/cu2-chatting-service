import styled from '@emotion/styled';
import { Button } from 'antd';
import { IMyButtonProps } from './User.types';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const UserBox = styled.div`
  margin-top: 20px;
  width: 460px;
  height: 250px;
  background-color: #fafafa;
  border: 1px solid #7c2478;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ProfileImage = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const InfoBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & div {
    font-weight: bold;
    margin-bottom: 10px;
  }

  & input {
    margin-bottom: 20px;
  }
`;
