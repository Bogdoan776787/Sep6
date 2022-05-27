import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import NoProfilePicture from "././../../assets/no-profile-picture.jpg";

const CrewList = (props) => {
  const { category } = useParams();
  const [crews, setCrews] = useState([]);
  const [index,setIndex] = useState(12);
  const [showCrew,setShowCrew] = useState([]);
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      console.log(res.crew)
      let crew = res.crew.filter((item,index) => index!==0 && item.id!==res.crew[index-1].id);
      setCrews(crew);

      console.log(res.crew)
    };
    if (category != "crew") getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {crews.length > 0 && (
        <div className="casts-list">
          {crews.map((item, i) => (
            <div className="cast" key={i}>
              <div  className="casts__item">
                <div
                  className="casts__item__img"
                  style={{
                    backgroundImage: `url(${item.profile_path === null? NoProfilePicture : apiConfig.w500Image(item.profile_path)})`,
                  }}
                ></div>
                <p className="casts__item__name">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        
      )}
    </div>
  );
};

export default CrewList;
