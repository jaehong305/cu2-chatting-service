import styled from '@emotion/styled';
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

export default function Layout(props: IProps) {
  return (
    <div>
      <LayoutHeaderNavi />
      <Body>
        <Center>{props.children}</Center>
      </Body>
    </div>
  );
}
