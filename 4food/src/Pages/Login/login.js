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
    margin:5px;
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

                <input type="text" placeholder="email" value={email} onChange={onchangeEmail}></input>
                <input type="password" placeholder="senha" value={password} onChange={onchangePassword}></input>
                <p>{erro}</p>

                <button onClick={onClickLogin}>Entrar</button>

                <p>N??o possui cadastro? <Link to = '/cadastro' >Clique aqui.</Link></p>
            </LoginArea>
        </LoginPage>
    )
}

export default Login