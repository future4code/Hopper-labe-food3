import styled from "styled-components";

export const Conteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = styled.header`
  display: flex;
  height: 100px;
  margin: 0;
  justify-content: center;
  align-items: center;
  background-color: #ff1616;

  img {
    display: flex;
    width: 150px;
    height: 250px;
  }
`;

export const LoginArea = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  h2 {
    margin: 10px;
  }
  div {
    width: 100%;
    /* margin-top: 5px; */
  }

  label {
    position: relative;
    top: 14px;
    left: 16px;
    background-color: white;
    padding: 5px;
    color: #b8b8b8;
  }

  input {
    width: 100%;
    padding: 15px;
    margin: 5px;
    border: 2px solid #b8b8b8;
    border-radius: 5px;
    ::placeholder {
      color: #b8b8b8;
    }
  }

  button {
    width: 100%;
    background-color: #e8222e;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    font-weight: bolder;
    margin-top: 20px;
    color: white;
    cursor:pointer;
  }
  .erro {
    color: red;
    font-size: 0.8em;
  }
`
