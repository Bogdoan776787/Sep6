import MotionHoc from "../MotionHoc";
import WatchMovieCard from "../../Components/Cards/WatchMovieCard";
import {WatchListBackground,WatchListHeaderText} from "./WatchListStyle"
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi"

const WatchListComponent = () => {
  const [movies,setMovies] = useState([])

  useEffect(() => {
    const getList = async () => {
        let response = await serverApi.getWatchList(localStorage.getItem("user"));
        console.log(response)     
        setMovies(response.data);
    }
    getList();
}, []);
  const removeDataFromList = async (listId) =>
  {
    let response = await serverApi.removeFromWatchList(listId).then(data=>
      {
        console.log(data)
      }).catch(error=>
        {
          console.log(error)
        })
    console.log(response)
    let newMovies = movies.filter(movie=>movie.listId!=listId)
    setMovies(newMovies);
    console.log(response)
  }
  return <WatchListBackground>
    <WatchListHeaderText variant="h3">My Watch List:</WatchListHeaderText>
    {
      movies.map((value,key)=>(
        <WatchMovieCard removeFromList = {removeDataFromList} key={key}  {...value}/>
      ))
    }
  </WatchListBackground>;
};

const WatchList = MotionHoc(WatchListComponent);

export default WatchList;
