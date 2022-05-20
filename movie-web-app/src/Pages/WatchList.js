import MotionHoc from "./MotionHoc";
import WatchMovieCard from "../Components/Cards/WatchMovieCard";

const WatchListComponent = () => {
  return <div>
    <WatchMovieCard/>
  </div>;
};

const WatchList = MotionHoc(WatchListComponent);

export default WatchList;
