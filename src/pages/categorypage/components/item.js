import React, {Component} from "react";
import styled from "styled-components";
import whitecart from "../../../assets/whitecart.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {addToCartFromCategoryPage} from "../../../redux/cart/actions";

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
    color: #1D1F22;
    font-size: 20px;

    
    @media only screen and (max-width: 1500px) {
        font-size: 18px;
    }

    /* @media only screen and (max-width: 1200px) {
        font-size: 18px;
    } */

    @media only screen and (max-width: 1000px) {
        font-size: 14px;
    }

    @media only screen and (max-width: 900px) {
        font-size: 16px;
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
    width: 100%;
    text-align: left;
    font-weight: 300;
    margin: 20px 0 6px 0;
    opacity: ${p => p.disabled ? "0.5" : "1"};

    @media only screen and (max-width: 600px) {
        margin: 10px 0 2px 0;
        font-size: 12px;
    }
`

const Price = styled.p`
    font-weight: 500;
    text-align: left;
    margin: 6px 0;
    width: 100%;
  
    opacity: ${p => p.disabled ? "0.5" : "1"};

    @media only screen and (max-width: 1050px) {
        margin: 4px 0;
    }

    @media only screen and (max-width: 600px) {
        margin: 2px 0;
        font-size: 12px;
    }
`


const AddToCartButton = styled.button`  
    display: ${p => p.disabled ? "none" : "default"};
    opacity: 1;
    width: 38px;
    height: 38px;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    top: 312px;
    right: 20px;
    cursor: pointer;
    transition: .4s opacity;
    z-index: 1;

    ${Container}:hover & {
        opacity: 1;
    }

    @media only screen and (max-width: 1500px) {
        top: 252px;
    }

    @media only screen and (max-width: 1200px) {
        top: 215px;
    }
 
    @media only screen and (max-width: 1000px){
        top: 178px; 
    }

    @media only screen and (max-width: 900px){
        top: 214px;
    }

    @media only screen and (max-width: 760px) {
        width: 32px;
        height: 32px;
        top: 202px;
    }

    @media only screen and (max-width: 600px) {
        top: 152px;
    }

    @media only screen and (max-width: 400px) {
        right: 15px;
        width: 24px;
        height: 24px;
        top: 155px;
    } 
`

const CartIcon = styled.img`
    width: 18px;
    height: auto;
    position: relative;
    right: 1px;
    top: 2px;

    @media only screen and (max-width: 760px) {
        width: 16px;
    }

    @media only screen and (max-width: 400px) {
        width: 12px;
        height: 12px;
    } 
`

const OutOfStock = styled.p`
    position: absolute;
    top: 35%;
    right: 0;
    font-family: Raleway;
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    width: 100%;
    color: #8D8F9A;
    text-shadow: 0 0 3px white;
    z-index: 1;
    
    @media only screen and (max-width: 1200px) {
        font-size: 26px;
    }

    @media only screen and (max-width: 1000px) {
        font-size: 22px;
    }

    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }

    @media only screen and (max-width: 500px) {
        top: 35%;
        font-size: 14px;
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
            </ItemContainer>
            {!inStock && <OutOfStock>Out Of Stock</OutOfStock>}
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