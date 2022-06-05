import styled from '@emotion/styled';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ChattingWrapper = styled.div`
  width: 100%;
  height: 640px;
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid #d6d7d9;
  border-radius: 2px;
`;
export const ChattingSidebar = styled.div`
  width: 23%;
  border-right: 1px solid #d6d7d9;
`;

export const ChattingBox = styled.div`
  width: 77%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChattingHeader = styled.div`
  font-size: 15px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  position: relative;
`;

export const ChattingContent = styled.div`
  overflow: auto;
  padding: 0 15px;
  height: 100%;
`;

export const ChattingSendBox = styled.div`
  padding: 20px;
  border-top: 1px solid #d6d7d9;
  background: #fafafa;
`;
export const ChattingInputBox = styled.div`
  display: flex;
`;
export const ChattingTextAreaBox = styled.div`
  border: 1px solid #aaa;
  border-radius: 3px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  margin-right: 10px;
`;
export const SendButton = styled(Button)`
  background-color: #b956ab;
  color: #fff;
  border-radius: 3px;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
`;
export const DefaultPofileImage = styled(UserOutlined)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
  font-size: 20px;
  background-color: #ddd;
  vertical-align: middle;
  line-height: 53px;
  color: #999;
`;
