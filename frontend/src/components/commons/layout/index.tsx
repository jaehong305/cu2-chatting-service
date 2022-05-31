import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactChild } from 'react';
import LayoutHeaderNavi from './headerNavi';

interface IProps {
  children: ReactChild;
}

const Body = styled.div`
  display: flex;
  justify-content: center;
`;
const Center = styled.div`
  width: 1024px;
`;

const HIDDEN_HEADERS = [''];

export default function Layout(props: IProps) {
  const router = useRouter();

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <div>
      {!isHiddenHeader && <LayoutHeaderNavi />}
      <Body>
        <Center>{props.children}</Center>
      </Body>
    </div>
  );
}
