import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";
import { useContext } from "react";
import Nav from "../../components/Nav";


const ContainerRestaurant = styled.div`
  /* width: 22.5rem; */
  /* height: 12.25rem; */
  margin: 3.125rem 0 0;
  padding: 0.5rem 1rem 0;

  p{
    margin-top:10px;
  }
  h3{
    margin-top:10px;
    margin-left:10px;
  }
`;
const Img = styled.img`
  width: 21.5rem;
  height: 7.5rem;
  margin: 1rem 0.75rem;
  object-fit: contain;

`;
const ProdutoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 8px;
  border: solid 1px #b8b8b8;
  margin-bottom: 10px;
    
`;
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
      width: 11.438rem;
      background-color:#e8222e;
      border-radius:5px;
      
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
  `;
  const Button = styled.button`
  background-color:#e8222e;
  width: 21.4rem;
  height: 2.625rem;
  padding: 0.75rem 1rem;
  border-radius: 2px;
  `
const Restaurantes = styled.header`

  width: 23.5rem;
  height: 4rem;
  margin: 0 0 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #e8222e;
  text-align: center;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.25);
`;

const Adress = styled.div`
  color: #b8b8b8;
  margin-bottom:10px;
`;

const ContainerProdutos = styled.div`
  padding-bottom: 8vh;
`;

function Menu() {
  const token = localStorage.getItem("token-fourFoodA");
  const [popUp, setPopUp] = useState(false);
  const [contador, setContador] = useState(1);
  const [produto, setProduto] = useState({});

  const { states, setters } = useContext(GlobalContext);
  const { restaurantes, detalhes, carrinho, frete } = states;
  const { setRestaurantes, setDetalhes, setCarrinho, setFrete } = setters;

  const { id } = useParams();

  let navigate = useNavigate();
  const goCart = () => {
    // navigate(`/cart/${id}`);
  };

  useEffect(() => {
    mostrarDetalhes();
  }, []);

  const incrementClick = () => {
    setContador(contador + 1);
  };
  const decrementClick = () => {
    if (contador <= 1) {
      setContador(contador);
    } else {
      setContador(contador - 1);
    }
  };
  const abrirPopPup = (detalhe) => {
    setProduto(detalhe);
    setPopUp(true);
  };

  const mostrarDetalhes = () => {
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants/${id}`,
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        setDetalhes(response.data.restaurant.products);
        // setRestaurantes(response.data.restaurant.address);
        setFrete(response.data.restaurant.shipping);
        setRestaurantes(response.data.restaurant.name);
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

    const quantidadeProduto = {
      ...produto,
      quantidade: contador,
    };

    let temNoCarrinho = false;
    for (let item of carrinho) {
      if (item.id === quantidadeProduto.id) {
        temNoCarrinho = true;
      }
    }

    if (temNoCarrinho) {
      const updateCarrinho = carrinho.map((item) => {
        if (item.id === quantidadeProduto.id) {
          return {
            ...item,
            quantidade: quantidadeProduto.quantidade + item.quantidade,
          };
        } else {
          return item;
        }
      });
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

    setContador(1);
    setPopUp(false);
  };

  const ListDetalhes = detalhes.map((detalhe, restaurant) => {
    return (
      <ProdutoContainer key={detalhe.id}>
        <h3>{detalhe.name}</h3>
        {restaurant.address}
        <Img src={detalhe.photoUrl}></Img>
        
        {detalhe.description}
        <p><b>R${detalhe.price},00</b></p>
        
        <Button onClick={() => abrirPopPup(detalhe)}>comprar</Button>
        {/* <button onClick={() => comprarProduto(detalhe)}>comprar</button> */}
      </ProdutoContainer>
    );
  });

  // const filtrar = restaurantes.map((filtro)=>{
  //   return(
  //     <div>
  //        {filtro.address}
  //     </div>
  //   )
  //  })

  // const restaurantesFiltrados = detalhes.filter((filtro)=>{
  //   filtro.startsWith(buscar)
  // })

  return (
    <ContainerRestaurant>
      <Link to={`/cart/${id}`}>
        
      </Link>
      <Restaurantes>{restaurantes}</Restaurantes>
      <Adress>
        
        <p>Frete R$ {frete},00</p>
      </Adress>
      <ContainerProdutos>{ListDetalhes}</ContainerProdutos>

      {popUp && (
        <PopPup>
          <div>
            <p>
              <button onClick={() => setPopUp(false)}>X</button>
            </p>
            <span>Selecione a quantidade desejada</span>
            <div className="contador">
              <button
                onClick={decrementClick}
                className={contador === 1 ? "cinza" : ""}
              >
                -
              </button>
              <span>{contador}</span>
              <button onClick={incrementClick}>+</button>
            </div>
            <button
              className="add-carrinho"
              onClick={() => comprarProduto(produto, contador)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </PopPup>
      )}

      <Nav />
    </ContainerRestaurant>
  );
}

export default Menu;
