import axios from "axios";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";

const Img = styled.img`
  width: 200px;
`;

const Container = styled.div`
  border: 1px solid black;
  display: flex;
`;

function Menu() {
  const token = localStorage.getItem("token-fourFoodA");

  const { states, setters } = useContext(GlobalContext);
  const { restaurantes } = states;
  const { setRestaurantes } = setters;

  useEffect(() => {
    mostrarMenus();
  }, []);
  const mostrarMenus = () => {
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

  const listRestaurants = restaurantes.map((restaurante) => {
    return (
      <Container key={restaurante.id}>
        <h2>{restaurante.name}</h2>
        <Link to={`/restaurantes/${restaurante.id}`}>
          <Img src={restaurante.logoUrl}></Img>{" "}
        </Link>

        {restaurante.address}
        {restaurante.category}
        {restaurante.deliveryTime}
        {restaurante.description}
        {restaurante.shipping}
      </Container>
    );
  });

  return <div>{listRestaurants}</div>;
}

export default Menu;
