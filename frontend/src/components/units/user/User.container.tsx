import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { checkFileValidation } from '../../../commons/libraries/utils';
import UserUI from './User.presenter';
import { CREATE_USER, UPDATE_FILE, UPLOAD_FILE } from './User.queries';

export default function User(props) {
  const [nickname, setNickname] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [updateFile] = useMutation(UPDATE_FILE);

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    nickname ? setIsActive(true) : setIsActive(false);
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
            email: props.email,
            nickname,
          },
        },
      });
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <UserUI
      isEdit={props.isEdit}
      fileRef={fileRef}
      onClickImage={onClickImage}
      onUpdateFile={onUpdateFile}
      onChangeFile={onChangeFile}
      imageURL={imageURL}
      onChangeNickname={onChangeNickname}
      onClickSubmit={onClickSubmit}
      isActive={isActive}
      data={null}
      email={props.email}
    />
  );
}
