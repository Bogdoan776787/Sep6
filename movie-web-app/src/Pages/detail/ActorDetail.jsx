import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import styled from "styled-components";
const ActorDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getActorDetail = async () => {
      const result = await tmdbApi.person(id);
      setItem(result);
      
    };
    getActorDetail();
  });
  return (
    <>
      {item && (
        <>
          <Container>
            <Photo
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></Photo>
            <Info>
              <Name>Name: {item.name}</Name>
              <Birthday>Birthday: {item.birthday}</Birthday>
              <POB>Place of birth: {item.place_of_birth}</POB>
              <Popularity>Popularity: {item.popularity}</Popularity>
              <Biography>Biography: {item.biography}</Biography>
            </Info>
          </Container>
        </>
      )}
    </>
  );
};

export default ActorDetail;

export const Photo = styled.div`
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: $border-radius;

  width: 100%;
  height: 35rem;
  border-radius: 10%;
`;
export const Info = styled.div`
  position: relative;
  padding-top: 10px;
  font-size: 1rem;
  font-weight: 600;
`;
export const Name = styled.p`
  padding: 10px;
`;
export const Birthday = styled.p`
  padding: 10px;
`;
export const POB = styled.p`
  padding: 10px;
`;
export const Popularity = styled.div`
  padding: 10px;
`;
export const Biography = styled.div`
  padding: 10px;
  position: relative;
  width: 600px;
  height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  position: relative;
  top: 10px;
  padding: 5rem;
`;
