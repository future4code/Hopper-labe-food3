import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { ProfileContainer, PerfilHeader, Div, Informacao, Img, Section, Historico, Editor, Endereço, Endereço1 } from "./styles";
import Editar from "../img/edit.png"


function Profile() {
  const token = localStorage.getItem("token-fourFoodA");
  const [perfil, setPerfil] = useState({});
  const [historicoPedidos, sethistoricoPedidos] = useState({});

  useEffect(() => {
    mostrarPerfil();
  }, []);

  const mostrarPerfil = () => {
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/profile`,
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        setPerfil(response.data.user);
        // sethistoricoPedidos(response.data.orders.restaurantName);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/orders/history`,
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data.orders);
        sethistoricoPedidos(response.data.orders);
      })
      .catch((err) => console.log(err));
  };

  const mostrarPedido = (pedido) => {
    if (pedido) {
      return `Um pedido de ${pedido.restaurantName} está a caminho`;
    }
  };

  return (
    <ProfileContainer>
      <PerfilHeader>
        <h1>Meu perfil</h1>
      </PerfilHeader>
      <section>
        <Informacao>
          <Editor>{perfil.name} <Img src={Editar}/></Editor> 
          <p>{perfil.email}</p>
          <p>{perfil.cpf}</p>
          
        </Informacao>
        
        
       
      </section>
      <Section>
        <div>
          <Endereço>Endereço cadastrado <Img src={Editar}/></Endereço>
          <Endereço1>{perfil.address}</Endereço1>
          
        </div>

        
          
        
      </Section>
      <Historico >
        <h2>Histórico de pedidos</h2>
        <Div></Div>
        <p>{mostrarPedido(historicoPedidos[0])}</p>

        <p>{historicoPedidos ? "" : "Você não realizou nenhum pedido"}</p>
      </Historico>
      <Nav />
    </ProfileContainer>
  );
}

export default Profile;
