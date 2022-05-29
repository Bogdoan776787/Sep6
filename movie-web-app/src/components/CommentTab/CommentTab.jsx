import React, { useState,useEffect } from "react";
import Comment from "../Comment/Comment";
import CommentsList from "../CommentsList/CommentsList";
import { useSelector } from 'react-redux'
import serverApi from "../../api/serverApi";
import { useParams } from "react-router";

const CommentTab = () => {
    const { category, id } = useParams();
    const [comments,setComments] = useState([]);
    let user = useSelector(state => state.user)
    const addComment = async (comment) => {
        await(serverApi.putCommentForMovie(id,user.data,category,comment))
        setComments([...comments,{UserId:user.data,CommentText:comment}])
    }
  useEffect( () => {
    const getCommentsForMovie = async () => {
      let response = await(serverApi.getCommentsForMovie(id,category))
      setComments(response.data)
    }
    getCommentsForMovie();

  }, [category,id])

  return (
    <div>
      {user.data &&<Comment addNewComment={addComment}/>}
      <CommentsList list = {comments}/>
    </div>
  );
};


export default CommentTab;

