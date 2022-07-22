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
    color: #1D1F22;
`

const OptionsContainer = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
   
`

const SizeOption = styled.input`
    width: 63px;
    height: 45px;
    font-family: Source Sans Pro;
    font-weight: 400;
    text-align: center;
    border: 1px solid #1D1F22;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-appearance: none;
    margin: 0;

    &:after {
        content: "${p => p.value}";
        font-size: 16px;
    }

    &:checked {
        background: #1D1F22;
        color: white;
    }
`


const ColorOption = styled.input`
    cursor: pointer;
    height: 32px;
    width: 32px;
    background-color: ${p => p.bg};
    outline-offset: 1px;
    border: none;
    -webkit-appearance: none;

    &:checked {
        outline: 1px solid #5ECE7B;
    }
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

const Form = styled.form`
    width: 100%;
    text-align: left;

`

class ItemPage extends Component {

    constructor() {
        super()
        this.state = {
          currentImage: null,
          size: '',
          color: ''
        }
    }



    render(){
        const {id, category} = this.props.match.params
        const {AddToCart} = this.props;
        const {currentImage} = this.state
        const data = fakedata[category].reduce(item => id === item.id)
  
        const switchImages = (currentImage) => {this.setState({ currentImage })}
        
        const handleSizeChange = (e) => {
            this.setState({size: e.target.value})
        }

           
        const handleColorChange = (e) => {
            this.setState({color: e.target.value})
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            AddToCart(data)
        }

        return(
            <Page>
                <ImagesContainer>
                    {data.images.map((image, index) => {
                        return <SmallImage key={index} onClick={() => switchImages(image)} style={{backgroundImage: `url(${image})`}} /> 
                    })}
                  
                </ImagesContainer>
                <SelectedImage style={{backgroundImage: `url(${currentImage ? currentImage : data.images[0]})`}} />
                <DetailsContainer>
                    <ItemName>{data.name}</ItemName>
                    <SubName>Running Short</SubName>

                    <Form onSubmit={handleSubmit}>
                        <Label>Size:</Label>
                        <OptionsContainer onChange={handleSizeChange}>
                            {data.sizes.map((size) => {
                                return <SizeOption 
                                type="radio"
                                key={size}
                                value={size} 
                                checked={this.state.size === size}
                                ></SizeOption>
                            })}
                        </OptionsContainer>

                        <Label>Color:</Label>
                        <OptionsContainer onChange={handleColorChange} style={{justifyContent: "flex-start"}}>
                            {data.colors.map((color) => {
                                return <ColorOption 
                                key={color} 
                                bg={color}
                                type="radio"
                                value={color} 
                                checked={this.state.color === color}
                                />
                            })}
                        </OptionsContainer>
                   
                        <Label style={{marginTop: "30px"}}>Price:</Label>
                        <Price>${data.price}</Price>

                        <Button type="submit">ADD TO CART</Button>
                    </Form>
                    
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
