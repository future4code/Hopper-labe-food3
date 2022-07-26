import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Restaurante from "../Restaurantes/restaurant";



function Cart(){
    const navigate = useNavigate();
    const [states, setters] = useState([]);
    const {comprar} = states;
    const {setComprar} = setters;
    

 
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