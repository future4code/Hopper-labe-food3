import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalState = (props) => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");

    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [paginaEndereco, setPaginaEndereco] = useState(false);

    const [password, setPassword] = useState("");
    const [restaurantes, setRestaurantes] = useState([])
    const [detalhes, setDetalhes] = useState([]);
    const [comprar,setComprar] = useState([])
    const [frete, setFrete] = useState([]);
    const [carrinho, setCarrinho] = useState([])
    const [buscar, setBuscar] = useState()

    const states = {
        nome,
        email,
        cpf,
        senha,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        paginaEndereco,
        password,
        restaurantes,
        detalhes,
        comprar,
        frete,
        carrinho,
        buscar,
    }

    const setters = {
        setNome,
        setEmail,
        setCpf,
        setSenha,
        setRua,
        setNumero,
        setComplemento,
        setBairro,
        setCidade,
        setEstado,
        setPaginaEndereco,
        setPassword,
        setRestaurantes,
        setDetalhes,
        setComprar,
        setFrete,
        setCarrinho,
        setBuscar,
    }

    return<GlobalContext.Provider value ={{states, setters}}>
        {props.children}
        </GlobalContext.Provider>
}

export default GlobalState;