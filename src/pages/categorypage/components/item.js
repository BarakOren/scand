import React, {Component} from "react";
import styled from "styled-components";
import whitecart from "../../../assets/whiteEmptyCart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {addToCartFromCategoryPage} from "../../../redux/cart/actions";

const Container = styled.li`
    width: 100%;
    height: 412px;
    padding: 16px;
    position: relative;
    line-height: 28.8px;
    /* box-shadow: inset 0 0 0 16px lightGreen; */
    &:hover{ 
        box-shadow: 0px 4px 35px 0px #A8ACB030;
    }
/* 58 */
    @media only screen and (max-width: 1365px) {
        height: 365px;
    }

    @media only screen and (max-width: 1175px) {
        height: 320px;
    }

    @media only screen and (max-width: 1056px) {
        height: 280px;
        line-height: 25px;
    }

    @media only screen and (max-width: 951px) {
        height: 233px;
    }

    @media only screen and (max-width: 851px) {
        height: 320px;
        line-height: 28.8px;
    }

    @media only screen and (max-width: 700px) {
        height: 233px;
        line-height: 25px;
    }

    @media only screen and (max-width: 540px) {
        height: 210px;
    }

    @media only screen and (max-width: 440px) {
        height: 250px;
    }
 
`

const ItemContainer = styled(Link)`
    list-style-type: none;
    height: 100%;
    width: inherit;
    transition: .2s all;
    position: relative;
    text-decoration: none;
    color: #1D1F22;
    font-size: 18px;
    
    @media only screen and (max-width: 951px) {
        font-size: 16px;
    }

    @media only screen and (max-width: 540px) {
        font-size: 14px;
    }
 

`

const ItemImage = styled.div`
    background-image: ${p => `url(${p.image})`};
    width: 100%;
    height: 330px;
    background-position: center;
    background-size: cover;
    position: relative;
    opacity: ${p => p.disabled ? "0.5" : "1"};

    @media only screen and (max-width: 1365px) {
        height:  283px;
    }

    @media only screen and (max-width: 1175px) {
        height: 238px;
    }

    @media only screen and (max-width: 1056px) {
        height: 207px;
    }

    @media only screen and (max-width: 951px) {
        height: 171px;
    }

    @media only screen and (max-width: 851px) {
        height: 238px;
    }

    @media only screen and (max-width: 700px) {
        height: 171px;
    }

    @media only screen and (max-width: 540px) {
        height: 148px;
    }

    @media only screen and (max-width: 440px) {
        height: 188px;
    }

`

const Title = styled.p`
    width: inherit;
    text-align: left;
    font-weight: 300;
    margin: 24px 0 0 0;
    opacity: ${p => p.disabled ? "0.5" : "1"};
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
    @media only screen and (max-width: 951px) {
        margin: 12px 0 0 0;
    }

    @media only screen and (max-width: 851px) {
        margin: 24px 0 0 0;
    }
    
    @media only screen and (max-width: 700px) {
        margin: 12px 0 0 0;
    }
 
`

const Price = styled.p`
    font-weight: 500;
    text-align: left;
    margin: 0px 0px 0px 0px;
    width: 100%;
    opacity: ${p => p.disabled ? "0.5" : "1"};
    @media only screen and (max-width: 1050px) {
        /* margin: 4px 0 0 0; */
    }

 
`


const AddToCartButton = styled.button`  
    display: ${p => p.disabled ? "none" : "block"};
    opacity: 1;
    width: 38px;
    height: 38px;
    border: none;
    background: #5ECE7B;
    border-radius: 50%;
    position: absolute;
    top: 325px;
    right: 25px;
    cursor: pointer;
    transition: .4s opacity;
    z-index: 1;

    ${Container}:hover & {
        opacity: 1;
    }

    @media only screen and (max-width: 1365px) {
        top: 279px;
    }

    @media only screen and (max-width: 1175px) {
        top: 234px;
    }

    @media only screen and (max-width: 1056px) {
        top: 204px;
    }

    @media only screen and (max-width: 951px) {
        top: 170px;
        width: 32px;
        height: 32px;
    }

    @media only screen and (max-width: 851px) {
        top: 234px;
        width: 38px;
        height: 38px;
    }

    @media only screen and (max-width: 700px) {
        top: 233px;
    }

    @media only screen and (max-width: 540px) {
        top: 210px;
    }

    @media only screen and (max-width: 440px) {
        top: 250px;
    }

    /* @media only screen and (max-width: 1500px) {
        top: 216px;
    }

    @media only screen and (max-width: 1200px) {
        top: 218px;
    }
 
    @media only screen and (max-width: 1000px){
        top: 198px; 
        width: 32px;
        height: 32px;
    }

    @media only screen and (max-width: 900px){
        top: 222px;
    }

    @media only screen and (max-width: 760px) {
        top: 223px;
    }

    @media only screen and (max-width: 550px) {
        top: 185px;
        width: 28px;
        height: 28px;
    }

    @media only screen and (max-width: 400px) {
        right: 28px;
        width: 24px;
        height: 24px;
        top: 186px;
    }  */
`

const CartIcon = styled.img`
    width: 18px;
    height: auto;
    position: relative;
    right: 1px;
    top: 2px;

    @media only screen and (max-width: 1000px) {
        width: 16px;
    }

    @media only screen and (max-width: 550px) {
        width: 12px;
        height: 12px;
    }

`

const OutOfStock = styled(Link)`
    position: absolute;
    top: 35%;
    right: 0;
    font-family: Raleway;
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    width: 100%;
    text-align: center;
    color: #8D8F9A;
    text-shadow: 0 0 3px white;
    z-index: 1;
    text-decoration: none;
    
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
            <Container>
            <AddToCartButton onClick={() => {addToCartFromCategoryPage(this.props.product)}} disabled={!inStock}>
                <CartIcon src={whitecart} alt="add-to-cart-button" />
            </AddToCartButton>
            <ItemContainer to={`/category/${category}/${id}`}>
                <ItemImage disabled={!inStock} image={gallery[0]}>
                </ItemImage>
                <Title disabled={!inStock}>{brand} {name}</Title>
                <Price disabled={!inStock}>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
            </ItemContainer>
            {!inStock && <OutOfStock to={`/category/${category}/${id}`}>Out Of Stock</OutOfStock>}
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