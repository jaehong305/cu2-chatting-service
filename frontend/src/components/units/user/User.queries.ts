import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;
export const UPLOAD_FILE = gql`
  mutation uploadFile($files: [Upload!]!) {
    uploadFile(files: $files)
  }
`;

export const FETCH_USER = gql`
  query fetchUser {
    fetchUser {
      email
      nickname
      image
    }
  }
`;
export const UPDATE_FILE = gql`
  mutation updateFile($files: [Upload!]!) {
    updateFile(files: $files)
  }
`;
export const UPDATE_NICKNAME = gql`
  mutation updateNickname($updateNicknameInput: UpdateNicknameInput!) {
    updateNickname(updateNicknameInput: $updateNicknameInput) {
      email
      nickname
      image
    }
  }
`;
