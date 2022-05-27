import {
  IconWrapper,
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
  MovieCardWrapper,
  ImageLink
} from "./MovieCardStyle"
import { Link } from "react-router-dom";



const WatchMovieCard = (props) => {
  const link = "/" + props.type + "/" +  props.movieId
  const removeFromWatchList = async () =>
  {
    props.removeFromList(props.listId);
  }

  const round = (num) => {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }
  let date = props.movieReleaseData
  date = new Date(date)
  date = date.toDateString()
  return <MovieCardWrapper>
    <ImageLink to={link}>
    <ImageCard src={props.moviePhoto_src} alt={props.movieName}></ImageCard>
    </ImageLink>
    <CardInfo>
      <MovieHighlightWrapper>
        <RatingWrapper >
          <RatingNumber>{round(props.movieRating) }</RatingNumber>
          <RatingCircle variant="determinate" value={round(props.movieRating) * 10} />
        </RatingWrapper>
        <MovieNameWrapper>
          <Link to={link}>
          <CardMovieName variant="h6" component="div">{props.movieName}</CardMovieName>
          </Link>
          <CardMovieDate variant="subtitle1" component="div">{date}</CardMovieDate>
        </MovieNameWrapper>
      </MovieHighlightWrapper>
      <Link to={link}>
      <MovieDescriptionText> {props.movieDescription}</MovieDescriptionText>
      </Link>
    </CardInfo>
    <IconWrapper>
    <WatchedIcon  onClick={removeFromWatchList}/>
    </IconWrapper>

  </MovieCardWrapper>
};



export default WatchMovieCard;