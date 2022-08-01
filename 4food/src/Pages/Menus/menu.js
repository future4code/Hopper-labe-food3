import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";
import Nav from "../../components/Nav";
import Lupa from "../img/search.png";
import Logo from "../img/logo.png";
import Cabecalho from "../../layouts/Cabecalho";


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

const Img = styled.img`
  width: 21.5rem;
  height: 7.5rem;
  margin: 0 0 0.75rem;
  object-fit: contain;
`

const Container = styled.div`
  width: 21.5rem;
  height: 13.25rem;
  margin: 3.125rem 0 0;
  padding: 0.5rem 1rem 0;
  border-radius: 8px;
  border: solid 1px #b8b8b8;
  margin-left:15px;
  
  div{
    display:flex;
    justify-content:space-between;
       
  }

  h2{
   width: 18.5rem;
   height: 1.10rem;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-size: 1,5rem;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: normal;
   color: #e8222e;
   text-align: center;
  
  }
`

const P = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.2rem 1rem 0 0.5rem;
  font-family: Roboto;
  font-size: 1rem;
  letter-spacing: -0.39px;
  color: #b8b8b8;
`


const Busca = styled.input`
  width: 17.5rem;
  height: 3.5rem;
  padding: 1rem 0.503rem 1rem 1.063rem;
  border-radius: 2px;
  border: solid 1px #b8b8b8;
  margin-left:25px;
  
`
const LupaImg = styled.img`
width:35px;
margin-top:15px;
margin-left:10px;
`

const BoxLista = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`



function Restaurante() {
  const token = localStorage.getItem("token-fourFoodA");

  const { states, setters } = useContext(GlobalContext);
  const { restaurantes } = states;
  const { setRestaurantes } = setters;
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    mostrarRestaurantes();
  }, []);

  const mostrarRestaurantes = () => {
    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants",
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        setRestaurantes(response.data.restaurants);
      });
  };

  const busca = (event) => {
    setBuscar(event.target.value);
    console.log(event.target.value);
  };
  const filtrar = restaurantes.filter((filtro) => {
    return <div>{filtro.name}</div>;
  });

  const listRestaurants = filtrar.map((restaurante) => {
    return (
      <Container key={restaurante.id}>
        <Link to={`/restaurantes/1`}>
          <Img src={restaurante.logoUrl}></Img>{" "}
        </Link>
        <h2>{restaurante.name}</h2>

        <P>
          <div>{restaurante.deliveryTime}Min </div>
          <div>Frete R${restaurante.shipping},00</div>
        </P>
      </Container>
    );
  });

  return (
    
    <Cabecalho>
      {/* <LupaImg src={Lupa}></LupaImg> */}
      
       
      <BoxLista>
        {listRestaurants}
      </BoxLista>     
    </Cabecalho>
  );
}

export default Restaurante;
