import React, {Component} from "react";
import styled from "styled-components";
import prod from "../../assets/prod.png";

const Container = styled.div`
    height: 190px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
`

const LeftColumn = styled.div`
    width: 136px;
    height: 100%;
`

const ItemTitle = styled.h1`
    font-size: 16px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    margin: 3px 0;
`

const Price = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    width: 100%;
    margin: 3px 0 19px 0;
`

const Label = styled.p`
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    margin: 7px 0 1px 0;
`

const OptionsContainer = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 5px;
`

const SizeOption = styled.button`
    width: 24px;
    height: 24px;
    font-family: Source Sans Pro;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    border: 1px solid #1D1F22;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const ColorOption = styled.button`
    cursor: pointer;
    height: 15px;
    width: 15px;
    background-color: gray;
    outline: 1px solid #5ECE7B;
    outline-offset: 1px;
    border: none;
`

const MiddleCol = styled.div`
    height: 100%;
    width: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const AmountButton = styled.button`
    width: 22px;
    height: 22px;
    color: #1D1F22;
    border: 1px solid #1D1F22;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
`

const CurrentAmount = styled.p`
    font-size: 16px;
    font-weight: 500;
`

const ItemImage = styled.div`
    height: 100%;
    width: 136px;
    background-position: center;
    background-size: cover;
`


class CartOverlayItem extends Component {

    render(){
        return(
            <Container>
                <LeftColumn>
                    <ItemTitle>Apollo Running Short</ItemTitle>
                    <Price>50.00$</Price>
                    <Label>Size:</Label>
                    <OptionsContainer>
                        <SizeOption>S</SizeOption>
                        <SizeOption style={{backgroundColor: "#1D1F22", color: "white"}}>M</SizeOption>
                        <SizeOption>L</SizeOption>
                        <SizeOption>XL</SizeOption>
                    </OptionsContainer>
                    <Label>Color:</Label>
                    <OptionsContainer style={{gap: "0 8px"}}>
                        <ColorOption />
                        <ColorOption />
                        <ColorOption />
                    </OptionsContainer>
                </LeftColumn>

                <MiddleCol>
                    <AmountButton>+</AmountButton>
                    <CurrentAmount>1</CurrentAmount>
                    <AmountButton>-</AmountButton>
                </MiddleCol>

                <ItemImage style={{backgroundImage: `url(${prod})`}} />

            </Container>
        )
    }
}

export default CartOverlayItem;