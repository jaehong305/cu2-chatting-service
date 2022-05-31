import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Fragment, MouseEvent } from 'react';

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
  const router = useRouter();

  const onClickMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element) router.push(e.target.id);
  };

  return (
    <Wrapper>
      {HEADER_NAVI_MENUS.map((e) => (
        <Fragment key={e.page}>
          <MenuItem id={e.page} onClick={onClickMenu}>
            {e.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
