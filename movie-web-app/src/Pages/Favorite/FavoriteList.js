import MotionHoc from "../MotionHoc";
import FavoriteMovieCard from "../../Components/Cards/FavoriteMovieCard";
import { FavoriteBackground, FavoriteHeaderText, FavoriteCategory, FavoriteTextWrapper,Loading } from "./FavoriteListStyle"
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi"


const FavoriteListComponent = () => {
  const [movies, setMovies] = useState([]);
  const [listType, setListType] = useState("movie")
  const [currentShows,setCurrentShows] = useState([])
  useEffect(() => {
    const getList = async () => {
      let response = await serverApi.getFavoriteShows(localStorage.getItem("user"));
      setMovies(response.data);
      setShows("movie",response.data)
    }
    getList();
  }, []);
  const removeDataFromList = async (FavoriteId) => {
    await serverApi.removeFromFavorite(FavoriteId)
    let newMovies = movies.filter(movie => movie.FavoriteId !== FavoriteId)
    console.log(newMovies)
    setMovies(newMovies);
    setShows(listType,newMovies)
  }

  const setShows = (movieType,movies) =>{
    setListType(movieType)
    let shows = movies.filter(value=>value.type === movieType)
    setCurrentShows(shows)

  }
  return <FavoriteBackground>
    { movies.length>0 &&
    <FavoriteTextWrapper>
      <FavoriteHeaderText variant="h3">My Watch List:</FavoriteHeaderText>
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
      movies.length === 0 && 
      <Loading
      type="spinningBubbles"
      color="#803bec"
      height={300}
      width={300}
    />
    }
  </FavoriteBackground>;
};

const Favorite = MotionHoc(FavoriteListComponent);

export default Favorite;
