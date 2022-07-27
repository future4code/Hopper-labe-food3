import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";

function Cart() {
  const navigate = useNavigate();
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
    </div>
  );
}

export default Cart;
