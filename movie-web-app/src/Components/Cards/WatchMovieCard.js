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
  WatchedIconWrapper
} from "./WatchMovieCardStyle"



const WatchMovieCard = (props) => {
  const removeFromWatchList = async () =>
  {
    props.removeFromList(props.listId);
  }
  let date = props.movieReleaseData
  date = new Date(date)
  date = date.toDateString()
  return <WatchMovieCardWrapper>
    <ImageCard src={props.moviePhoto_src}></ImageCard>
    <CardInfo>
      <MovieHighlightWrapper>
        <RatingWrapper >
          <RatingNumber>{props.movieRating * 10}</RatingNumber>
          <RatingCircle variant="determinate" value={props.movieRating * 10} />
        </RatingWrapper>
        <MovieNameWrapper>
          <CardMovieName variant="h6" component="div">{props.movieName}</CardMovieName>
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