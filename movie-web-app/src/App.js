import { Route, Routes } from "react-router";
import Navbar from "./Navigation/Navbar";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList/WatchList";
import Login from "./Pages/Authenthicate/Login"
import Register from "./Pages/Authenthicate/Register"

import Catalog from "./Pages/Catalog";
import Detail from "./Pages/detail/Detail";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";



import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./userAccount";
import ActorDetail from "./Pages/detail/ActorDetail";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setUser(localStorage.getItem("user")))
  })


  return (
    <>
      <Navbar />
      <Pages>
        <AnimatePresence exitBeforeEnter>
          <Routes>



            <Route path="/" element={<Home />} />
            <Route path="/:category/search/:keyword" element={<Catalog />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/:category" element={<Catalog />} />
            <Route path="/:actor/:id" element={<ActorDetail />} />
            <Route path="/watch-list" element={<PrivateRoute><WatchList/></PrivateRoute>} />

             <Route path="/login" element={
              <PublicRoute><Login/></PublicRoute>
            } />
            <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
          </Routes>
        </AnimatePresence>
      </Pages>
    </>
  );
}

export default App;