import styled from '@emotion/styled';
import { Collapse } from 'antd';

export const Wrapper = styled.div`
  height: 599px;
  overflow: auto;
  background: #fafafa;
`;

export const CollapseCustom = styled(Collapse)`
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
`;
export const ChannelName = styled.span`
  max-width: 190px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
