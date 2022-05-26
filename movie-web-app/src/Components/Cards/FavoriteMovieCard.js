import { Link } from "react-router-dom";
import {
    MovieCardWrapper,
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
  } from "./MovieCardStyle"

  
  
  
  const FavoriteMovieCard = (props) => {
    const movieLink = "/" + props.type + "/" +  props.movieId
    const removeFromFavoriteList = async () =>
    {
      props.removeFromList(props.FavoriteId);
    }
    let date = props.movieReleaseData
    date = new Date(date)
    date = date.toDateString()
    return <MovieCardWrapper>
      <ImageLink to={movieLink}>
      <ImageCard src={props.moviePhoto_src}></ImageCard>
      </ImageLink>
      <CardInfo>
        <MovieHighlightWrapper>
          <RatingWrapper >
            <RatingNumber>{props.movieRating * 10}</RatingNumber>
            <RatingCircle variant="determinate" value={props.movieRating * 10} />
          </RatingWrapper>
          <MovieNameWrapper>
            <Link to={movieLink}>
            <CardMovieName variant="h6" component="div">{props.movieName}</CardMovieName>
            </Link>
            <CardMovieDate variant="subtitle1" component="div">{date}</CardMovieDate>
          </MovieNameWrapper>
        </MovieHighlightWrapper>
        <Link to={movieLink}>
        <MovieDescriptionText> {props.movieDescription}</MovieDescriptionText>
        </Link>
      </CardInfo>
      <IconWrapper>
      <FavoriteRemoveIcon  onClick={removeFromFavoriteList}/>
      </IconWrapper>
  
    </MovieCardWrapper>
  };
  
  
  
  export default FavoriteMovieCard;