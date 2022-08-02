import React, {Component} from "react";
import styled from "styled-components";
import whitecart from "../../../assets/whitecart.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {addToCartFromCategoryPage} from "../../../redux/cart/actions";
import whitearrow from "../../../assets/whitearrow.png"

const ItemContainer = styled.li`
    list-style-type: none;
    height: 300px;
    width: 50%;
    transition: .2s all;
    position: relative;
    text-decoration: none;
    color: black;

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
    opacity: ${p => p.disabled ? "0.5" : "1"};
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
    opacity: ${p => p.disabled ? "0.5" : "1"};
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
    opacity: ${p => p.disabled ? "0.5" : "1"};
`


const AddToCartButton = styled.button`  
    display: ${p => p.disabled ? "none" : "default"};
    opacity: 0;
    width: 3.5vw;
    height: 3.5vw;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    right: 5vw;
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
`


class Item extends Component {
    
    render(){

        const {category, gallery, id, inStock, name, prices} = this.props.product;
        const {currency, addToCartFromCategoryPage} = this.props;
        const currentCurrency = prices.find(cur => cur.currency.label === currency.label);

        return(
            <ItemContainer>
                <ItemImage disabled={!inStock} style={{backgroundImage: `url(${gallery[0]})`}}>
                <AddToCartButton onClick={() => {addToCartFromCategoryPage(this.props.product)}} disabled={!inStock}>
                    <CartIcon src={whitecart} alt="add-to-cart-button" />
                </AddToCartButton>
                <Direct to={`${category}/${id}`}>
                    <ArrowIcon src={whitearrow} alt="direct-to-item" />    
                </Direct>
                </ItemImage>
                <Title disabled={!inStock}>{name}</Title>
                <Price disabled={!inStock}>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
                {!inStock && <OutOfStock>Out Of Stock</OutOfStock>}
            </ItemContainer>
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