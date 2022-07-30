import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AddToCart, RemoveFromCart, changeSizeOrColor } from "../../redux/cart/actions";
import OptionSelector from "./optionselector"

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
    width: 30px;
    height: 30px;
    font-family: Source Sans Pro;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    border: 1px solid #1D1F22;
    background: ${p => p.selected ? "#1D1F22" : "none"};
    color: ${p => p.selected ? "white" : "#1D1F22"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
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


const ColorOption = styled.button`
    cursor: pointer;
    height: 16px;
    width: 16px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
    outline-offset: 1px;
    border: none;
`


class CartOverlayItem extends Component {
    
    render(){
        const {item, addToCart, removeFromCart} = this.props;
        const { name, attributes, gallery, quantity } = item;

        return(
            <Container >
                <LeftColumn>
                    <ItemTitle>{name}</ItemTitle>
                    {attributes.map((att) => {
                        return <div key={att.name}> 
                        <Label>{att.name}</Label>
                        <OptionSelector item={item} att={att} />
                        </div>
                    })}

                </LeftColumn>

                <MiddleCol>
                    <AmountButton onClick={() => addToCart(item)}>+</AmountButton>
                    <CurrentAmount>{quantity || "0"}</CurrentAmount>
                    <AmountButton onClick={() => removeFromCart(item)}>-</AmountButton>
                </MiddleCol>

                <ItemImage style={{backgroundImage: `url(${gallery[0]})`}} />

            </Container>
        )
    }
}

const mapStateToProps = store => ({
    // cart: store.cart.cart,
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(AddToCart(item)),
    removeFromCart: (item) => dispatch(RemoveFromCart(item)),
    changeSizeOrColor: (item, changeType, selected) => dispatch(changeSizeOrColor(item, changeType, selected))
});

export default connect(mapStateToProps,mapDispatchToProps)(CartOverlayItem);
