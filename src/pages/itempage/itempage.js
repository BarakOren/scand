import React, {Component} from "react";
import styled from "styled-components";
import { fakedata } from "../../fakedata";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {AddToCart} from "../../redux/cart/actions";

const Page = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0 30px;
`

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 150px;
    gap: 15px 0;
`

const SmallImage = styled.button`
    background: none;
    border: none;
    width: 150px;
    height: 150px;
    background-position: center;
    background-size: cover;
    cursor: pointer;
    @media only screen and (max-width: 1000px) {
        width: 120px;
        height: 120px;
    }
`

const SelectedImage = styled.div`
    height: 500px;
    width: 650px;
    background-position: center;
    background-size: cover;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 300px;
    margin-right: 50px;
    @media only screen and (max-width: 1000px) {
        margin-right: unset;
    }
`

const ItemName = styled.h1`
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    margin: 0;
`   

const SubName = styled.h1`
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    margin: 10px 0;
` 


const Label = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin: 6px 0;
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
    margin: 0;
    font-size: 24px;
    font-weight: 700;
`

const Button = styled.button`
    border: none;
    width: 100%;
    height: 52px;
    color: white;
    background: #5ECE7B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 30px;
`

const Description = styled.p`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    margin-top: 30px;
    line-height: 26px;
`

class ItemPage extends Component {

    render(){
        const {id, category} = this.props.match.params
        const {AddToCart} = this.props;
        const data = fakedata[category].reduce(item => id === item.id)

        return(
            <Page>
                <ImagesContainer>
                    <SmallImage style={{backgroundImage: `url(${data.imageUrl})`}} />
                    <SmallImage style={{backgroundImage: `url(${data.imageUrl})`}} />
                    <SmallImage style={{backgroundImage: `url(${data.imageUrl})`}} />
                </ImagesContainer>
                <SelectedImage style={{backgroundImage: `url(${data.imageUrl})`}} />
                <DetailsContainer>
                    <ItemName>{data.name}</ItemName>
                    <SubName>Running Short</SubName>

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
                   
                    <Label style={{marginTop: "30px"}}>Price:</Label>
                    <Price>${data.price}</Price>

                    <Button onClick={() => AddToCart(data)}>ADD TO CART</Button>

                    <Description>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</Description>

                </DetailsContainer>

            </Page>
        )
    }
}

const mapStateToProps = store => ({
    // cartOverlayToggle: store.cart.overlayToggler,
    // currenciesToggle: store.currencies.popupToggle
})

const mapDispatchToProps = dispatch => ({
    AddToCart: (item) => dispatch(AddToCart(item))
});
  

const ItemPageWithRouter = withRouter(ItemPage);
export default connect(mapStateToProps, mapDispatchToProps)(ItemPageWithRouter);
