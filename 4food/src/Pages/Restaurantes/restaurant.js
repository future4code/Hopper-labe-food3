import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
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
    const {id} = useParams();

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

    const ListDetalhes = detalhes.map((detalhe)=>{
        return <Div key={detalhe.id}>{detalhe.name}
        <Img src={detalhe.photoUrl}></Img>
        {detalhe.price}
        {detalhe.description}
        {detalhe.category}
        </Div>
    })

    return(
        <div>
         
         {ListDetalhes}
         
        </div>
    )
}

export default Restaurante