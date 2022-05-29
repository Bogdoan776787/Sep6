import { Typography } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { OutlineButton } from "./../button/Button";
import { useParams } from "react-router";


const Comment = (props) => {
    const { category,id } = useParams();

    const [index,setIndex] = useState(5);
    const [comments,setComments] = useState([]);
    let list = props.list;

    useEffect(()=>
    {   
        
        
        if(index >list.length && list.length>5)
            setIndex(list.length)
        else if(list.length>0 && 5<list.length)
            setIndex(5)
        let comments = list.slice(0,index)
        setComments(comments)
    },[props.list,index,list])
    const handleClick = (value) =>
    {
        
        if(value >list.length)
            setIndex(list.length - 1)
        let comments = list.slice(0,value-1)
        setIndex(value)
        setComments(comments)
    }
  return (
    <Wrapper>
      {comments.map((item,key)=>
        {
            return (
                <CommentWrapper key = {key}>
                <CommentHeader variant = "h5">{item.UserId}</CommentHeader>
                <Typography variant = "body1" element = "p">{item.CommentText}</Typography>
                </CommentWrapper>
            )
        })}
        {
            list.length === 0 &&
            <Typography variant = "h4">No discussion is started for this {category ==="movie"? "movie": "TV show"}</Typography>
        }
        {list.length > index &&  list.length !== 0 &&
      <OutlineButton className="small" onClick={()=>handleClick(index + 4)}>
            Load more
    </OutlineButton>
    }
    </Wrapper>
  );
};

export default Comment;

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin-top:30px;
`

export const CommentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    width:100%;
    height:100%;
    border-radius:10px;
    padding:10px;
    border:1px solid white;
    margin:20px 0;

`

export const CommentHeader = styled(Typography)
`
margin-bottom:10px!important;
color:#803bec!important;
`

