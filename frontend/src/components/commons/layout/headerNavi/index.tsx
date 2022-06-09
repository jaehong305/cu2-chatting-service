import styled from '@emotion/styled';
import { Fragment } from 'react';
import { useMoveToPage } from '../../hooks/useMoveToPage';

export const Wrapper = styled.div`
  height: 64px;
  background-image: linear-gradient(to right, purple, #c51c76, #5f1ab9);
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: white;
`;

export const MenuItem = styled.div`
  height: 64px;
  margin: 0px 60px;
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;

  :hover {
    color: #20deff;
  }
`;

const HEADER_NAVI_MENUS = [
  { name: 'INTRO', page: '/' },
  { name: 'CHATTING', page: '/chatting' },
  { name: 'MYPAGE', page: '/mypage' },
];

export default function LayoutHeaderNavi() {
  const { moveToPage } = useMoveToPage();

  return (
    <Wrapper>
      {HEADER_NAVI_MENUS.map((e) => (
        <Fragment key={e.page}>
          <MenuItem onClick={moveToPage(e.page)}>{e.name}</MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
