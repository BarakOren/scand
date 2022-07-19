import React, {Component} from "react";
import styled from "styled-components";
import prod from "../../../assets/prod.png";
import whitecart from "../../../assets/whitecart.png";

const ItemContainer = styled.div`
    height: 25vw;
    width: 20vw;
    padding: 16px;
    transition: .2s all;
    position: relative;

    &:hover{ 
        box-shadow: 0px 4px 35px 0px #A8ACB030;
    }

    @media only screen and (max-width: 1000px) {
        height: 33vw;
        width: 28vw;
    }

`

const ItemImage = styled.div`
    width: 100%;
    height: 80%;
    background-position: center;
    background-size: cover;
    margin-bottom: 1vw;
    position: relative;
`

const Title = styled.p`
    font-size: 18px;
    width: 100%;
    text-align: left;
    font-weight: 300;
    margin: 10px 0;
    @media only screen and (max-width: 1050px) {
        margin: 5px 0;
    }
`

const Price = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin: 10px 0;
    width: 100%;
    @media only screen and (max-width: 1050px) {
        margin: 5px 0;
    }
`

const AddToCartButton = styled.button`  
    opacity: 0;
    width: 3.5vw;
    height: 3.5vw;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    right: 1vw;
    bottom: 0;
    transform: translateY(50%);
    cursor: pointer;
    transition: .4s all;

    ${ItemContainer}:hover & {
        opacity: 1;
    }
`

const CartIcon = styled.img`
    width: 1.7vw;
    height: auto;
    position: relative;
    right: 1px;
    top: 2px;
`

class Item extends Component {
    
    render(){
        return(
            <ItemContainer>
                <ItemImage style={{backgroundImage: `url(${prod})`}}>
                <AddToCartButton>
                    <CartIcon src={whitecart} alt="add-to-cart-button" />
                </AddToCartButton>
                </ItemImage>
                <Title>Apollo Running Short</Title>
                <Price>50.00$</Price>
            </ItemContainer>
        )
    }
}

export default Item;