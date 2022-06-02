import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    list-style: none;
  }

  input {
    outline: none;
    height: 30px;
    padding-left: 10px;
  }
  textarea {
    border: none;
    outline: none;
    resize: none;
  }

  ul {
    margin: 0;
  }

  @font-face {
    font-family: 'myFont';
    src: url('/fonts/');
  }
`;
