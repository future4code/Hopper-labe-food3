import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";

const Img = styled.img`
width:200px;
`


function Menu(){

    const token = localStorage.getItem("token-fourFoodA")
    const[restaurantes, setRestaurantes] = useState([])

    useEffect(()=>{
        mostrarMenus()

    },[])
    const mostrarMenus = ()=>{
        axios.get("https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants" , {headers:{auth:token,"Content-Type": "application/json"}})
        .then((response)=>{
            setRestaurantes(response.data.restaurants)
            console.log(response.data.restaurants)


        })
      
    }

    const listRestaurants = restaurantes.map((restaurante)=>{
        return <Link to = {`/restaurantes/${restaurante.id}`} key={restaurante.id}>{restaurante.name}
        <Img src={restaurante.logoUrl}></Img>
        {restaurante.address}
        {restaurante.category}
        {restaurante.deliveryTime}
        {restaurante.description}
        {restaurante.shipping}
        </Link>
    })


    return(
        <div>
         {listRestaurants}

        </div>
    )
}

export default Menu