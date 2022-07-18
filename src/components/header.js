import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.nav`
    /* border: 1px solid black; */
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Links = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const A = styled(Link)`
    font-size: 16px;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 81px;
    color: black;
    text-decoration: none;
    /* selected: #5ECE7B */
`

class Header extends Component {
  

    render(){
      return (
        <Container >
            <Links>
                <A to="/">WOMEN</A>
                <A to="/men">MAN</A>
                <A to="kids">KIDS</A>
            </Links>
        </Container>
      );
    }
    
  }

  
  export default Header;