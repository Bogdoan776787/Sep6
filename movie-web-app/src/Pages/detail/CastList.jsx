import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

import Actor from "./Actor";
import { SwiperSlide, Swiper } from "swiper/react";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast.slice(0, 20));
    };
    if (category != "actor") getCredits();
  }, [category, props.id]);
  return (
    <div className="casts">
      {casts.length > 0 && (
        <Swiper grabCursor={true} spaceBetween={8} slidesPerView={"auto"}>
          {casts.map((item, i) => (
            <SwiperSlide>
              <div key={i} className="casts__item">
                <Actor item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CastList;
