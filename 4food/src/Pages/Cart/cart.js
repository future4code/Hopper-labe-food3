import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import GlobalContext from "../../global/GlobalContext";

function Cart() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token-fourFoodA");
  
  const { states, setters } = useContext(GlobalContext);
  const { carrinho } = states;
  const { setCarrinho } = setters;

  const removerProduto = (id) => {
    const copyCarrinho = carrinho.map((produto) => {
      if (produto.id === id) {
        return { ...produto, quantidade: produto.quantidade - 1 };
      } else return produto;
    });
    setCarrinho(copyCarrinho);
  };

  const confirmarPedido = () => {
    const url = `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants/${id}/order`;
    const products = carrinho.map(produto => ({id: produto.id, quantity: produto.quantidade}))
    const body = {
      products,
      paymentMethod: "creditcard"
    }

    // Não faz um novo pedido se outro estiver em andamento 
    axios.post(url,body, {
      headers: {
        "Content-Type": "application/json",
        auth: `${token}`,
      },
    })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const listarProdutos = carrinho.map((produto) => {
    if (produto.quantidade > 0) {
      return (
        <div key={produto.id}>
          <p>{produto.quantidade}</p>
          <p>{produto.name}</p>
          <p>{produto.description}</p>
          <p>R${produto.price}</p>
          <button onClick={() => removerProduto(produto.id)}>Remover</button>
        </div>
      );
    }
  });

  return (
    <div>
      <h2>Carrinho</h2>
      <button onClick={() => navigate("/restaurantes/1")}>
        Continuar comprando
      </button>
      {listarProdutos}
      <button onClick={() => confirmarPedido()}>Confirmar</button>
    </div>
  );
}

export default Cart;
