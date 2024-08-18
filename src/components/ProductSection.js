import React from "react";
import styled from "styled-components";

const SectionWrapper = styled.section`
  padding: 2rem;
  background-color: #f7f7f7;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #888;
`;

const ProductButton = styled.button`
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const products = [
  { name: "Stylish Shirt", price: "$30", img: "/images/shirt.jpg" },
  { name: "Elegant Dress", price: "$50", img: "/images/dress.jpg" },
  { name: "Casual Shoes", price: "$40", img: "/images/shoes.jpg" },
  // Add more products here
];

function ProductSection() {
  return (
    <SectionWrapper>
      <SectionTitle>Shop the Latest Fashion</SectionTitle>
      <ProductGrid>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <ProductImage src={product.img} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            <ProductButton>Add to Cart</ProductButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </SectionWrapper>
  );
}

export default ProductSection;
