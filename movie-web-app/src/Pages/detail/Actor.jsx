import React from "react";
import apiConfig from "../../api/apiConfig";
import { actor } from "../../api/tmdbApi";
import { Link } from "react-router-dom";
import NoProfilePicture from "././../../assets/no-profile-picture.jpg";
const Actor = (props) => {
  const item = props.item;
  const link = "/" + actor["actor"] + "/" + item.id;
  let img = null
  if(item.profile_path!=null)
    img = apiConfig.w500Image(item.profile_path);
  
  
  return (
    <Link to={link}>
      <div
        className="casts__item__img"
        style={{
          backgroundImage: `url(${img === null ? NoProfilePicture : img})`,
        }}
      ></div>
      <p className="casts__item__name">{item.name}</p>
    </Link>
  );
};

export default Actor;
