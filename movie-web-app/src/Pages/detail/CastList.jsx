import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

import Actor from "./Actor";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);
  console.log(props);
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast);
    };
    if (category != "actor") getCredits();
  }, [category, props.id]);
  return (
    <div className="casts">
      {casts.length > 0 && (
        <div className="casts-list">
          {casts.map((item, i) => (
            <div className="cast" key={i}>
              <div  className="casts__item">
                <Actor item={item} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CastList;
