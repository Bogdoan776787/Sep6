import MotionHoc from "../MotionHoc";
import FavoriteMovieCard from "../../Components/Cards/FavoriteMovieCard";
import { FavoriteBackground, FavoriteHeaderText, FavoriteCategory, FavoriteTextWrapper,Loading,NotFoundText } from "./FavoriteListStyle"
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi"


const FavoriteListComponent = () => {
  const [movies, setMovies] = useState([]);
  const [listType, setListType] = useState("movie")
  const [currentShows,setCurrentShows] = useState([])
  const [responseStatus,setResponseStatus] = useState(0)
  useEffect(() => {
    const getList = async () => {
      let response = await serverApi.getFavoriteShows(localStorage.getItem("user"));
      setResponseStatus(response.status)
      
      setMovies(response.data);
      setShows("movie",response.data)
    }
    getList();
  }, []);
  const removeDataFromList = async (FavoriteId) => {
    await serverApi.removeFromFavorite(FavoriteId)
    let newMovies = movies.filter(movie => movie.FavoriteId !== FavoriteId)
    
    setMovies(newMovies);
    setShows(listType,newMovies)
  }

  const setShows = (movieType,movies) =>{
    setListType(movieType)
    let shows = movies.filter(value=>value.type === movieType)
    setCurrentShows(shows)

  }
  return <FavoriteBackground>
    { (movies.length>0 || responseStatus === 200) &&
    <FavoriteTextWrapper>
      <FavoriteHeaderText variant="h3">My Favorite:</FavoriteHeaderText>
      <FavoriteCategory variant="h4" active={(listType==="movie").toString()} onClick={()=>setShows("movie",movies)} >Movies</FavoriteCategory>
      <FavoriteCategory variant="h4" active={(listType==="tv").toString()} onClick={()=>setShows("tv",movies)}>TV Shows</FavoriteCategory>
    </FavoriteTextWrapper>
    }
    {
      
      currentShows.map((value, key) => (
        <FavoriteMovieCard removeFromList={removeDataFromList} key={key}  {...value} />
      ))
    }
    {
      currentShows.length === 0 && responseStatus == 0 &&
      <Loading
      type="spinningBubbles"
      color="#803bec"
      height={300}
      width={300}
    />
    }
    {
      currentShows.length === 0 && responseStatus === 200 &&
      <NotFoundText variant = "h5">You haven't added any {listType === "movie"? "movies" : "TV shows"}  as favorites.</NotFoundText>
    }
  </FavoriteBackground>;
};

const Favorite = MotionHoc(FavoriteListComponent);

export default Favorite;
