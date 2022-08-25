import React, {Component} from "react";
import styled from "styled-components";
import arrow from "../../../assets/whiteArrow.svg";
import { connect } from "react-redux";
import { addFromCart, RemoveFromCart } from "../../../redux/cart/actions";
import OptionSelector from "./optionselector.js"
import {Link} from "react-router-dom"

const ItemContainer = styled.div`
    padding: 24px 0;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    @media only screen and (max-width: 420px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        height: unset;
    }

`

const DetailsContainer = styled.div`
    text-align: left;
    width: 300px;
    height: 100%;
    @media only screen and (max-width: 700px) {
        width: 250px;
    }   
    @media only screen and (max-width: 500px) {
        width: 220px;
    }  
    @media only screen and (max-width: 420px) {
        text-align: unset;
    }
`

const ItemName = styled(Link)`
    font-size: 22px;
    font-weight: 400;
    text-align: left;
    margin: 0;
    text-decoration: none;
    color: inherit; 
    @media only screen and (max-width: 700px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 420px) {
        text-align: unset;
    }
`   

const Brand = styled.h1`
    font-size: 22px;
    margin: 0 0 16px 0;
    font-weight: 600;
    @media only screen and (max-width: 700px) {
        font-size: 20px;
    }
` 

const Price = styled.p`
    margin: 20px 0;
    font-size: 20px;
    font-weight: 700;
    @media only screen and (max-width: 700px) {
        font-size: 18px;
    }
 
`

const Label = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    margin: ${p => p.size >= 3 ? "8px 0 4px 0" : "10px 0 7px 0"};
    @media only screen and (max-width: 700px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 420px) {
        font-size: 14px;
        text-align: center;
    }
`

const MiddleCol = styled.div`
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top:50%;
    right: 22%;
    transform: translateY(-50%);
    @media only screen and (max-width: 1000px) {
        right: 28%;
    }

    @media only screen and (max-width: 700px) {
        right: 50%;
        transform: translate(50%, -50%);
    }

    @media only screen and (max-width: 420px) {
        flex-direction: row;
        width: 70%;
        margin-top: 20px;
        position: unset;
        transform: unset;
        height: auto;
    }
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

    @media only screen and (max-width: 700px) {
        width: 36px;
        height: 36px;
        font-size: 22px;
    }
    @media only screen and (max-width: 500px) {
        width: 30px;
        height: 30px;
        font-size: 20px;
    }  
`

const CurrentAmount = styled.p`
    font-size: 24px;
    font-weight: 500;
`

const ItemImage = styled.div`
    width: 20%;
    background-image: ${p => `url(${p.image})`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: inherit;
    @media only screen and (max-width: 1000px) {
        width: 25%;
    }
    @media only screen and (max-width: 700px) {
        width: 40%;
    }

    @media only screen and (max-width: 420px) {
        width: 90%;
        height: 300px;
    }
`

const ImageArrowButton = styled.button`
    width: 24px;
    height: 24px;
    background: rgb(0, 0, 0, 0.73);
    position: absolute;
    bottom: 30px; 
    right: ${p => p.left ? "40px" : "10px"};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
        display: none;
    }
`

const Arrow = styled.img`
    width: 60%;
    height: auto;
    transform: ${p => p.left ? "rotate(180deg)" : ""};
`



class CartItem extends Component {

    constructor(){
        super()
        this.state = {
            currentImage: 0
        }
        this.toggleRight = this.toggleRight.bind(this);
        this.toggleLeft = this.toggleLeft.bind(this);
    }

    toggleRight = (gallery) => {
        this.state.currentImage > 0 ? 
        this.setState({ currentImage: this.state.currentImage - 1 })
      : this.setState({ currentImage: gallery.length - 1 });
    }

    toggleLeft = (gallery) => {
        this.state.currentImage < gallery.length - 1 ? 
        this.setState({ currentImage: this.state.currentImage + 1 })
      : this.setState({ currentImage: 0 });
    }


    render(){
        const { item, addFromCart, removeFromCart, currency } = this.props;
        const { name, prices, gallery, quantity, brand, category, id } = item;
        const { currentImage } = this.state;
        const currentCurrency = prices.find(cur => cur.currency.label === currency.label)

        return(
        <ItemContainer>
            <DetailsContainer>
                <Brand>{brand}</Brand>
                <ItemName to={`/category/${category}/${id}`}>{name}</ItemName>
                <Price>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
                {item.attributes.map((att) => {
                    return <div key={att.name}> 
                        <Label size={item.attributes.length}>{att.name.toUpperCase()}:</Label>
                        <OptionSelector length={item.attributes.length} item={item} att={att} />
                    </div>
                })}
            </DetailsContainer>

                    <MiddleCol>
                        <AmountButton onClick={() => addFromCart(item)}>+</AmountButton>
                        <CurrentAmount>{quantity || "0"}</CurrentAmount>
                        <AmountButton onClick={() => removeFromCart(item)}>-</AmountButton>
                    </MiddleCol>
                    <ItemImage image={gallery[currentImage]}>
                        <ImageArrowButton disabled={gallery.length === 1} onClick={() => this.toggleRight(gallery)}><Arrow  src={arrow} alt="right" /></ImageArrowButton>
                        <ImageArrowButton disabled={gallery.length === 1} onClick={() => this.toggleLeft(gallery)} left={true}><Arrow left={true} src={arrow} alt="left" /></ImageArrowButton>
                    </ItemImage>
               
        </ItemContainer>
        )
    }
}

const mapStateToProps = store => ({
    currency: store.currencies.currency
})

const mapDispatchToProps = dispatch => ({
    addFromCart: (item) => dispatch(addFromCart(item)),
    removeFromCart: (item) => dispatch(RemoveFromCart(item))
});

export default connect(mapStateToProps ,mapDispatchToProps)(CartItem);


