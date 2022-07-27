import React, {Component} from "react";
import styled from "styled-components";
import prod from "../../assets/prod.png";
import arrow from "../../assets/whitearrow.png";
import { connect } from "react-redux";
import { AddToCart, RemoveFromCart, changeSizeOrColor} from "../../redux/cart/actions";


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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${p => p.selected ? "#1D1F22" : "none"};
    color: ${p => p.selected ? "white" : "#1D1F22"};
`


const ColorOption = styled.button`
    cursor: pointer;
    height: 32px;
    width: 32px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
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
    cursor: pointer;
`

const Arrow = styled.img`
    width: 60%;
    height: auto;
    transform: ${p => p.left ? "" : "rotate(180deg)"};

`

class CartItem extends Component {

    constructor(){
        super()
        this.state = {
            currentImage: 0
        }
    }

    render(){

        const {item, addToCart, removeFromCart, changeSizeOrColor} = this.props;
        const { name, price, size, color, images, colors, sizes, quantity} = item;
        const {currentImage} = this.state;
        
        const toggleRight = () => {
            currentImage > 0 ? 
            this.setState({ currentImage: currentImage - 1 })
          : this.setState({ currentImage: images.length - 1 });
        }

        const toggleLeft = () => {
            currentImage < images.length - 1 ? 
            this.setState({ currentImage: currentImage + 1 })
          : this.setState({ currentImage: 0 });
        }


        return(
        <ItemContainer>
            <DetailsContainer>
                <ItemName>{name}</ItemName>
                <SubName>Running Short</SubName>
                <Price>${price}</Price>
                <Label>Size:</Label>
                <OptionsContainer>
                        {sizes.map((mapSize) => {
                            return <SizeOption onClick={() => {changeSizeOrColor(item, "size", mapSize); this.forceUpdate()}}  
                                    key={mapSize + "page"} selected={mapSize === size}>{mapSize}</SizeOption>
                        })} 
                </OptionsContainer>
                <Label>Color:</Label>
                    <OptionsContainer style={{justifyContent: "flex-start", gap: "0 15px"}}>
                        {colors.map((colorMap) => {
                            return <ColorOption onClick={() => {changeSizeOrColor(item, "color", colorMap); this.forceUpdate()}} 
                            key={colorMap + "page"} bg={colorMap} selected={colorMap === color}/>
                        })}
                    </OptionsContainer>
                </DetailsContainer>

                <RightSide>
                    <MiddleCol>
                        <AmountButton onClick={() => addToCart(item)}>+</AmountButton>
                        <CurrentAmount>{quantity || "0"}</CurrentAmount>
                        <AmountButton onClick={() => removeFromCart(item)}>-</AmountButton>
                    </MiddleCol>
                    <ItemImage style={{backgroundImage: `url(${images[currentImage]})`}}>
                        <ImageArrowButton><Arrow onClick={() => toggleRight()} src={arrow} alt="right" /></ImageArrowButton>
                        <ImageArrowButton onClick={() => toggleLeft()} left={true}><Arrow left={true} src={arrow} alt="left" /></ImageArrowButton>
                    </ItemImage>
                </RightSide>
               
        </ItemContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(AddToCart(item)),
    removeFromCart: (item) => dispatch(RemoveFromCart(item)),
    changeSizeOrColor: (item, changeType, selected) => dispatch(changeSizeOrColor(item, changeType, selected))
});

export default connect(null,mapDispatchToProps)(CartItem);


