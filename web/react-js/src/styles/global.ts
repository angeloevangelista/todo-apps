import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
  }

  body,
  input,
  button,
  textarea {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
  }

  button {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    :root {
      font-size: 65%;
    }
  }
`;

export { globalStyles };
