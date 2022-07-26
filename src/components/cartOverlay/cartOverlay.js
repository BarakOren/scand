import React, {Component} from "react";
import styled from "styled-components";
import CartOverlayItem from "./cartOverlayItem";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {toggleOverlay, closeOverlay} from "../../redux/cart/actions"

const Container = styled.div`
    display: ${p => p.display === "on" ? "block" : "none"}; 
    min-height: 30vh;
    max-height: 70vh;
    width: 325px;
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

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
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


    constructor(props) {
        super(props);
    
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          this.props.closeOverlay();
        }
      }

    render(){
        const {cart, cartOverlayToggle, toggleCart} = this.props
        const total =  cart.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity * cartItem.price, 0)
        const quantity = cart.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
        
        return(
            <Container display={cartOverlayToggle ? "on" : "off"} ref={this.wrapperRef}>
                <MyBag>My Bag,<ItemCount> {quantity} items</ItemCount></MyBag>
                
                {cart.length === 0 && <NoItems>no items, yet...</NoItems>}

                {cart.length > 0 && cart.map((item, index) => {
                    return <CartOverlayItem key={index} item={item}/>
                })}

                <TotalContainer>
                    <TotalText>Total:</TotalText>
                    <TotalPrice>${total}</TotalPrice>
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
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleOverlay()),
    closeOverlay: () => dispatch(closeOverlay())
});
  

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);