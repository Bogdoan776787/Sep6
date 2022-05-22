import MotionHoc from "../MotionHoc";
import WatchMovieCard from "../../Components/Cards/WatchMovieCard";
import {WatchListBackground,WatchListHeaderText} from "./WatchListStyle"
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi"

const WatchListComponent = () => {
  const [movies,setMovies] = useState([])

  useEffect(() => {
    const getList = async () => {
        let response = await serverApi.getWatchList(localStorage.getItem("user"));;        
        setMovies(response);
    }
    getList();
}, []);
  return <WatchListBackground>
    <WatchListHeaderText variant="h3">My Watch List:</WatchListHeaderText>
    {
      movies.map((value,key)=>(
        <WatchMovieCard key={key}  {...value}/>
      ))
    }
  </WatchListBackground>;
};

const WatchList = MotionHoc(WatchListComponent);

export default WatchList;
