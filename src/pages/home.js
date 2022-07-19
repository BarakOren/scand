import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const Welcome = styled.h1`
    font-size: 5em;
`

const Nav = styled.nav`
    width: 50%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const A = styled(Link)`
    font-size: 3em;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 81px;
    color: black;
    text-decoration: none;
    transition: .3s all;

    &:hover {
        color: #5ECE7B;
        text-shadow: 0 0 10px #5ECE7B;
    }
    /* selected: #5ECE7B */
`

class Home extends Component {

    render(){
        return(
            <Page>
                <Welcome>Welcome</Welcome>
                <Nav>
                    <A to="/women">WOMEN</A>
                    <A to="/men">MAN</A>
                    <A to="/kids">KIDS</A>
                    <A to="/itempage">item</A>
                </Nav>
            </Page>
        )
    }
}

export default Home;