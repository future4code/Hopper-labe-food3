import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { ProfileContainer } from "./styles";

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
      <header>
        <h1>Meu perfil</h1>
      </header>
      <section>
        <div>
          <h2>{perfil.name}</h2>
          <p>{perfil.email}</p>
          <p>{perfil.cpf}</p>
        </div>
        <div>
          <button onClick={() => {}}>Editar</button>
        </div>
      </section>
      <section>
        <div>
          <h2>Endereço cadastrado</h2>
          <p>{perfil.address}</p>
        </div>

        <div>
          <button>Editar</button>
        </div>
      </section>
      <section>
        <h2>Histórico de pedidos</h2>
        <p>{mostrarPedido(historicoPedidos[0])}</p>

        <p>{historicoPedidos ? "" : "Você não realizou nenhum pedido"}</p>
      </section>
      <Nav />
    </ProfileContainer>
  );
}

export default Profile;
