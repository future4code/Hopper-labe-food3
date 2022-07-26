import axios from "axios";
import React, { useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../global/GlobalContext";

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

    const {states, setters} = useContext(GlobalContext);
    const {detalhes} = states;
    const {comprar} = states;
    const {setDetalhes} = setters;
    const {setComprar} = setters;

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

    const comprarProduto = (detalhe) =>{
        const copyProdutos = [...comprar,detalhe]
        setComprar(copyProdutos)
       console.log(detalhe) 
    }
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