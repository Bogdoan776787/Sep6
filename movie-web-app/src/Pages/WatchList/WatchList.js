import MotionHoc from "../MotionHoc";
import WatchMovieCard from "../../Components/Cards/WatchMovieCard";
import {WatchListBackground} from "./WatchListStyle"

const WatchListComponent = () => {
  return <WatchListBackground>
    <WatchMovieCard/>
  </WatchListBackground>;
};

const WatchList = MotionHoc(WatchListComponent);

export default WatchList;
