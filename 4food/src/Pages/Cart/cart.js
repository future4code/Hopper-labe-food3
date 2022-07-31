import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import GlobalContext from "../../global/GlobalContext";

const Img = styled.img`
  width: 6rem;
  height: 7rem;
  margin: 0 1rem 0 0;
  object-fit: contain;
  
`

const Rectangle = styled.div`
 
  width: 22.5rem;
  height: 4.75rem;
  margin: 0.063rem 0 1rem;
  padding: 1rem;
  background-color: #eee;
`
const Bar = styled.div`
 display:flex;
 justify-content:center;
  width: 22.5rem;
  height: 4rem;
  margin: 1rem 0 0.063rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
`
const ItemCard= styled.div`
  width: 20.5rem;
  height: 7rem;
  border-radius: 8px;
  border: solid 1px #b8b8b8;
`
const NomeItem = styled.span`
  width: 10.438rem;
  height: 1.125rem;
  margin: 1.125rem 1rem 0.5rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #e8222e;
`

const Quantidade = styled.div`
  width: 2.063rem;
  height: 2.063rem;
  margin: 0 0 0.688rem 18rem;
  padding: 0.438rem 0.75rem;
  border-radius: 8px;
  border: solid 1px #e8222e;
`

const Remover = styled.button`

  width: 5.625rem;
  height: 1.938rem;
  margin: 0.438rem 0 0 0.5rem;
  padding: 0.5rem 1.438rem 0.563rem 1.5rem;
  border-radius: 8px;
  border: solid 1px #e02020;

`

const Descricao = styled.span`
  width: 12.5rem;
  height: 1.875rem;
  margin: 0.5rem 8rem 0.25rem;
  font-family: Roboto;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.29px;
  color: #b8b8b8;
`

const Frete = styled.p`
  width: 6.5rem;
  height: 1.125rem;
  margin: 5rem 1rem 0.813rem 13rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: right;
  color: #000000;
`

const Pagamento = styled.div`
  width: 20.5rem;
  height: 1.125rem;
  margin: 9.2rem 1rem 0.5rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #000000;
`
const Divisao = styled.div`
width: 20.5rem;
  height: 0.063rem;
  margin: 0.5rem 1rem;
  border: solid 1px #000000;
`
const Confirmar = styled.button`
  width: 20.5rem;
  height: 2.625rem;
  padding: 0.75rem 1rem;
  border-radius: 2px;
  background-color: #e02020;
`
function Cart() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token-fourFoodA");
  
  const { states, setters } = useContext(GlobalContext);
  const { carrinho, perfil,frete } = states;
  const { setCarrinho, setPerfil,setFrete} = setters;
  const {pagamentos, setPagamentos} = useState()
  const [pedidoEmAndamento, setPedidoEmAndamento] = useState();
 
  const pagamento = ["Dinheiro", "Cartão de Crédito"]
  
 
   
  let preçoProdutos = 0;

  for(let item of carrinho){
    preçoProdutos += Number(item.price * item.quantidade)
  }

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
        console.log(response.data.user.address)
        setPerfil(response.data.user.address)
        setFrete(response.data.restaurant.shipping)
      })
      .catch((error) =>{
        console.log(error)
      })

      axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/active-order",
        {
          headers: {
            "Content-Type": "application/json",
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        setPedidoEmAndamento(response.data.order);
       
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const verificarPedidoEmAndamento = () => {
    if (pedidoEmAndamento) {
      return (
        <div>
          <p>
            Um pedido de {pedidoEmAndamento.restaurantName} no valor de R$ {" "},00
            {pedidoEmAndamento.totalPrice} está a caminho
          </p>
          <p>
            Chega em{" "}
            {formatarData(
              pedidoEmAndamento.createdAt,
              pedidoEmAndamento.expiresAt
            )}{" "}
            minuto
          </p>
        </div>
      );
    }
  };

  const formatarData = (timePedido, timeEntrega) => {
    return (timeEntrega - timePedido) / 1000 / 60 / 60;
  };


     
  const listarProdutos = carrinho.map((produto) => {
    if (produto.quantidade > 0) {
      return (
        <div>
        <div key={produto.id}>
          <div>
          <Img src={produto.photoUrl}></Img>
          <NomeItem>{produto.name}</NomeItem>
          <Descricao>{produto.description}</Descricao>
          <Quantidade>{produto.quantidade}</Quantidade>
          <Remover onClick={() => removerProduto(produto.id)}>Remover</Remover>
          </div>
          </div>
         
         <div>
          <p>SubTotal: R${produto.price * produto.quantidade}</p>
         </div>

        </div>
      );
    }
  });
 
  const metodoPagamento = (event) =>{
    setPagamentos(event.target.value)
  }
  
  return (
    <div>
      

    <Bar> Meu Carrinho</Bar>

      <Rectangle>

      <p>Endereço de Entrega: {perfil} </p>
      
    </Rectangle>

      <ItemCard>
      {listarProdutos}
      </ItemCard>

      <div>

      <Frete >Frete R$ {frete},00</Frete>

      {/* <h1>Total: R${preçoProdutos + frete},00 </h1> */}
      

      <Pagamento>Forma de pagamento</Pagamento>
      <Divisao></Divisao>
      </div>
    {pagamento.map(result => (
      <div key={result}> 
        <input type="radio" value={result} name="radiovalues" onChange={()=> metodoPagamento}/>
       
        <b>{result}</b>
      </div>
     
    ))}
      <button onClick={() => navigate("/restaurantes/1")}>Continuar comprando</button>
      <Confirmar onClick={() => confirmarPedido(pagamentos)}>Confirmar</Confirmar>

      

      {verificarPedidoEmAndamento}
    </div>


  );
}

export default Cart;
