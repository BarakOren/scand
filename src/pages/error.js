import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Text = styled.h1`
    font-size: 3em;
    margin: 0;
`


const A = styled(Link)`
    font-size: 3em;
    height: 100%;
    color: black;
    text-decoration: none;
    transition: .3s all;

    &:hover {
        color: #5ECE7B;
        text-shadow: 0 0 10px #5ECE7B;
    }
`

class Error extends Component {

    render(){
        return(
            <Page>
                <Text>Sorry.. Wrong Page.</Text>
                <Text>Lets go home.</Text>
                <A to="/">Home.</A>
            </Page>
        )
    }
}

export default Error;