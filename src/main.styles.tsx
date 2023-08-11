import { Global, css } from "@emotion/react";

const globalStyles = () => {
  const styles = css`
    :root {
      --primary: #3eb3ed;
      --primary_hover: #379fd4;
      --danger: #ed5564;
      --danger_hover: #d44c5a;
      --success: #9bcc50;
      --success_hover: #87b346;
      --green: #00e676;
      --grey: #F0F3F5;
      --default: 'black';
      --primaryFont: 'Rubik', sans-serif;
    }
    *,
    *::after,
    *::before {
      padding: 0;
      margin: 0;
      box-sizing: inherit;
      font-family: var(--primaryFont);
      color: black;
    }

    html {
      font-size: 62.5%;
    }

    body {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    input,
    textarea,
    select {
      color: black;
      font-family: var(--primaryFont);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--primaryFont);
    }
    h1 {
      font-size: 2.4rem;
    }
    h2 {
      font-size: 2.2rem;
    }
    h3 {
      font-size: 2rem;
    }
    h4 {
      font-size: 1.8rem;
    }
    h5 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.2rem;
    }
  `;
  return <Global styles={styles} />;
};
export default globalStyles;
