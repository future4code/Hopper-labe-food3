import React, {useState, useEffect} from "react";
import Img from "../Pageloading/img/4FD.gif"
import styled from "styled-components";

const Imagem = styled.img`
height:100vh;

`


function Loading({children}){
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    },[])
    
        return  isLoading ? <Imagem src={Img} isLoading={isLoading}/> : <p>{children}</p>
    }

export default Loading



