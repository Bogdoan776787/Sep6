import React from "react";
import styled from "styled-components";
const Review = () => {
  return (
    <>
      <Title>Review</Title>
      <ReviewBox></ReviewBox>
    </>
  );
};

export default Review;

export const ReviewBox = styled.div`
  background-color: #222222;
  color: #f1eeee;
  padding: 1em;
  border-radius: 10px;
  border: 2px solid transparent;
  outline: none;
  font-family: "Heebo", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  width: 100%;
  height: 100px;
  transition: all 0.2s;
  overflow-y: hidden;
`;

export const Title = styled.h2`
  padding-bottom: 10px;
`;
