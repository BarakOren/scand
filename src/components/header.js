import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import cartimg from "../assets/cart.png";
import arrow from "../assets/arrow.png";
import CurrencyToggler from "./currencytoggler";
import CartOverlay from "./cartOverlay/cartOverlay";
import { connect } from "react-redux";
import { toggleOverlay } from "../redux/cart/actions";
import { popupToggle } from "../redux/currencies/actions";
import { withRouter } from 'react-router-dom';


const Container = styled.nav`
    width: 100%;
    padding: 0 6%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: white;
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
    padding: 0 15px;
    color: ${p => p.current ? "#5ECE7B" : "black"};
    border-bottom: ${p => p.current && "1px solid #5ECE7B"}}   
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

    constructor(props){
        super(props);
        this.state = {
            param: this.props.location.pathname
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
        this.setState({ param : "/" + location.pathname.split('/')[1] })
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render(){
        const {currency, cart, toggleCart, popupToggle, categories } = this.props;
        const param = this.state.param
        const quantity = cart.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
  
        return (
        <Container >
            <Links>
            {categories.map((link, index) => {
                const {name} = link
                return <A current={param === `/${name}`} key={index} to={`/${name}`}>{name.toUpperCase()}</A>
            })}
            </Links>
            
            <A to="/" >
                <Icon src={icon} alt="icon" />
            </A>
                
            <SettingsContaier >
                <CurrencyContainer onClick={popupToggle}>
                    <Currency>{currency.symbol}</Currency>
                    <Arrow src={arrow} alt="arrow-button" />
                    <CurrencyToggler />
                </CurrencyContainer>
                
                <CartButton onClick={toggleCart} >
                    <CartIcon src={cartimg} alt="cart-icon" />
                    {cart.length > 0 && <ItemsAmount>{quantity}</ItemsAmount>}
                </CartButton>
             
                <CartOverlay />

            </SettingsContaier>

        </Container>
      );
    }
    
  }

const mapStateToProps = store => ({
    cartOverlayToggle: store.cart.overlayToggler,
    currenciesToggle: store.currencies.popupToggle,
    currency: store.currencies.currency,
    cart: store.cart.cart
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleOverlay()),
    popupToggle: () => dispatch(popupToggle())
});
  

const HeaderWithRouter = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);