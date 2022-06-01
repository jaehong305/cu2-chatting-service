import * as S from './User.styles';
import { Input, Image, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function UserUI({
  isEdit,
  fileRef,
  onClickImage,
  onUpdateFile,
  onChangeFile,
  imageURL,
  onChangeNickname,
  onClickSubmit,
  isActive,
  data,
  email,
}) {
  return (
    <S.Wrapper>
      <S.UserBox>
        <S.ProfileImage>
          {imageURL ? (
            <Image width={150} height={150} src={`https://storage.googleapis.com/${imageURL}`} />
          ) : (
            <Image
              width={150}
              height={150}
              src={
                data
                  ? `https://storage.googleapis.com/${data?.fetchUser?.image.replace(
                      'thumb',
                      'origin',
                    )}`
                  : '/image/null.png'
              }
            />
          )}
          <Button icon={<UploadOutlined />} onClick={onClickImage} style={{ marginTop: '12px' }}>
            프로필 이미지
          </Button>
          <input
            type="file"
            ref={fileRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={isEdit ? onUpdateFile : onChangeFile}
          />
        </S.ProfileImage>
        <S.InfoBox>
          <div>이메일</div>
          <Input readOnly value={email} />
          <div>닉네임</div>
          <Input onChange={onChangeNickname} defaultValue={data?.fetchUser?.nickname} />
          <S.MyButton
            size={'small'}
            onClick={onClickSubmit}
            isActive={!isEdit && isActive}
            disabled={!isEdit && !isActive}
          >
            {isEdit ? '정보수정' : '회원가입'}
          </S.MyButton>
        </S.InfoBox>
      </S.UserBox>
    </S.Wrapper>
  );
}
