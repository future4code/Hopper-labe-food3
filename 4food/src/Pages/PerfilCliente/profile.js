import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const token = localStorage.getItem("token-fourFoodA");
  const [perfil, setPerfil] = useState({});
  const [historicoPedidos, sethistoricoPedidos] = useState({});
  const [pedidoEmAndamento, setPedidoEmAndamento] = useState();

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
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/active-order",
        {
          headers: {
            "Content-Type": "application/json",
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        setPedidoEmAndamento(response.data.order);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/orders/history`,
        { headers: { auth: token, "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const verificarPedidoEmAndamento = () => {
    if (pedidoEmAndamento) {
      return (
        <div>
          <p>
            Um pedido de {pedidoEmAndamento.restaurantName} no valor de{" "}
            {pedidoEmAndamento.totalPrice} está a caminho
          </p>
          <p>
            Chega em{" "}
            {formatarData(
              pedidoEmAndamento.createdAt,
              pedidoEmAndamento.expiresAt
            )}{" "}
            minuto
          </p>
        </div>
      );
    }
  };

  const formatarData = (timePedido, timeEntrega) => {
    return (timeEntrega - timePedido) / 1000 / 60 / 60;
  };

  return (
    <div>
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
          <button
            onClick={() => {
              console.log();
            }}
          >
            Editar
          </button>
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
        {verificarPedidoEmAndamento()}
        <p>Você não realizou nenhum pedido</p>
      </section>
    </div>
  );
}

export default Profile;
