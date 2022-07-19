import React, {Component} from "react";
import styled from "styled-components";
import CartItem from "./cartitem";

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
    width: 20%;
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


class CartPage extends Component {


    render(){
        return(
            <Page>
                <Title>Cart</Title>
                <CartItem />
                <CartItem />
                <OrderContainer>
                    <Text>Tax 21%: <Bold>$42</Bold></Text>
                    <Text>Quantity: <Bold>3</Bold></Text>
                    <Text>Total: <Bold>$200.00</Bold></Text>
                <Button>Order</Button>
                </OrderContainer>
            </Page>
        )
    }
}

export default CartPage;