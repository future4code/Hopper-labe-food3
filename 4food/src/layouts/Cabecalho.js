import React from "react";
import styled from 'styled-components';
import Logo from "../Pages/img/logo.png";
import Nav from '../components/Nav/index';
import Lupa from "../Pages/img/search.png";

const ContainerApp = styled.div`
    padding-top: 100px;
    @media (max-width: 800px) {
        padding-top: 130px;
        padding-bottom: 80px;
    }
`
const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    background-color: #ff1616;
    @media (max-width: 800px) {
        justify-content: center;
    }
`
const BoxLogo = styled.div`
    width: 150px;
    img {
        margin-top: 20px;
        width: 150px;
        height: 100%;
    }
`
const BoxBusca = styled.div`
    position: relative;
    input {
        width: 17.5rem;
        height: 3.5rem;
        padding: 1rem 0.503rem 1rem 35px;
        border-radius: 2px;
        border: solid 1px #b8b8b8;
        margin-left:25px;
    }
    img {
        position: absolute;
        top: 30%;
        left: 10%;
    }
    @media (max-width: 800px) {
        position: fixed;
        top: 110px;
        left: 0;
        width: 100%;
        input {
            width: 90%;
        }
        img {
            left: 30px;
        }
    }

`
const BoxMenu = styled.div`
    @media (max-width: 800px) {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
`

export default function Cabecalho({ children }) {
    return (
        <ContainerApp>
            <Header>
                <BoxLogo>
                    <img src={Logo}></img>
                </BoxLogo>
                <BoxMenu>
                    <Nav />
                </BoxMenu>
                <BoxBusca className="busca">
                    <input type="search" placeholder="Restaurante" ></input>
                    <img src={Lupa} />
                </BoxBusca>
            </Header>
            {children}
        </ContainerApp>
    )
}