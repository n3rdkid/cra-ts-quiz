import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing:border-box;
    }
    html{
        height:100vh;
    }
    body{
        margin:0;
        padding:0;
        display:flex;
        justify-content:center;
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .score {
    color: #323232;
    font-size: 18px;
    margin: 0;
  }
  h1 {
    font-weight: 700;
    letter-spacing: -5%;
  }
  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;
  }
`;
