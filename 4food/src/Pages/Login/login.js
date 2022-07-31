import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.png"
import axios from "axios";
import GlobalContext from "../../global/GlobalContext";


const LoginPage = styled.div`
margin:0;
padding:0;
`
const Header = styled.header`
display:flex;
height:100px;
margin:0;
justify-content:center;
align-items:center;
background-color:#FF1616;


img{
   display:flex;
   width:150px;
   height:250px;
   
}
`

const LoginArea = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:10px;

    input{
        width: 100%;
        padding: 15px;
        border: 2px solid #b8b8b8;
        border-radius: 5px;
        ::placeholder {
        color: #b8b8b8;
        }
    }   
    label {
        position: relative;
        top: 7px;
        left: 13px;
        background-color: white;
        padding: 5px;
        color: #b8b8b8;
    }
    button {
        width: 100%;
        background-color: #e8222e;
        border: 0;
        border-radius: 5px;
        padding: 20px;
        font-weight: bolder;
        margin-top: 20px;
        cursor:pointer;
  }

`


function Login(){

    const [erro, setErro] = useState();
    
    let navigate = useNavigate();
        const goHome = () => {
            navigate("/menu");
          };

    const {states, setters} = useContext(GlobalContext);
    const {email} = states;
    const {setEmail} = setters;
    const {password} = states;
    const {setPassword} = setters;

    const onchangeEmail = (event) =>{
        setEmail(event.target.value)
    }

    const onchangePassword = (event) =>{
        setPassword(event.target.value)
    }

    const onClickLogin = () =>{

        const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/login'
        const body = {
            email:email,
            password:password,
        }
        console.log(email,password)
        axios.post(url,body)
        .then((response)=>{
            localStorage.setItem("token-fourFoodA",response.data.token);
            goHome()
            console.log(response)
        }).catch((error)=>{
            setErro(error.response.data.message)
            console.log(error)

        })

        
    }
    return(
        <LoginPage>
            <Header>
                <img src={Logo}></img>
            </Header>

            <LoginArea>
                <h2>Entrar</h2>

                <div>
                    <label>Email</label>
                    <input type="text" placeholder="email@email.com" value={email} onChange={onchangeEmail}></input>
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={onchangePassword}></input>
                </div>
                

                
                <p>{erro}</p>

                <button onClick={onClickLogin}>Entrar</button>

                <p>Não possui cadastro? <Link to = '/cadastro' >Clique aqui.</Link></p>
            </LoginArea>
        </LoginPage>
    )
}

export default Login