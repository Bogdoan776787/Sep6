import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import ButtonFavorite from "../../assets/favorite-button-svgrepo-com.svg";
import addTWL from "../../assets/add1.svg";
import MovieList from "../../Components/movie-list/MovieList";
import { TextField, Typography, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import CrewList from "./CrewList";
import Comment from "../../Components/Comment/Comment";
import Raiting from "../../Components/Raiting/Raiting";
import Review from "../../Components/Review/Review";
const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  console.log(item);
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };

    if (category != "actor") getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <Action>
                <RatingWrapper>
                  <RatingNumber>{item.vote_average * 1}</RatingNumber>
                  <RatingCircle
                    variant="determinate"
                    value={item.vote_average * 10}
                  />
                </RatingWrapper>
                <Vote>{item.vote_count}</Vote>
                <ButtonFavorit>
                  <img src={ButtonFavorite} alt="" />
                </ButtonFavorit>
                <ButtonAdd>
                  <img src={addTWL} alt="" />
                </ButtonAdd>
                <RaitingPosition>
                  <Raiting />
                </RaitingPosition>
              </Action>

              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>

                <CastList id={item.id} />
              </div>
              <div className="crew">
                <div className="section__header">
                  <h2>Crew</h2>
                </div>

                <CrewList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <Comment />
              <Review />
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

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
export const Action = styled.div`
  position: relative;
  bottom: 55px;
  right: 240px;
  display: flex;
  display: grid;
  row-gap: 2px;
  grid-template-columns: auto auto auto auto auto;
  align-items: center;
  justify-content: center;
  @media screen {
    min-width: 1000px;
    position: relative;
    bottom: 55px;
    right: 290px;
  }
`;

export const Vote = styled.div`
  position: relative;
  top: 60px;
  left: 15px;
  border: 4px solid rgb(103, 13, 163);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  background-color: black;
  font-weight: 900;
  font-size: 13px;
  height: 50px;
  width: 50px;
`;
export const ButtonFavorit = styled.button`
  position: relative;
  top: 60px;
  left: 25px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  background-color: white;

  height: 50px;
  width: 50px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ButtonAdd = styled.button`
  position: relative;
  top: 60px;
  left: 36px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  background-color: white;

  height: 50px;
  width: 50px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
export const RaitingPosition = styled.div`
  position: relative;
  left: 50px;
  top: 50px;
`;
