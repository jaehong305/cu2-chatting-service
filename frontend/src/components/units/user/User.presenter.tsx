import * as S from './User.styles';
import { UploadOutlined } from '@ant-design/icons';
import { Input, Upload, Button, message, Image } from 'antd';
import type { UploadProps } from 'antd';

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNGJPG = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
    if (!isPNGJPG) {
      message.error(`png 또는 jpg 형식의 파일만 업로드 가능합니다.`);
    }
    return isPNGJPG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
  multiple: false,
  maxCount: 1,
};

export default function UserUI({ isEdit }) {
  return (
    <S.Wrapper>
      <S.UserBox>
        <S.ProfileImage>
          <Image width={150} height={150} src="/image/null.png" />
          <Upload {...props}>
            <Button style={{ marginTop: '10px' }} icon={<UploadOutlined />}>
              프로필사진
            </Button>
          </Upload>
        </S.ProfileImage>
        <S.InfoBox>
          <div>이메일</div>
          <Input readOnly defaultValue={'aaa@aaa.com'} />
          <div>닉네임</div>
          <Input defaultValue={'aa'} />
          <Button size={'small'}>{isEdit ? '수정' : '등록'}</Button>
        </S.InfoBox>
      </S.UserBox>
    </S.Wrapper>
  );
}
