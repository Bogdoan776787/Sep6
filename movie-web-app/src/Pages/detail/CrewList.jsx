import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { SwiperSlide, Swiper } from "swiper/react";
const CrewList = (props) => {
  const { category } = useParams();
  const [crews, setCrews] = useState([]);
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCrews(res.crew.slice(0, 10));
    };
    if (category != "crew") getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {crews.length > 0 && (
        <Swiper grabCursor={true} spaceBetween={8} slidesPerView={"auto"}>
          {crews.map((item, i) => (
            <SwiperSlide>
              <div key={i} className="casts__item">
                <div
                  className="casts__item__img"
                  style={{
                    backgroundImage: `url(${apiConfig.w500Image(
                      item.profile_path
                    )})`,
                  }}
                ></div>
                <p className="casts__item__name">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CrewList;
