import styled from "styled-components";
import { Typography } from "@material-ui/core";


export const SubmitButton = styled.input`
    width:180px;
    height:35px;
    margin-top:20px;
    margin-bottom:20px;
    border-radius:15px;
    background-color:#803bec;
    color:white;
    border:none;
    font-weight:bold;
    &:hover{
        background-color:white;
        border:3px solid #803bec;
        color:#803bec;
        padding:0;
    }
    `

export const InputWrapper = styled.div`
margin-bottom:25px
`

export const TextRedirectHelper = styled(Typography)
`
color:black;
`