import React, {Component} from "react";
import styled from "styled-components";
import whitecart from "../../../assets/whitecart.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {addToCartFromCategoryPage} from "../../../redux/cart/actions";
import whitearrow from "../../../assets/whitearrow.png"

const Container = styled.li`
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    &:hover{ 
        box-shadow: 0px 4px 35px 0px #A8ACB030;
    }
`

const ItemContainer = styled(Link)`
    list-style-type: none;
    height: 100%;
    width: 100%;
    transition: .2s all;
    position: relative;
    text-decoration: none;
    color: black;

    @media only screen and (max-width: 1000px) {
    }

`

const ItemImage = styled.div`
    width: 100%;
    height: 75%;
    background-position: center;
    background-size: cover;
    margin-bottom: 1vw;
    position: relative;
    opacity: ${p => p.disabled ? "0.5" : "1"};
`

const Title = styled.p`
    font-size: 14px;
    width: 100%;
    text-align: left;
    font-weight: 300;
    margin: 20px 0 6px 0;
    opacity: ${p => p.disabled ? "0.5" : "1"};


    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`

const Price = styled.p`
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    margin: 6px 0;
    width: 100%;
  
    opacity: ${p => p.disabled ? "0.5" : "1"};

    @media only screen and (max-width: 1050px) {
        margin: 4px 0;
    }

    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`


const AddToCartButton = styled.button`  
    display: ${p => p.disabled ? "none" : "default"};
    opacity: 0.1;
    width: 34px;
    height: 34px;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    top: 180px;
    right: 10px;
    cursor: pointer;
    transition: .4s opacity;
    z-index: 1;

    ${Container}:hover & {
        opacity: 1;
    }
/* 
    @media only screen and (max-width: 1000px){
        top: 155px;
    }

    @media only screen and (max-width: 900px){
        top: 185px;
        right: 0;
    }

    @media only screen and (max-width: 760px) {
        top: 156px;
    }

    @media only screen and (max-width: 600px) {
        width: 30px;
        height: 30px;
        top: 137px;
    }

    @media only screen and (max-width: 400px) {
        width: 24px;
        height: 24px;
        top: 140px;
    } */


    
    
`

const CartIcon = styled.img`
    width: 16px;
    height: auto;
    position: relative;
    right: 1px;
    top: 2px;

     @media only screen and (max-width: 1000px){
        width: 14px;
    }

    @media only screen and (max-width: 400px) {
        width: 12px;
        height: 12px;
    } 
`

const Direct = styled(Link)`
    text-decoration: none;
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
    font-weight: 900;
    font-size: 2vw;

    ${ItemContainer}:hover & {
        opacity: 1;
    }
`

const ArrowIcon = styled.img`
    width: 1vw;
    height: auto;
    position: relative;
    left: 1px;
    top: 47%;
    transform: translateY(-50%) rotate(180deg);
`

const OutOfStock = styled.p`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    font-family: Raleway;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    width: 100%;
    color: #8D8F9A;
    text-shadow: 0 0 3px white;
    
    @media only screen and (max-width: 600px) {
        top: 20%;
    }

    @media only screen and (max-width: 500px) {
        top: 30%;
        font-size: 16px;
    }
`


class Item extends Component {
    
    render(){

        const {category, gallery, id, inStock, name, brand, prices} = this.props.product;
        const {currency, addToCartFromCategoryPage} = this.props;
        const currentCurrency = prices.find(cur => cur.currency.label === currency.label);

        return(
            <Container style={{position: "relative"}}>
            <AddToCartButton onClick={() => {addToCartFromCategoryPage(this.props.product)}} disabled={!inStock}>
                    <CartIcon src={whitecart} alt="add-to-cart-button" />
            </AddToCartButton>
            <ItemContainer to={`/category/${category}/item/${id}`}>
                <ItemImage disabled={!inStock} style={{backgroundImage: `url(${gallery[0]})`}}>
                </ItemImage>
                <Title disabled={!inStock}>{name} {brand}</Title>
                <Price disabled={!inStock}>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
                {!inStock && <OutOfStock>Out Of Stock</OutOfStock>}
            </ItemContainer>
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    currency: store.currencies.currency
})

const mapDispatchToProps = dispatch => ({
    addToCartFromCategoryPage: (item) => dispatch(addToCartFromCategoryPage(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item);