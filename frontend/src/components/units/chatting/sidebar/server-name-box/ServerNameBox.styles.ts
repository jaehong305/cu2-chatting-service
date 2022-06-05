import { MoreOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 10px;
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
