import React from "react";

import "./movie-card.scss";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const round = (num) => {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }
  return (
    <Link to={link}>
      <RatingWrapper>
        <RatingNumber>{round(item.vote_average)}</RatingNumber>
        <RatingCircle variant="determinate" value={item.vote_average * 10} />
      </RatingWrapper>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;

export const RatingCircle = styled(CircularProgress)`
  color: green !important;
  background-color: black;
  border-radius: 50%;
  width: 50px !important;
  height: 50px !important;
`;

export const RatingWrapper = styled.div`
  position: relative;
  top: 60px;
  left: 5px;
  display: flex;
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const RatingNumber = styled.span`
  position: absolute;
  font-size: 14px;
  font-weight: 900;
  color: white;

  z-index: 2;
`;
