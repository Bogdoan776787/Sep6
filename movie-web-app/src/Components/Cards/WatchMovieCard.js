import {
  WatchMovieCardWrapper,
  ImageCard, CardInfo,
  MovieNameWrapper,
  CardMovieDate,
  MovieDescriptionText,
  WatchedIcon,
  CardMovieName,
  RatingWrapper,
  RatingNumber,
  RatingCircle,
  MovieHighlightWrapper,
  WatchedIconWrapper,
  ImageLink
} from "./WatchMovieCardStyle"
import { Link } from "react-router-dom";



const WatchMovieCard = (props) => {
  const link = "/" + props.type + "/" +  props.movieId
  const removeFromWatchList = async () =>
  {
    props.removeFromList(props.listId);
  }

  const navigateToDetails = () =>
  {

  }
  let date = props.movieReleaseData
  date = new Date(date)
  date = date.toDateString()
  return <WatchMovieCardWrapper onClick={()=>console.log()}>
    <ImageLink to={link}>
    <ImageCard src={props.moviePhoto_src} onClick={navigateToDetails} alt={props.movieName}></ImageCard>
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
    <WatchedIconWrapper>
    <WatchedIcon  onClick={removeFromWatchList}/>
    </WatchedIconWrapper>

  </WatchMovieCardWrapper>
};



export default WatchMovieCard;