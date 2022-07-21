import React, {useState} from "react";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cadastro(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")

    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    
    const [paginaEndereco, setPaginaEndereco] = useState(false)

    
    
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
        }
        axios.post("https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/signup", body, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            setPaginaEndereco(true)
            localStorage.setItem("token-fourFoodA",response.data.token);
        })
        .catch(err => console.log(err))
    }
    
    const criarEndereco = () => {
        const token = localStorage.getItem("token-fourFoodA");
        console.log("token",token);
        const body = {
            "street": rua,
            "number": numero,
            "neighbourhood": bairro,
            "city":cidade,
            "state": estado,
            "complement": complemento,
        }
        axios.put("https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/address", body, {
            headers: {
                "Content-Type": "application/json",
                "auth": `${token}`
            }
        })
        .then(response => {
            localStorage.removeItem("token-fourFoodA");
            localStorage.setItem("token",response.data.token);
            goHome()
            console.log(response)
        })
        .catch(err => console.log(err))
    }


    const renderCadastro = () => {
        if(!paginaEndereco) {
            return (
                <div>   
                    <input 
                        type="text" 
                        placeholder="Nome e sobrenome" 
                        value={nome} 
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="email@email.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputMask 
                        mask="999.999.999-99" 
                        type="text" 
                        placeholder="000.000.000-00" 
                        value={cpf} 
                        onChange={e => setCpf(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Mínimo 6 caracteres" 
                        value={senha} 
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button onClick={() => criarUsuario()}>Criar</button>
                </div>
            )
        } else {
            return (
                <div>
                    <input 
                        type="text" 
                        placeholder="Rua/Av."
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Número"
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Apto / Bloco"
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Bairro"
                        value={bairro}
                        onChange={e => setBairro(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Estado"
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                    />
                    <button onClick={() => criarEndereco()}>Salvar</button> 
                </div>
            )
        }
    }

    return(
        <div>
            {renderCadastro()}
        </div>
    )
}

export default Cadastro