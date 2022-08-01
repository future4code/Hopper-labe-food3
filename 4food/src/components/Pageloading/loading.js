import React, {useState, useEffect} from "react";
import Img from "../Pageloading/img/4FD.gif"
import styled from "styled-components";

const ContainerLoading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF1616;
`
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
    
        return  isLoading ? 
            <ContainerLoading>
                <Imagem src={Img} isLoading={isLoading}/>
            </ContainerLoading> : 
            <p>{children}</p>
        //<Imagem src={Img} isLoading={isLoading}/> : <p>{children}</p>
    }

export default Loading



