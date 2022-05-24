import { Route, Routes } from "react-router";
import Navbar from "./Navigation/Navbar";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import Calender from "./Pages/Calender";
import Documents from "./Pages/Documents";
import Projects from "./Pages/Projects";

import Catalog from "./Pages/Catalog";
import Detail from "./Pages/detail/Detail";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "./App.scss";
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
            <Route path="/calender" element={<Calender />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
      </Pages>
    </>
  );
}

export default App;
