import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import Restaurante from "../Restaurantes/restaurant";




function Cart(){
    const navigate = useNavigate();
    const[cart, setCart] = useContext(GlobalContext)
    const {comprar} = cart;
    const {setComprar} = setCart;
    

 
return(
    <div>
        {comprar.map((produto)=>{
            return <Restaurante key={produto.id} produto={produto}/>
        })}
    <h2>carrinho</h2>
    <button onClick={() => navigate("/restaurantes/1")}>Continuar comprando</button>

    
    </div>
)
}

export default Cart