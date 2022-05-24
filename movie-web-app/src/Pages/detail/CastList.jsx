import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

import Actor from "./Actor";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <Actor item={item} />
        </div>
      ))}
    </div>
  );
};

export default CastList;
