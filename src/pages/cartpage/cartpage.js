import React, {Component} from "react";
import styled from "styled-components";
import CartItem from "./components/cartitem";
import { connect } from "react-redux";

const Page = styled.div`
    width: 100%;
    padding-bottom: 50px;
`

const Title = styled.h1`
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    text-align: left;
`

const OrderContainer = styled.div`
    width: 30%;
`

const Text = styled.p`
    font-size: 24px;
    font-weight: 400;
    text-align: left;
`

const Bold = styled.span`
    font-size: 24px;
    font-weight: 700;
`

const Button = styled.button`
    background: #5ECE7B;
    border: none;
    color: white;
    width: 100%;
    height: 43px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
`

const NoItems = styled.h1`
    font-size: 4em;
    margin: 10vh 0;
`

class CartPage extends Component {

    render(){
        const {cart, currency} = this.props;
        const quantity = cart.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
        const total =  cart.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity * cartItem.prices.find(cur => cur.currency.label === currency.label).amount, 0)
        const tax = (21 / 100) * total
        return(
            <Page>
                <Title>Cart</Title>
                {cart.length === 0 && <NoItems>No Items..</NoItems>}
                {cart.map((item, index) => {
                    return <CartItem key={index} item={item} /> 
                })}
                <OrderContainer>
                    <Text>Tax 21%: <Bold>{currency.symbol}{tax.toFixed(2)}</Bold></Text>
                    <Text>Quantity: <Bold>{quantity}</Bold></Text>
                    <Text>Total: <Bold>{currency.symbol}{total.toFixed(2)}</Bold></Text>
                <Button>Order</Button>
                </OrderContainer>
            </Page>
        )
    }
}

const mapStateToProps = store => ({
    cart: store.cart.cart,
    currency: store.currencies.currency,
    currencies: store.currencies.currencies,
})

export default connect(mapStateToProps)(CartPage);