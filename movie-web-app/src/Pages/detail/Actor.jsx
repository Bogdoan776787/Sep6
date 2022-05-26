import React from "react";
import apiConfig from "../../api/apiConfig";
import { actor } from "../../api/tmdbApi";
import { Link } from "react-router-dom";
const Actor = (props) => {
  const item = props.item;
  const link = "/" + actor["actor"] + "/" + item.id;
  console.log(item);
  return (
    <Link to={link}>
      <div
        className="casts__item__img"
        style={{
          backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
        }}
      ></div>
      <p className="casts__item__name">{item.name}</p>
    </Link>
  );
};

export default Actor;
