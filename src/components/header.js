import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import cart from "../assets/cart.png";
import arrow from "../assets/arrow.png";
import CurrencyToggler from "./currencytoggler";
import CartOverlay from "./cartOverlay/cartOverlay";
import { connect } from "react-redux";
import { toggleOverlay } from "../redux/cart/actions";
import { popupToggle } from "../redux/currencies/actions";


const Container = styled.nav`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 5;
`

const Links = styled.div`
    width: 234px;
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

const Icon = styled.img`
    width: 28px;
    height: 28px;
`

const SettingsContaier = styled.div`
    width: 78px;
    padding: 0 0 0 156px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CartButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CartIcon = styled.img`
    width: 20px;
    height: 20px;
`

const ItemsAmount = styled.p`
    font-size: 10px;
    width: 15px;
    height: 15px;
    background: black;
    color: white;
    border-radius: 50%; 
    position: absolute;
    top: -4px;
    right: -2px;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CurrencyContainer = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`

const Currency = styled.button`
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
`

const Arrow = styled.img`
    height: 4px;
    width: auto;
`

class Header extends Component {

    render(){
        const {toggleCart, popupToggle, cartOverlayToggle, currenciesToggle} = this.props;
        
        function toggleCartFunction(){
            toggleCart(); if(currenciesToggle === true){popupToggle()}
        }

        function toggleCurrenciesFunction(){
            popupToggle(); if(cartOverlayToggle === true){toggleCart()}
        }

      return (
        <Container >
            <Links>
                <A to="/women">WOMEN</A>
                <A to="/men">MAN</A>
                <A to="/kids">KIDS</A>
            </Links>
            <A to="/">
                <Icon src={icon} alt="icon" />
            </A>
                
            <SettingsContaier >
                <CurrencyContainer >
                    <Currency onClick={toggleCurrenciesFunction}>$</Currency>
                    <Arrow onClick={toggleCurrenciesFunction} src={arrow} alt="arrow-button" />
                    <CurrencyToggler />
                </CurrencyContainer>
                
                <CartButton onClick={toggleCartFunction} >
                    <CartIcon src={cart} alt="cart-icon" />
                    <ItemsAmount>14</ItemsAmount>
                </CartButton>
             
                <CartOverlay />

            </SettingsContaier>
        </Container>
      );
    }
    
  }

const mapStateToProps = store => ({
    cartOverlayToggle: store.cart.overlayToggler,
    currenciesToggle: store.currencies.popupToggle
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleOverlay()),
    popupToggle: () => dispatch(popupToggle())
});
  
export default connect(mapStateToProps,mapDispatchToProps)(Header);