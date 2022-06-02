import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../../../../pages/mypage';
import { checkFileValidation } from '../../../commons/libraries/utils';
import UserUI from './User.presenter';
import { CREATE_USER, FETCH_USER, UPDATE_FILE, UPLOAD_FILE } from './User.queries';

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
  const { data } = useQuery(FETCH_USER);

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

  return (
    <UserUI
      fileRef={fileRef}
      onClickImage={onClickImage}
      onUpdateFile={onUpdateFile}
      onChangeFile={onChangeFile}
      imageURL={imageURL}
      onChangeNickname={onChangeNickname}
      onClickSubmit={onClickSubmit}
      isActive={isActive}
      data={data}
    />
  );
}
