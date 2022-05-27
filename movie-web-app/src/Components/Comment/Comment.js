import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
const Comment = (props) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [commentMessage,setCommentMessage] = React.useState("");
  const handleClick = () => {
    
    if(commentMessage.length === 0)
    {
      setErrorMessage("Please enter comment");
    }
    else {
      props.addNewComment(commentMessage);
      setCommentMessage("");
    }
    
  }
  return (
    <Wrapper>
      <Title>Comment</Title>
      <Textarea placeholder="Enter you opinion..."
      value = {commentMessage}
      onChange={(e)=>setCommentMessage(e.target.value)}
      ></Textarea>
      <ButtonWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CommentButton onClick={()=>handleClick()}>Send</CommentButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Comment;

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:flex-end;
`

export const Textarea = styled.textarea`
  background-color: #222222;
  color: #f1eeee;
  padding: 0.5em;
  border-radius: 10px;
  border: 2px solid transparent;
  outline: none;
  font-family: "Heebo", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  width: 100%;
  height: 100px;
  transition: all 0.2s;
  resize:none;
`;

export const Title = styled.h2`
  padding-bottom: 10px;
  width:100%;
`;

export const CommentButton = styled.button`
  background-color: #803bec;
  color:white;
  border-radius: 10px;
  border:none;
  padding: 10px;
  width:100px;
  height:40px;
  margin-top:15px;
  font-size:18px;
  padding:0px;
  &:hover
  {
    background-color: black;
    color:#803bec;
    border:3px solid #803bec;

  }

`

export const ButtonWrapper = styled.div`

width:100%;
display:flex;
flex-direction:row;
justify-content:space-between;
`

export const ErrorMessage = styled.span`
color:red;
font-size:16px;
padding-top:10px;
`
