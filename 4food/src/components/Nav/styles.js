import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 8vh;
  /* box-shadow: 0px -2px 10px -4px rgba(0, 0, 0, 0.4); */
  @media (max-width: 600px) {
      box-shadow: 0px -2px 10px -4px rgba(0, 0, 0, 0.4);
    }
`;

export const ButtonNav = styled.button`
  width: 100%;
  /* background-color: #fff; */
  background-color: transparent;
  width: 100px;
  border: 0;
  cursor: pointer;
  @media (max-width: 600px) {
    background-color: #fff;
  }
`;
