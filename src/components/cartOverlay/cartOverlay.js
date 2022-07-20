import React, {Component} from "react";
import styled from "styled-components";
import CartOverlayItem from "./cartOverlayItem";
import {Link} from "react-router-dom";
import { connect } from "react-redux";


const Container = styled.div`
    display: ${p => p.display === "on" ? "block" : "none"}; 
    min-height: 300px;
    width: 325px;
    padding: 32px 16px;
    background-color: white;
    position: absolute;
    right: -20px;
    top: 80px;
    z-index: 2;
`

const MyBag = styled.h2`
    margin-top: 0;
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 16px;
    width: 100%;
    text-align: left; 
`

const ItemCount = styled.span`
    font-weight: 500;
`

const TotalContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const TotalText = styled.p`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
`

const TotalPrice = styled.p`
    font-size: 16px;
    font-weight: 700;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const Button = styled(Link)`
    text-decoration: none;
    width: 40%;
    height: 100%;
    border: 1px solid ${p => p.border};
    color: ${p => p.color};
    background: ${p => p.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`

const NoItems = styled.p`
    font-size: 1.2em;
`

class CartOverlay extends Component {

    render(){
        const {cart, cartOverlayToggle} = this.props
        return(
            <Container display={cartOverlayToggle ? "on" : "off"}>
                <MyBag>My Bag,<ItemCount> 3 items</ItemCount></MyBag>
                
                {cart.length === 0 && <NoItems>no items, yet...</NoItems>}

                {cart.length > 0 && cart.map((item, index) => {
                    return <CartOverlayItem key={index} item={item}/>
                })}

                <TotalContainer>
                    <TotalText>Total:</TotalText>
                    <TotalPrice>$200</TotalPrice>
                </TotalContainer>
                <ButtonContainer>
                    <Button to="/cart" bg={"white"} color={"#1D1F22"} border={"#1D1F22"}>View bag</Button>
                    <Button to="/cart" bg={"#5ECE7B"} color={"white"} border={"#5ECE7B"}>CHECK OUT</Button>
                </ButtonContainer>
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    cart: store.cart.cart,
    cartOverlayToggle: store.cart.overlayToggler,
})


export default connect(mapStateToProps)(CartOverlay);