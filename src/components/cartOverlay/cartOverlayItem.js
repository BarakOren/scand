import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { closeOverlay, addFromCart, RemoveFromCart, changeSizeOrColor } from "../../redux/cart/actions";
import OptionSelector from "./optionselector"


const Container = styled.div`
    min-height: 190px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 30px 0;
    position: relative;
`

const LeftColumn = styled.div`
    width: 136px;
    height: 100%;
`

const NameAndPriceContainer = styled.div`
    width: 100%;
`

const Brand = styled.p`
    font-size: 16px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    margin: 0;
    text-decoration: none;
    color: inherit;
    line-height: 25.6px;
`

const ItemName = styled(Link)`
    font-size: 16px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    text-decoration: none;
    line-height: 25.6px;
    color: inherit;
`

const Price = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    width: 100%;
    margin: 4px 0 0px 0;
    line-height: 25.6px;
`

const Label = styled.p`
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    margin: 8px 0;
    line-height: 16px;
    @media only screen and (max-width: 420px) {
        font-size: 12px;
    }
`

const MiddleCol = styled.div`
    height: 100%;
    width: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    top: 0;
`

const AmountButton = styled.button`
    width: 24px;
    height: 24px;
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
    background-image: ${p => `url(${p.image})`};
    width: 121px; 
    background-position: center;
    background-size: cover;
    min-height: inherit;
`

class CartOverlayItem extends Component {
    
    render(){
        const { item, addFromCart, removeFromCart, currency, closeOverlay } = this.props;
        const { name, brand, attributes, gallery, quantity, category, id } = item;
        const currencyCurrency = item.prices.find(cur => cur.currency.label === currency.label)
        
        return(
            <Container>
                <LeftColumn>
                    <NameAndPriceContainer>
                    <Brand>{brand}</Brand>
                    <ItemName onClick={() => closeOverlay()} to={`/category/${category}/${id}`}>{name}</ItemName>
                    <Price>{currencyCurrency.currency.symbol}{currencyCurrency.amount}</Price>
                    </NameAndPriceContainer>
                    {attributes.map((att) => {
                        return <div key={att.name + "cart"}> 
                        <Label >{att.name}:</Label>
                        <OptionSelector size={attributes.length > 2 ? "small" : ""} item={item} att={att} />
                        </div>
                    })}
                </LeftColumn>

                <MiddleCol>
                    <AmountButton onClick={() => addFromCart(item)}>+</AmountButton>
                    <CurrentAmount>{quantity || "0"}</CurrentAmount>
                    <AmountButton onClick={() => removeFromCart(item)}>-</AmountButton>
                </MiddleCol>

                <ItemImage image={gallery[0]} />

            </Container>
        )
    }
}

const mapStateToProps = store => ({
    currency: store.currencies.currency
})

const mapDispatchToProps = dispatch => ({
    addFromCart: (item) => dispatch(addFromCart(item)),
    removeFromCart: (item) => dispatch(RemoveFromCart(item)),
    closeOverlay: () => dispatch(closeOverlay()),
    changeSizeOrColor: (item, changeType, selected) => dispatch(changeSizeOrColor(item, changeType, selected))
});

export default connect(mapStateToProps,mapDispatchToProps)(CartOverlayItem);
