import styled from '@emotion/styled';
import { Collapse, Button, Drawer } from 'antd';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ChattingWrapper = styled.div`
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

export const DrawerCustom = styled(Drawer)`
  position: absolute;
  .ant-drawer-body {
    padding: 15px 0;
  }
`;

export const ServerNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  border-bottom: 1px solid #d6d7d9;
  color: #666;
`;
export const ServerName = styled.div`
  display: flex;
  align-items: center;
`;
export const ServerIcon = styled(MoreOutlined)`
  font-size: 20px;
  color: #aaa;
`;

export const ChannelDMBox = styled.div`
  height: 599px;
  overflow: auto;
  background: #fafafa;
`;

export const Collapse2 = styled(Collapse)`
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export const Li = styled.li`
  background-color: #fff;
  cursor: pointer;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    color: #fff;
    background-color: #b956ab;
  }

  & > span:first-child {
    max-width: 190px;
  }
`;

export const Alarm = styled.span`
  width: 15px;
  height: 15px;
  background-color: #b956ab;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
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
`;
export const ChattingContent = styled.div`
  overflow: auto;
  padding: 0 15px;
  height: 100%;
`;

export const ChattingSendBox = styled.div`
  height: 124px;
  border-top: 1px solid #d6d7d9;
  background: #fafafa;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ChattingInputBox = styled.div`
  display: flex;
  align-items: center;
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
export const ImageBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageButton = styled(Button)`
  color: #777;
  font-size: 12px;
`;

export const DrawerUl = styled.ul`
  overflow: auto;
  height: 500px;
`;
export const DrawerLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px 10px 20px;

  & span:last-child {
    cursor: pointer;
  }
`;

export const Img = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
`;
export const DefaultPofile = styled(UserOutlined)`
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
