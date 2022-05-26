import styled from "styled-components";
import {Typography} from "@mui/material"
import ReactLoading from "react-loading";


export const WatchListBackground = styled.div`
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:20px;    
    margin-left:3.5rem;
    flex-direction:column;
`

export const WatchListHeaderText = styled(Typography)
`
width:fit-content;
text-align:left;
padding-bottom:30px;
color:#803bec;
`


export const WatchListCategory = styled(Typography)
`
color:${props=>props.active==="true"? "#803bec":"white"};
padding-left:30px;

`

export const WatchListTextWrapper = styled.div
`
width:85%;
display flex;
flex-direction:row;
align-items:baseline;
justify-content:flex-start;
`

export const Loading = styled(ReactLoading)
`
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
`
export const NotFoundText = styled(Typography)
`
width:85%;
color:white;
padding-top:10px;
`