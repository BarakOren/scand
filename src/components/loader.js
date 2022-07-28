import React, {Component} from "react";
import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
`

const Span = styled.span`
    // display: ${p => p.display ? "inline-block" : "none"};
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%,-50%);
    width: 48px;
    height: 48px;
    border: 5px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: ${rotate} 1s linear infinite;
`

class Loader extends Component {


    render(){
        return <Span />
    }

}

export default Loader;