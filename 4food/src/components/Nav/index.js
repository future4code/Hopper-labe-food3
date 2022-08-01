import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { red } from "@mui/material/colors";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 8vh;
  .mobile {
    display: none;
  }
  .web {
    display: flex;
    p {
      color: white;
    }
  }
  /* box-shadow: 0px -2px 10px -4px rgba(0, 0, 0, 0.4); */
  @media (max-width: 800px) {
    .web {
      display: none;
    }
    .mobile {
      display: flex;
      width:100%;
      justify-content: space-around;
      background-color: #fff;
    }
      box-shadow: 0px -2px 10px -4px rgba(0, 0, 0, 0.4);
    }
`;

const ButtonNav = styled.button`
  width: 100%;
  background-color: transparent;
  width: 100px;
  border: 0;
  cursor: pointer;
  @media (max-width: 800px) {
    background-color: #fff;
  }
`;

const Nav = () => {
  let navigate = useNavigate();

  return (
    <Container>
      <div className="mobile">
        <ButtonNav onClick={() => navigate("/menu")}>
          <HomeOutlinedIcon sx={{ color: red[500], fontSize: 30 }} md={{ color: red[50], fontSize: 30 }} />
        </ButtonNav>
        <ButtonNav onClick={() => navigate("/cart/1s")}>
          <ShoppingCartOutlinedIcon sx={{ color: red[500], fontSize: 30 }} />
        </ButtonNav>
        <ButtonNav onClick={() => navigate("/profile")}>
          <PersonOutlineOutlinedIcon sx={{ color: red[500], fontSize: 30 }} />
        </ButtonNav>
      </div>
      <div className="web">
        <ButtonNav onClick={() => navigate("/menu")}>
          <HomeOutlinedIcon sx={{ color: red[50], fontSize: 30 }} md={{ color: red[50], fontSize: 30 }} />
          <p>Home</p>
        </ButtonNav>
        <ButtonNav onClick={() => navigate("/cart/1s")}>
          <ShoppingCartOutlinedIcon sx={{ color: red[50], fontSize: 30 }} />
          <p>Carrinho</p>
        </ButtonNav>
        <ButtonNav onClick={() => navigate("/profile")}>
          <PersonOutlineOutlinedIcon sx={{ color: red[50], fontSize: 30 }} />
          <p>Perfil</p>
        </ButtonNav>
      </div>
    </Container>
  );
};

export default Nav;
