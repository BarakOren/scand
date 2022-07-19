import React, {Component} from "react";
import styled from "styled-components";
import prod from "../../assets/prod.png";
import arrow from "../../assets/whitecart.png";

const ItemContainer = styled.div`
    padding: 24px 0;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 300px;
`

const ItemName = styled.h1`
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    margin: 0;
`   

const SubName = styled.h1`
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    margin: 10px 0;
` 

const Label = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin: 10px 0 6px 0;
`

const OptionsContainer = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SizeOption = styled.button`
    width: 63px;
    height: 45px;
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
    height: 32px;
    width: 32px;
    background-color: ${p => p.bg};
    outline: 1px solid #5ECE7B;
    outline-offset: 1px;
    border: none;
`

const Price = styled.p`
    margin: 10px 0;
    font-size: 24px;
    font-weight: 700;
`

const RightSide = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: 1100px) {
        width: 30%;
    }
    @media only screen and (max-width: 1100px) {
        width: 35%;
    }
`

const MiddleCol = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const AmountButton = styled.button`
    width: 45px;
    height: 45px;
    color: #1D1F22;
    border: 1px solid #1D1F22;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
`

const CurrentAmount = styled.p`
    font-size: 24px;
    font-weight: 500;
`

const ItemImage = styled.div`
    width: 80%;
    height: 100%;
    background-position: center;
    background-size: cover;
    position: relative;
`

const ImageArrowButton = styled.button`
    width: 24px;
    height: 24px;
    background: rgb(0, 0, 0, 0.73);
    position: absolute;
    bottom: 10px; 
    right: ${p => p.left ? "40px" : "10px"};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Arrow = styled.img`
    width: 60%;
    height: auto;
    transform: ${p => p.left ? "" : "rotate(180deg)"};
`

class CartItem extends Component {

    render(){
        return(
        <ItemContainer>
            <DetailsContainer>
                <ItemName>Apollo</ItemName>
                <SubName>Running Short</SubName>
                <Price>$200.00</Price>
                <Label>Size:</Label>
                <OptionsContainer>
                    <SizeOption>S</SizeOption>
                    <SizeOption>M</SizeOption>
                    <SizeOption>L</SizeOption>
                    <SizeOption>XL</SizeOption>
                </OptionsContainer>
                <Label>Color:</Label>
                    <OptionsContainer style={{justifyContent: "flex-start", gap: "0 15px"}}>
                        <ColorOption bg={"grey"}/>
                        <ColorOption bg={"grey"}/>
                        <ColorOption bg={"grey"}/>
                    </OptionsContainer>
                </DetailsContainer>

                <RightSide>
                    <MiddleCol>
                        <AmountButton>+</AmountButton>
                        <CurrentAmount>1</CurrentAmount>
                        <AmountButton>-</AmountButton>
                    </MiddleCol>
                    <ItemImage style={{backgroundImage: `url(${prod})`}}>
                        <ImageArrowButton><Arrow src={arrow} alt="left" /></ImageArrowButton>
                        <ImageArrowButton left={true}><Arrow left={true} src={arrow} alt="left" /></ImageArrowButton>
                    </ItemImage>
                </RightSide>
               
        </ItemContainer>
        )
    }
}

export default CartItem;
