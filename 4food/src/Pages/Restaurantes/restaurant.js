import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";
import { useContext } from "react";

const ContainerRestaurant = styled.div`
  
`
const Img = styled.img`
  width: 250px;
`;
const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
const PopPup = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    width: 280px;
    padding: 10px;
    p {
      width: 100%;
      text-align: right;
    }
    button.add-carrinho {
      padding: 10px;
      margin: 10px;
    }
    span {
      margin: 10px;
    }
  }
  .contador {
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 120px;
    font-size: 1.5em;
    transition: all 0.3;
    button {
      border: none;
      background-color: transparent;
      color: red;
      font-size: 1.3em;
      &:hover {
        font-size: 1.5em;
      }
    }
    .cinza {
      color: #ccc;
    }
  }
`

function Restaurante() {
  const token = localStorage.getItem("token-fourFoodA");
  const [popUp, setPopUp] = useState(false)
  const [contador, setContador] = useState(1)
  const [produto, setProduto] = useState({})

  const { states, setters } = useContext(GlobalContext);
  const { detalhes } = states;
  const { carrinho } = states;
  const { setDetalhes } = setters;
  const { setCarrinho } = setters;

  const { id } = useParams();

  let navigate = useNavigate();
  const goCart = () => {
    // navigate(`/cart/${id}`);
  };

  useEffect(() => {
    mostrarDeatlhes();
  }, []);


  const incrementClick = () => {
    setContador(contador + 1);
  }

  const decrementClick = () => {
    if (contador <= 1) {
      setContador(contador)
    } else {
      setContador(contador - 1);
    }
  }

  const abrirPopPup = (detalhe) => {
    setProduto(detalhe)
    setPopUp(true)
  }

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

  const comprarProduto = (produto, contador) => {
    // const index = carrinho.findIndex((adicionarNoCarrinho) => {
    //   if (adicionarNoCarrinho.id === produto.id) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    //console.log(index);
    const quantidadeProduto = {
      ...produto,
      quantidade: contador,
    };

    let temNoCarrinho = false
    for (let item of carrinho) {
      if(item.id === quantidadeProduto.id) {
        temNoCarrinho = true
      } 
    }

    if(temNoCarrinho) {
      const updateCarrinho = carrinho.map((item) => {
        if(item.id === quantidadeProduto.id) {
          return {
            ...item,
            quantidade: quantidadeProduto.quantidade + item.quantidade
          }
        } else {
          return item
        }
      })
      setCarrinho(updateCarrinho);
    } else {
      const copyProdutos = [...carrinho, quantidadeProduto];
      setCarrinho(copyProdutos);
    }
    
      // const copyProdutos = carrinho.map((adicionarNoCarrinho) => {
      //   if (adicionarNoCarrinho.id === produto.id) {
      //     return {
      //       ...adicionarNoCarrinho,
      //       quantidade: adicionarNoCarrinho.quantidade + contador,
      //     };
      //   } else {
      //     return adicionarNoCarrinho;
      //   }
      // });
      // setCarrinho(copyProdutos);

    setContador(1)
    setPopUp(false)
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
          <button onClick={() => abrirPopPup(detalhe)}>comprar</button>
          {/* <button onClick={() => comprarProduto(detalhe)}>comprar</button> */}
        </Div>
    );
  });

  return (
    <ContainerRestaurant>
      <div>
        <Link to={`/cart/${id}`}>
          <button>carrinho</button>
        </Link>
      </div>
      <div>
        {ListDetalhes}
      </div>
      {popUp &&
      <PopPup>
        <div>
          <p>
            <button onClick={() => setPopUp(false)}>X</button>
          </p>
          <span>Selecione a quantidade desejada</span>
          <div className="contador">
            <button onClick={decrementClick} className={contador === 1 ? 'cinza' : ''}>-</button>
            <span>{contador}</span>
            <button onClick={incrementClick}>+</button>
          </div>
          <button className="add-carrinho" onClick={() => comprarProduto(produto, contador)}>Adicionar ao carrinho</button>
        </div>
      </PopPup>
      }
    </ContainerRestaurant>
  );
}

export default Restaurante;
