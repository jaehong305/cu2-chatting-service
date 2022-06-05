import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Drawer } from 'antd';

export const DrawerCustom = styled(Drawer)`
  position: absolute;
  .ant-drawer-body {
    padding: 15px 0;
  }
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

export const DrawerChannelLi = styled.li`
  margin: 10px 15px 10px 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  border-radius: 2px;
  color: #777;
  cursor: pointer;

  & h4,
  div {
    max-width: 462px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SearchInput = styled.input`
  width: 33px;
  height: 30px;
  border-radius: 5px;
  transition: width 0.4s;

  &:focus {
    width: 350px;
    border-color: #b956ab;
  }
`;

export const SearchIcon = styled(SearchOutlined)`
  cursor: pointer;
  font-size: 18px;
  color: #888;
  position: absolute;
  height: 18px;
  top: 0;
  bottom: 0;
  right: 7px;
  margin: auto;
`;
