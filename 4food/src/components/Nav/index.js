import React from "react";
import { Container, ButtonNav } from "./styles";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { red } from "@mui/material/colors";

const Nav = () => {
  let navigate = useNavigate();

  return (
    <Container>
      <ButtonNav onClick={() => navigate("/menu")}>
        <HomeOutlinedIcon sx={{ color: red[500], fontSize: 30 }} />
      </ButtonNav>
      <ButtonNav onClick={() => navigate("/cart/1s")}>
        <ShoppingCartOutlinedIcon sx={{ color: red[500], fontSize: 30 }} />
      </ButtonNav>
      <ButtonNav onClick={() => navigate("/profile")}>
        <PersonOutlineOutlinedIcon sx={{ color: red[500], fontSize: 30 }} />
      </ButtonNav>
    </Container>
  );
};

export default Nav;
