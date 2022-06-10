import * as S from './User.styles';
import { Image, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../../../../pages/mypage';

export default function UserUI(props) {
  const { isEdit, email } = useContext(UserContext);

  return (
    <S.Wrapper>
      <S.UserBox>
        <S.ProfileImage>
          {props.imageURL ? (
            <Image
              width={150}
              height={150}
              src={`https://storage.googleapis.com/${props.imageURL}`}
            />
          ) : (
            <Image
              width={150}
              height={150}
              src={
                props.data?.fetchUser?.image
                  ? `https://storage.googleapis.com/${props.data?.fetchUser?.image.replace(
                      'thumb',
                      'origin',
                    )}`
                  : '/image/null.png'
              }
            />
          )}
          <Button
            icon={<UploadOutlined />}
            onClick={props.onClickImage}
            style={{ marginTop: '12px' }}
          >
            프로필 이미지
          </Button>
          <input
            type="file"
            ref={props.fileRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={isEdit ? props.onUpdateFile : props.onChangeFile}
          />
        </S.ProfileImage>
        <S.InfoBox>
          <div>이메일</div>
          <input readOnly value={props.data?.fetchUser?.email || email || ''} />
          <div>닉네임</div>
          <input
            onChange={props.onChangeNickname}
            defaultValue={props.data?.fetchUser?.nickname || ''}
          />
          <Button
            size={'small'}
            onClick={isEdit ? props.onClickChangeNickname : props.onClickSubmit}
            disabled={!props.isActive}
          >
            {isEdit ? '닉네임 변경' : '회원가입'}
          </Button>
        </S.InfoBox>
      </S.UserBox>
    </S.Wrapper>
  );
}
