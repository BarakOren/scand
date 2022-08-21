import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {toggleOverlay, closeOverlay} from "../../redux/cart/actions"
import styled from "styled-components";
import CartOverlayItem from "./cartOverlayItem";

const Container = styled.div`
    display: ${p => p.display === "on" ? "default" : "none"}; 
    min-height: 30vh;
    max-height: 70vh;
    width: 400px;
    padding: 32px 16px;
    background-color: white;
    position: absolute;
    right: 4vw;
    top: 80px;
    z-index: 2;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    @media only screen and (max-width: 1400px) {
        width: 325px;
    }

    @media only screen and (max-width: 600px) {
        width: 70%;
        right: 0;
    }
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
    align-items: center;
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

    constructor(props) {
        super(props);
    
        this.wrapperRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

      handleClickOutside(event) {
        // closing window if the user clicked outside of the window.
        if (this.props.cartOverlayToggle && this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.props.cartIconRef && !this.props.cartIconRef.current.contains(event.target) ) {
          this.props.closeOverlay();
        }
      }

    render(){
        const {cart, cartOverlayToggle, toggleCart, currency, cartToggle} = this.props
        const total = cart.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity * cartItem.prices.find(price => price.currency.label === currency.label).amount, 0)
        const quantity = cart.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)
      
        
        return(
            // <Container display={cartToggle ? "on" : "off"} ref={this.wrapperRef}>
            <Container display={cartOverlayToggle ? "on" : "off"} ref={this.wrapperRef}>
                <MyBag>My Bag,<ItemCount> {quantity} items</ItemCount></MyBag>
                
                {cart.length === 0 && <NoItems>no items, yet...</NoItems>}
                
                {cart.length > 0 && cart.map((item, index) => {
                    return <CartOverlayItem key={`${item.name}cart${index}`} item={item}/>
                })}

                <TotalContainer>
                    <TotalText>Total:</TotalText>
                    <TotalPrice>{currency.symbol}{total.toFixed(2)}</TotalPrice>
                </TotalContainer>
                
                <ButtonContainer>
                    <Button onClick={toggleCart} to="/cart" bg={"white"} color={"#1D1F22"} border={"#1D1F22"}>View bag</Button>
                    <Button onClick={toggleCart} to="/cart" bg={"#5ECE7B"} color={"white"} border={"#5ECE7B"}>CHECK OUT</Button>
                </ButtonContainer>
            
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    cart: store.cart.cart,
    cartOverlayToggle: store.cart.overlayToggler,
    currency: store.currencies.currency,
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleOverlay()),
    closeOverlay: () => dispatch(closeOverlay())
});
  

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);