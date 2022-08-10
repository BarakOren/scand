import React, {Component} from "react";
import styled, {keyframes} from "styled-components";

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
`

const Span = styled.span`
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%,-50%);
    width: 48px;
    height: 48px;
    border: 5px solid #1D1F22;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: ${rotate} 1s linear infinite;
`

class Spinner extends Component {

    render(){
        return <Span />
    }

}

export default Spinner;