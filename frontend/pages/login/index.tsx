import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalContext } from '../_app';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const LoginBox = styled.div`
  margin-top: 20px;
  width: 460px;
  height: 250px;
  background-color: #7c2478;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    margin-bottom: 30px;
    color: #fff;
    font-weight: bold;
  }

  & div {
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
  }

  & div img {
    margin-right: 20px;
    background-color: #fff;
    :last-child {
      margin-right: 0;
    }
  }
`;
const SocialLoginImg = styled.img`
  width: 50px;
  cursor: pointer;
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function SocialLoginPage() {
  const router = useRouter();
  const [login] = useMutation(LOGIN);
  const { setAccessToken } = useContext(GlobalContext);

  const onClickNaverLogin = async () => {
    router.push('http://localhost:4000/login/naver');
  };
  const onClickGoogleLogin = async () => {
    router.push('http://localhost:4000/login/google');
  };
  const onClickKakaoLogin = async () => {
    router.push('http://localhost:4000/login/kakao');
  };

  const onClickLogin = async () => {
    try {
      const result = await login({
        variables: {
          email: 'aaa@aaa.com',
          password: '1234',
        },
      });
      const accessToken = result.data?.login || '';
      if (setAccessToken) setAccessToken(accessToken);

      router.push('/mypage');
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <h2>SOCIAL LOGIN</h2>
        <div>
          <SocialLoginImg
            src="/image/naver.png"
            alt="네이버로 로그인"
            onClick={onClickNaverLogin}
          />
          <SocialLoginImg
            src="/image/google.png"
            alt="구글로 로그인"
            onClick={onClickGoogleLogin}
          />
          <SocialLoginImg
            src="/image/kakao.png"
            alt="카카오로 로그인"
            onClick={onClickKakaoLogin}
          />
        </div>
        <Button onClick={onClickLogin} style={{ marginTop: '24px' }}>
          SNS가입없이 테스트용 계정으로 로그인하기! 클릭!
        </Button>
      </LoginBox>
    </Wrapper>
  );
}
