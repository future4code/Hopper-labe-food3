import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";

const Img = styled.img`
width:250px;
`
const Div = styled.div`
display:flex;
flex-wrap:wrap;
flex-direction:column;
`


function Restaurante(){

    const token = localStorage.getItem("token-fourFoodA");
    const [detalhes, setDetalhes] = useState([]);
    const [comprar,setComprar] = useState([]);
    const {id} = useParams();

    let navigate = useNavigate();
    const goCart = () => {
        navigate("/cart");
      };
  

    useEffect(()=>{
        mostrarDeatlhes()

    },[])

    const mostrarDeatlhes = ()=>{
        axios.get(`https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants/${id}`, {headers:{auth:token,"Content-Type": "application/json"}})
        .then((response)=>{
            setDetalhes(response.data.restaurant.products)
            console.log(response.data.restaurant.products)
        })
    }

    const comprarProduto = (produto) =>{
        const index = comprar.findIndex((adicionarNoCarrinho)=>{
            if(adicionarNoCarrinho.id === produto.id){
                return true;
            }else{
                return false;
            }
        });

        if(index === -1){
            const quantidadeProduto = {
                ...produto,
                quantidade: 1
            };
            const copyProdutos = [...comprar,quantidadeProduto]
            setComprar(copyProdutos)
            
        }else{
            const copyProdutos = comprar.map((adicionarNoCarrinho)=>{
              if(adicionarNoCarrinho.id === produto.id){
                return {
                    ...adicionarNoCarrinho,
                    quantidade: adicionarNoCarrinho.quantidade + 1
                }
              }else{
                return adicionarNoCarrinho
              }
            })
            setComprar(copyProdutos)
        }
            
    };
    console.log(comprar)


    const ListDetalhes = detalhes.map((detalhe)=>{
        return <Div key={detalhe.id}>{detalhe.name}
        <Img src={detalhe.photoUrl}></Img>
        R${detalhe.price},00
        {detalhe.description}
        {detalhe.category}
        <button onClick={() => comprarProduto(detalhe)}>comprar</button>

        </Div>
    })

    return(
        <div>
        <div>
            <button onClick={goCart}>carrinho</button>
        </div>

         {ListDetalhes}
       
        
        

         
        </div>
    )
}

export default Restaurante