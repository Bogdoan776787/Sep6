import MotionHoc from "../MotionHoc";
import WatchMovieCard from "../../Components/Cards/WatchMovieCard";
import { WatchListBackground, WatchListHeaderText, WatchListCategory, WatchListTextWrapper,Loading } from "./WatchListStyle"
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi"


const WatchListComponent = () => {
  const [movies, setMovies] = useState([]);
  const [listType, setListType] = useState("movie")
  const [currentShows,setCurrentShows] = useState([])
  console.log("load")
  useEffect(() => {
    const getList = async () => {
      let response = await serverApi.getWatchList(localStorage.getItem("user"));
      setMovies(response.data);
      setShows("movie",response.data)
      console.log("render")
    }
    getList();
  }, []);
  const removeDataFromList = async (listId) => {
    await serverApi.removeFromWatchList(listId)
    let newMovies = movies.filter(movie => movie.listId !== listId)
    setMovies(newMovies);
    setShows(listType,newMovies)
  }

  const setShows = (movieType,movies) =>{
    setListType(movieType)
    let shows = movies.filter(value=>value.type === movieType)
    setCurrentShows(shows)

  }
  return <WatchListBackground>
    { movies.length>0 &&
    <WatchListTextWrapper>
      <WatchListHeaderText variant="h3">My Watch List:</WatchListHeaderText>
      <WatchListCategory variant="h4" active={(listType==="movie").toString()} onClick={()=>setShows("movie",movies)} >Movies</WatchListCategory>
      <WatchListCategory variant="h4" active={(listType==="tv").toString()} onClick={()=>setShows("tv",movies)}>TV Shows</WatchListCategory>
    </WatchListTextWrapper>
    }
    {
      
      currentShows.map((value, key) => (
        <WatchMovieCard removeFromList={removeDataFromList} key={key}  {...value} />
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
  </WatchListBackground>;
};

const WatchList = MotionHoc(WatchListComponent);

export default WatchList;
