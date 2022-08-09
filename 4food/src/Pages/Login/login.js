import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.png";
import axios from "axios";
import GlobalContext from "../../global/GlobalContext";

const LoginPage = styled.div`
  width: 100%;
  height: 100vh;
`
const Header = styled.header`
  display: flex;
  height: var(--altura-header);
  justify-content: center;
  align-items: center;
  background-color: #ff1616;
  img {
    object-fit: cover;
    width: 150px;
    height: 250px;
  }
`;

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  padding: 10px;
  h2 {
    margin: 10px;
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
  label {
    position: relative;
    top: 14px;
    left: 16px;
    background-color: white;
    padding: 5px;
    color: #b8b8b8;
  }
  button {
    width: 250px;
    background-color: #e8222e;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 5px;
    color: white;
    font-weight: bolder;
    margin-top: 20px;
    cursor: pointer;
  }
  .erro {
    color: red;
    font-size: 0.8em;
  }
`

function Login() {
  const [erro, setErro] = useState();

  let navigate = useNavigate();
  const goHome = () => {
    navigate("/menu");
  };

  const { states, setters } = useContext(GlobalContext);
  const { email } = states;
  const { setEmail } = setters;
  const { password } = states;
  const { setPassword } = setters;

  const onchangeEmail = (event) => {
    setErro('')
    setEmail(event.target.value);
  };

  const onchangePassword = (event) => {
    setErro('')
    setPassword(event.target.value);
  };

  const onClickLogin = () => {
    const url =
      "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/login";
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(url, body)
      .then((response) => {
        localStorage.setItem("token-fourFoodA", response.data.token);
        goHome();
      })
      .catch((error) => {
        setErro(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <LoginPage>
      <Header>
        <img src={Logo}></img>
      </Header>

      <LoginArea>
        <h2>Entrar</h2>

        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={onchangeEmail}
          ></input>
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={onchangePassword}
          ></input>
        </div>

        <p className="erro">{erro}</p>

        <button onClick={onClickLogin}>Entrar</button>

        <p>
          Não possui cadastro? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </LoginArea>
    </LoginPage>
  );
}

export default Login;
