import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import serverApi from "./../../api/serverApi";


import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import { ReactComponent as WatchListAdd } from "../../assets/eyeAdd.svg";
import { ReactComponent as WatchListRemove } from "../../assets/eye-minus.svg"
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import MovieList from "../../Components/movie-list/MovieList";
import { ReactComponent as FavoriteAdd } from "../../assets/heart-add.svg"
import { ReactComponent as FavoriteRemove } from "../../assets/heart-remove.svg"

import { CircularProgress, Typography } from "@material-ui/core";
import styled from "styled-components";
import CrewList from "./CrewList";
import ScrollableTabsButtonAuto from "../../Components/SrollableTabs/ScrollableTabsButton";
import CommentTab from "./../../Components/CommentTab/CommentTab";

import { useSelector } from 'react-redux'

const Detail = () => {
  const { category, id } = useParams();
  const [rating, setRating] = useState(0);
  const [movieRating, setMovieRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [favoriteData, setFavoriteData] = useState({});

  const [watched, setWatched] = useState(false);
  const [watchData, setWatchData] = useState({});

  let user = useSelector(state => state.user)
  const [userReviewMovie, setUserReviewMovie] = useState({});
  const [item, setItem] = useState(null);

  const round = (num) => {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }


  useEffect(() => {
    const getDetail = async () => {

      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      setMovieRating(response.vote_average)
      getRating(response)

      window.scrollTo(0, 0);
    };
    const getFavorite = async () => {

      let res = await serverApi.getOneShowFromFavorite(localStorage.getItem("user"), id, category)


      if (res.data[0] !== undefined) {
        setFavoriteData(res.data[0])
        setFavorite(true)
      }
    }

    const getWatchMovie = async () => {

      let res = await serverApi.getOneFromWatchList(localStorage.getItem("user"), id, category)
      if (res.data[0] !== undefined) {
        setWatchData(res.data[0])
        setWatched(true)
      }
    }

    const getRating = async (data) => {
      let res = await serverApi.getReviewForMovieByUser(localStorage.getItem("user"), id, category)
      if (res.data.userReview.length > 0) {
        setUserReviewMovie(res.data.userReview[0])
        setRating(parseInt(res.data.userReview[0].MovieRating))
        let reviews = res.data.Reviews;
        let sum = 0;
        reviews.forEach(review => {
          sum += parseInt(review.MovieRating)
        })
        setMovieRating(round((data.vote_average * data.vote_count + sum) / (data.vote_count + reviews.length)))
        data.vote_count += reviews.length;
      }
    }

    if (category !== "actor") {
      getFavorite();
      getDetail();
      getWatchMovie();
    }
  }, [category, id, favorite.length]);

  const sendRating = async (value) => {
    let newValue = item.vote_average

    if (value === null) {

      await (serverApi.deleteReview(userReviewMovie.ReviewId))
      setRating(0);
      setUserReviewMovie({})
    }
    else {
      if (userReviewMovie.ReviewId !== undefined)
        await (serverApi.deleteReview(userReviewMovie.ReviewId))
      setRating(value)
      let res = await (serverApi.putReviewForMovie(localStorage.getItem("user"), id, category, value))
      setUserReviewMovie(res.data);
    }
    item.vote_count = value === null ? item.vote_count - 1 : (rating === 0 ? item.vote_count + 1 : item.vote_count);
    setMovieRating(round(newValue));
  }

  const sendWatchList = async (value) => {

    if (value === true) {
      setWatched(true)
      let resp = await serverApi.addToWatchList(user.data, id, category);

      setWatchData(resp.data)

    }
    else {
      setWatched(false)
      await serverApi.removeFromWatchList(watchData.listId)
    }
  }

  const sendFavorite = async (value) => {

    if (value === true) {
      setFavorite(true)
      let resp = await serverApi.addShowToFavorite(user.data, id, category);

      setFavoriteData(resp.data)
    }
    else {
      setFavorite(false)
      await serverApi.removeFromFavorite(favoriteData.FavoriteId)
    }

  }

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
              <Action logged = {(user.data === null).toString()}>
                <RatingWrapper>
                  <RatingNumber>{movieRating * 1}</RatingNumber>
                  <RatingCircle
                    variant="determinate"
                    value={movieRating * 10}
                  />
                </RatingWrapper>
                <Vote>{item.vote_count}</Vote>
                {user.data && (
                  <ButtonAdd onClick={() => sendWatchList(!watched)}>
                    {!watched && <WatchListAddIcon />}
                    {watched && <WatchListRemoveIcon />}
                  </ButtonAdd>)}
                {user.data && (
                  <ButtonAdd onClick={() => sendFavorite(!favorite)}>
                    {!favorite && <FavoriteAddIcon />}
                    {favorite && <FavoriteRemoveIcon />}
                  </ButtonAdd>)}
              </Action>
              {user.data && (
                <RaitingPosition>
                  <Typography variant="h6">Rate:</Typography>
                  <RatingBox
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <StyledRating name="customized-color"
                      value={rating}
                      onChange={(event, newValue) => {

                        sendRating(newValue)
                      }}
                      max={10} size="large" />
                  </RatingBox>
                </RaitingPosition>
              )}
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <ScrollableTabsButtonAuto 
              Trailer={<VideoList id={item.id} />} 
              Casts={<CastList id={item.id} />} 
              Crew={<CrewList id={item.id} />} 
              Comments={<CommentTab/>} />
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
  width: 70px !important;
  height: 70px !important;
`;

export const RatingWrapper = styled.div`
  position: relative;
  display: flex;
  width: 70px;
  height: 70px;
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
  width:${(props) => (props.logged==="false" ? '400px' : '200px')};
  justify-content: space-around;
  display: flex;
  flex-direction:row;
  align-items: center;
  @media screen {

  }
`;

export const Vote = styled.div`
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
  height: 70px;
  width: 70px;
`;
export const ButtonRating = styled.button`
  position:relative;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  background-color: white;

  height: 70px;
  width: 70px;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

export const ButtonAdd = styled.button`
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  background-color: white;

  height: 70px;
  width: 70px;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;
export const RaitingPosition = styled.div`
width:fit-content;
margin-left:20px;
`;


export const FavoriteAddIcon = styled(FavoriteAdd)
  `
fill: black;
width: 50px;
height: 50px;
`

export const FavoriteRemoveIcon = styled(FavoriteRemove)
  `
fill: #803bec;
width: 50px;
height: 50px;
`

export const WatchListAddIcon = styled(WatchListAdd)
  `
fill:  black;
width:50px;
height:50px;
`

export const WatchListRemoveIcon = styled(WatchListRemove)
  `
fill: #803bec;
width:50px;
height:50px;
`


const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f1ad00"
  },
  "& .MuiRating-iconHover": {
    color: "#f1ad00"
  },
  "& .MuiRating-iconEmpty": {
    color: "white"
  }
});

const RatingBox = styled(Box)
  `
margin-top:3px;
`