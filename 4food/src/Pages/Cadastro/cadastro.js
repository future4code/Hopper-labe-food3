import React, { useContext } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, LoginArea } from "./styles";
import Logo from "../img/logo.png";
import GlobalContext from "../../global/GlobalContext";

function Cadastro() {

  const {states, setters} = useContext(GlobalContext);
  const {nome} = states;
  const {email} = states;
  const {cpf} = states;
  const {senha} = states;
  const {setNome} = setters;
  const {setEmail} = setters;
  const {setCpf} = setters;
  const {setSenha} = setters;

  const {rua} = states;
  const {numero} = states;
  const {complemento} = states;
  const {bairro} = states;
  const {cidade} = states;
  const {estado} = states;
  const {setRua} = setters;
  const {setNumero} = setters;
  const {setComplemento} = setters;
  const {setBairro} = setters;
  const {setCidade} = setters;
  const {setEstado} = setters;

  const {paginaEndereco} = states;
  const {setPaginaEndereco} = setters;
  

  let navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  const criarUsuario = () => {
    const body = {
      name: nome,
      email: email,
      cpf: cpf,
      password: senha,
    };
    axios
      .post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPaginaEndereco(true);
        localStorage.setItem("token-fourFoodA", response.data.token);
      })
      .catch((err) => console.log(err));
  };

  const criarEndereco = () => {
    const token = localStorage.getItem("token-fourFoodA");
    console.log("token", token);
    const body = {
      street: rua,
      number: numero,
      neighbourhood: bairro,
      city: cidade,
      state: estado,
      complement: complemento,
    };
    axios
      .put(
        "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/address",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("token-fourFoodA");
        localStorage.setItem("token", response.data.token);
        goHome();
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const renderCadastro = () => {
    if (!paginaEndereco) {
      return (
        <LoginArea>
          <h2>Cadastrar</h2>
          <div>
            <label>Nome*</label>
            <input
              type="text"
              value={nome}
              placeholder="Nome e sobrenome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label>Email*</label>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>CPF</label>
            <InputMask
              mask="999.999.999-99"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button onClick={() => criarUsuario()}>Criar</button>
        </LoginArea>
      );
    } else {
      return (
        <LoginArea>
          <h2>Meu endereço</h2>
          <div>
            <label>Logradouro*</label>
            <input
              type="text"
              placeholder="Rua/Av."
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>
          <div>
            <label>Número*</label>
            <input
              type="number"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div>
            <label>Complemento</label>
            <input
              type="text"
              placeholder="Apto / Bloco"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
          <div>
            <label>Bairro*</label>
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>
          <div>
            <label>Cidade*</label>
            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
          <div>
            <label>Estado*</label>
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>
          <button onClick={() => criarEndereco()}>Salvar</button>
        </LoginArea>
      );
    }
  };

  return (
    <div>
      <Header>
        <img src={Logo}></img>
      </Header>
      {renderCadastro()}
    </div>
  );
}

export default Cadastro;
