import React from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import ProductSection from "../components/ProductSection";

const MainWrapper = styled.div`
  font-family: "Arial, sans-serif";
`;

const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const NavBrand = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function HomePage() {
  return (
    <MainWrapper>
      <Navbar>
        <NavBrand href="#">Fashionista</NavBrand>
        <NavLinks>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Shop</NavLink>
          <NavLink href="#">Contact</NavLink>
        </NavLinks>
      </Navbar>

      <Banner />

      <ProductSection />
    </MainWrapper>
  );
}

export default HomePage;
