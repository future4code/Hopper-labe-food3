import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link, } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";

const Img = styled.img`
  width: 20.5rem;
  height: 7.5rem;
  margin: 0 0 0.75rem;
  object-fit: contain;
`;

const Container = styled.div`

  width: 22.5rem;
  height: 15.25rem;
  margin: 3.125rem 0 0;
  padding: 0.5rem 1rem 0;
  border-radius: 8px;
  border: solid 1px #B8B8B8;

 
`;

const P = styled.div`

  display:flex;
  justify-content:space-between;
  width: 8.75rem;
  height: 1.125rem;
  margin: 0.50rem 1rem 0 0.5rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #B8B8B8;
`
const Time = styled.div`
  display: flex;
`

const Frete = styled.div`
  display: flex;
  justify-content: flex-end;
`


const Restaurantes = styled.h2`
  
  width: 18.5rem;
  height: 1.125rem;
  margin: 0.75rem 1rem 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #E8222E;
  text-align:center;
`



function Restaurante() {
  const token = localStorage.getItem("token-fourFoodA");

  const { states, setters } = useContext(GlobalContext);
  const { restaurantes } = states;
  const { setRestaurantes } = setters;
  const [buscar, setBuscar] = useState("")
  

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
       
                
        console.log(response.data.restaurants);
      });
      
  };

  
  const busca = (event) =>{
    
  setBuscar(event.target.value)
  console.log(event.target.value)

  }
   const filtrar = restaurantes.filter((filtro)=>{
    return(
      <div>
         {filtro.name}
      </div>
    )

   })

  const listRestaurants = filtrar.map((restaurante) => {
    
    return (
      
      <Container key={restaurante.id}>
        
        <Link to={`/restaurantes/${restaurante.id}`}>
          <Img src={restaurante.logoUrl}></Img>{" "}
        </Link>
        <Restaurantes>{restaurante.name}</Restaurantes>

       <P>
        <Time>{restaurante.deliveryTime}Min </Time> 
        <Frete>Frete R${restaurante.shipping},00</Frete>
        </P>  
       
        
        
      </Container>
      
    );
  });

  return <div>

     <input type="search" value={buscar} placeholder="buscar" onChange={busca}></input>
    {listRestaurants}
    </div>;
}

export default Restaurante;