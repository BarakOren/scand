import React, {Component} from "react";
import styled from "styled-components";

const Container = styled.div`
    display: ${p => p.display ? "block" : "none"};
    height: 130px;
    width: 100px;
    padding: 6px 0;
    position: absolute;
    top: 30px;
    left: -15px;
    box-shadow: 0px 4px 35px 0px #A8ACB030;
    z-index: 1;
`   

const Currency = styled.button`
    width: 100%;
    height: 33%;
    background: none;
    border: none;
    /* #EEEEEE selected */
`

class CurrencyToggler extends Component {

    render(){
        return(
            <Container >
                <Currency>&#x24; USD</Currency>
                <Currency style={{background: "#EEEEEE"}}>&#x20AC; EUR</Currency>
                <Currency>&#xa5; JPY</Currency>
            </Container>
        )
    }
}

export default CurrencyToggler;