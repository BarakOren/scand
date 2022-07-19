import React, {Component} from "react";
import styled from "styled-components";
import prod from "../../../assets/prod.png";
import whitecart from "../../../assets/whitecart.png";

const ItemContainer = styled.div`
    height: 428px;
    width: 352px;
    padding: 16px;
    transition: .2s all;
    position: relative;

    &:hover{ 
        box-shadow: 0px 4px 35px 0px #A8ACB030;
    }

   

`

const ItemImage = styled.div`
    width: 100%;
    height: 80%;
    background-position: center;
    background-size: cover;
    margin-bottom: 30px;
`

const Title = styled.p`
    font-size: 18px;
    width: 100%;
    text-align: left;
    font-weight: 300;
    margin: 10px 0;
`

const Price = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin: 10px 0;
    width: 100%;
`

const AddToCartButton = styled.button`  
    opacity: 0;
    width: 52px;
    height: 52px;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    right: 31px;
    top: 72%;
    cursor: pointer;
    transition: .4s all;

    ${ItemContainer}:hover & {
        opacity: 1;
    }
`

const CartIcon = styled.img`
    width: 24px;
    height: auto;
    position: relative;
    right: 1px;
    top: 2px;
`

class Item extends Component {
    
    render(){
        return(
            <ItemContainer>
                <AddToCartButton>
                    <CartIcon src={whitecart} alt="add-to-cart-button" />
                </AddToCartButton>
                <ItemImage style={{backgroundImage: `url(${prod})`}} />
                <Title>Apollo Running Short</Title>
                <Price>50.00$</Price>
            </ItemContainer>
        )
    }
}

export default Item;