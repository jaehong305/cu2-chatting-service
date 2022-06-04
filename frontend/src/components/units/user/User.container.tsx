import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../../../../pages/mypage';
import { GlobalContext } from '../../../../pages/_app';
import { checkFileValidation } from '../../../commons/libraries/utils';
import UserUI from './User.presenter';
import { CREATE_USER, UPDATE_FILE, UPDATE_NICKNAME, UPLOAD_FILE } from './User.queries';

export default function User() {
  const [nickname, setNickname] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { email } = useContext(UserContext);
  const [createUser] = useMutation(CREATE_USER);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [updateFile] = useMutation(UPDATE_FILE);
  const [updateNickname] = useMutation(UPDATE_NICKNAME);
  const { userInfo, setUserInfo } = useContext(GlobalContext);

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    event.target.value ? setIsActive(true) : setIsActive(false);
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onUpdateFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkFileValidation(file);
    if (!isValid) return;

    try {
      const result = await updateFile({
        variables: {
          files: file,
        },
      });
      setImageURL(result.data?.updateFile[0] || '');
      setUserInfo({ ...userInfo, image: result.data?.updateFile[0] });
    } catch (error) {
      alert(error.message);
    }
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkFileValidation(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({
        variables: {
          files: file,
        },
      });
      setImageURL(result.data?.uploadFile[0] || '');
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickSubmit = async () => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            nickname,
            image: imageURL,
          },
        },
      });
      router.push('/mypage');
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickChangeNickname = async () => {
    try {
      const result = await updateNickname({
        variables: {
          updateNicknameInput: {
            nickname,
          },
        },
      });
      setUserInfo(result.data.updateNickname);
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      alert('닉네임은 2~6글자 한글만 가능합니다.');
    }
  };

  return (
    <UserUI
      fileRef={fileRef}
      onClickImage={onClickImage}
      onUpdateFile={onUpdateFile}
      onChangeFile={onChangeFile}
      imageURL={imageURL}
      onChangeNickname={onChangeNickname}
      onClickSubmit={onClickSubmit}
      onClickChangeNickname={onClickChangeNickname}
      isActive={isActive}
      userInfo={userInfo}
    />
  );
}
