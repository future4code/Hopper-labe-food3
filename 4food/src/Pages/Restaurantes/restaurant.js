import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";
import { useContext } from "react";

const Img = styled.img`
  width: 250px;
`;
const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

function Restaurante() {
  const token = localStorage.getItem("token-fourFoodA");

  const { states, setters } = useContext(GlobalContext);
  const { detalhes } = states;
  const { carrinho } = states;
  const { setDetalhes } = setters;
  const { setCarrinho } = setters;

  const { id } = useParams();

  let navigate = useNavigate();
  const goCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    mostrarDeatlhes();
  }, []);

  const mostrarDeatlhes = () => {
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants/${id}`,
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        setDetalhes(response.data.restaurant.products);
        console.log(response.data.restaurant.products);
      });
  };

  const comprarProduto = (produto) => {
    const index = carrinho.findIndex((adicionarNoCarrinho) => {
      if (adicionarNoCarrinho.id === produto.id) {
        return true;
      } else {
        return false;
      }
    });

    console.log(index);

    if (index === -1) {
      const quantidadeProduto = {
        ...produto,
        quantidade: 1,
      };
      const copyProdutos = [...carrinho, quantidadeProduto];
      setCarrinho(copyProdutos);
    } else {
      const copyProdutos = carrinho.map((adicionarNoCarrinho) => {
        if (adicionarNoCarrinho.id === produto.id) {
          return {
            ...adicionarNoCarrinho,
            quantidade: adicionarNoCarrinho.quantidade + 1,
          };
        } else {
          return adicionarNoCarrinho;
        }
      });
      setCarrinho(copyProdutos);
    }

    console.log(carrinho);
  };

  const ListDetalhes = detalhes.map((detalhe) => {
    return (
      <Div key={detalhe.id}>
        {detalhe.name}
        <Img src={detalhe.photoUrl}></Img>
        R${detalhe.price},00
        {detalhe.description}
        {detalhe.category}
        <button onClick={() => comprarProduto(detalhe)}>comprar</button>
      </Div>
    );
  });

  return (
    <div>
      <div>
        <button onClick={goCart}>carrinho</button>
      </div>
      {ListDetalhes}
    </div>
  );
}

export default Restaurante;
