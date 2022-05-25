import { Link } from "react-router-dom";
import {
    FavoriteMovieCardWrapper,
    ImageCard, CardInfo,
    MovieNameWrapper,
    CardMovieDate,
    MovieDescriptionText,
    FavoriteRemoveIcon,
    CardMovieName,
    RatingWrapper,
    RatingNumber,
    RatingCircle,
    MovieHighlightWrapper,
    IconWrapper,
    ImageLink
  } from "./FavoriteMovieCardStyle"

  
  
  
  const FavoriteMovieCard = (props) => {
    const link = "/" + props.type + "/" +  props.movieId
    const removeFromFavoriteList = async () =>
    {
      props.removeFromList(props.FavoriteId);
    }
    let date = props.movieReleaseData
    date = new Date(date)
    date = date.toDateString()
    return <FavoriteMovieCardWrapper>
      <ImageLink to={link}>
      <ImageCard src={props.moviePhoto_src}></ImageCard>
      </ImageLink>
      <CardInfo>
        <MovieHighlightWrapper>
          <RatingWrapper >
            <RatingNumber>{props.movieRating * 10}</RatingNumber>
            <RatingCircle variant="determinate" value={props.movieRating * 10} />
          </RatingWrapper>
          <MovieNameWrapper>
            <Link to={link}>
            <CardMovieName variant="h6" component="div">{props.movieName}</CardMovieName>
            </Link>
            <CardMovieDate variant="subtitle1" component="div">{date}</CardMovieDate>
          </MovieNameWrapper>
        </MovieHighlightWrapper>
        <MovieDescriptionText> {props.movieDescription}</MovieDescriptionText>
      </CardInfo>
      <IconWrapper>
      <FavoriteRemoveIcon  onClick={removeFromFavoriteList}/>
      </IconWrapper>
  
    </FavoriteMovieCardWrapper>
  };
  
  
  
  export default FavoriteMovieCard;