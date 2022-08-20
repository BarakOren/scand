import React, {Component} from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {AddToCart} from "../../redux/cart/actions";
import Spinner from "../../components/spinner";
import { v4 as uuidv4 } from 'uuid';
import { getProductInfo } from "../../apollo";
import parse from 'html-react-parser';

const Page = styled.div`
    width: 100%;
    height: 80vh;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0 30px;
    /* padding-bottom: 30px; */
    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const ImagesContainer = styled.div`
    width: 190px;
    height: 100%;
    overflow-y: ${p => p.showScrollBar === "true" ? "scroll" : "hidden"};
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    @media only screen and (max-width: 600px) {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 80px);
        grid-auto-rows: 80px;
    }
    @media only screen and (max-width: 500px) {
        grid-template-columns: repeat(4, 80px);
    }
    @media only screen and (max-width: 400px) {
        grid-template-columns: repeat(3, 80px);
    }
`

const SmallImage = styled.button`
    border: none;
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
    background-position: center;
    background-size: cover;
    cursor: pointer;
    @media only screen and (max-width: 1000px) {
        width: 120px;
        height: 120px;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        height: 100%;
    }
`

const SelectedImage = styled.div`
    height: 100%;
    width: 50%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    @media only screen and (max-width: 600px) {
        margin: 30px 0;
        width: 100%;
        height: 400px;
    }
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    width: 300px;
    @media only screen and (max-width: 1000px) {
        width: 35%;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        text-align: center;
        align-items: center;
    }
`

const ItemName = styled.h1`
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    margin: 0;
    @media only screen and (max-width: 1000px) {
        font-size: 22px;
    }
`   

const SubName = styled.h1`
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    margin: 10px 0;
    @media only screen and (max-width: 1000px) {
        font-size: 22px;
    }
` 


const Label = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #1D1F22;
    @media only screen and (max-width: 1000px) {
        font-size: 16px;
    }
`

const OptionsContainer = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media only screen and (max-width: 600px) {
        justify-content: center;
    }
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
    margin: 0 10px 0 0;

    &:after {
        content: "${p => p.value}";
        font-size: 16px;
    }

    &:checked {
        background: #1D1F22;
        color: white;
    }

    @media only screen and (max-width: 1000px) {
        width: 56px;
        height: 40px;
        &:after {
            font-size: 14px;
        }
    }
`

const ColorOption = styled.input`
    cursor: pointer;
    height: 32px;
    width: 32px;
    background-color: ${p => p.bg};
    outline-offset: 2px;
    border: ${p => p.white ? "1px solid #1D1F22" : "none"};
    -webkit-appearance: none;
    margin: 0 10px 0 0;

    &:checked {
        outline: 2px solid #5ECE7B;
    }
    
    @media only screen and (max-width: 1000px) {
        height: 28px;
        width: 28px;
    }
`

const Price = styled.p`
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    margin: 0 6px 0 0;
    @media only screen and (max-width: 1000px) {
        font-size: 20px;
    }
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
    &:disabled {
        background: #1D1F22;
        opacity: 0.3;
    }
`

const Description = styled.div`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    margin-top: 30px;
    line-height: 30px;
`

const Form = styled.form`
    width: 100%;
`

const OutOfStock = styled.p`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: Raleway;
    font-size: 30px;
    font-weight: 400;
    letter-spacing: 0px;
    color: #8D8F9A;
`

const Error = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

class ItemPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error: null,
            product: null,
            currentImage: null,
            attributes: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 


    async componentDidMount(){
        try{
            const res = await getProductInfo(this.props.match.params.id);
            if(res.product === null){
                this.setState({ error: "Sorry, We cant get the item right now..", loading: false })
                return;
            }
            this.setState({loading: false, product: res.product })
        }
        catch (error) {
            console.log(error.message)
            this.setState({ error: "Sorry, We cant get the item right now..", loading: false })
          }
    }


    switchImages = (currentImage) => { this.setState({ currentImage }) }

    handleChange = (e) => {
        // using form, so handleChange runs only when you change attribute.
        // no need to check if the user is selecting the same attribute again.
        this.setState({ 
            attributes: {...this.state.attributes, [e.target.name]: e.target.value },
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const attributes = this.state.product.attributes.map(att => {
            return {...att, selected: this.state.attributes[att.name]}
        })
        const productClone = {...this.state.product, attributes: attributes, uid: uuidv4()}
        this.props.AddToCart(productClone)
    }


    render(){
        const {currency} = this.props;
        const {loading, error, product, currentImage} = this.state
        const currentCurrency = product ? product.prices.find(cur => cur.currency.label === currency.label) : undefined
        
        return(
            <Page>
                {error && !loading && <Error>{error}</Error>}
                {loading && <Spinner  />}
                {!loading && !error &&
                <>
                    <ImagesContainer showScrollBar={`${product.gallery.length > 4}`}>
                        {product.gallery.map((image) => {
                            return <SmallImage key={image} onClick={() => this.switchImages(image)} style={{backgroundImage: `url(${image})`}} /> 
                        })}
                    </ImagesContainer>
                    <SelectedImage style={{backgroundImage: `url(${currentImage ? currentImage : product.gallery[0]})`}}>
                        {!product.inStock && <OutOfStock>Out Of Stock</OutOfStock>}
                    </SelectedImage>

                    <DetailsContainer> 
                        <ItemName>{product.brand}</ItemName>
                        <SubName>{product.name}</SubName>
                        <Form onSubmit={this.handleSubmit}>
                        {
                            product.attributes.map((attribute,index) => {
                                return <div key={index}>
                                <Label>{attribute.name}:</Label>
                                <OptionsContainer>
                                {attribute.items.map(item => {
                                    if(attribute.type !== "swatch")
                                        return <SizeOption 
                                        onChange={this.handleChange}
                                        type="radio"
                                        key={item.value}
                                        required 
                                        name={attribute.name}
                                        value={item.value} 
                                        checked={this.state.attributes[attribute.name] === item.value}
                                        />
                                    else 
                                        return <ColorOption 
                                        onChange={this.handleChange}
                                        type="radio"
                                        key={item.value}
                                        bg={item.value}
                                        required 
                                        name={attribute.name}
                                        value={item.value} 
                                        checked={this.state.attributes[attribute.name] === item.value}
                                        white={item.value === "#FFFFFF"}
                                        /> 
                                })}
                                </OptionsContainer>
                                </div>
                            }) 
                        }
                            <Label style={{marginTop: "30px"}}>Price:</Label>
                            <Price>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
                            <Button type="submit" disabled={!product.inStock}>{product.inStock ? "ADD TO CART" : "OUT OF STOCK"}</Button>
                    </Form>
                    <Description>{parse(product.description)}</Description>    
                    
                </DetailsContainer>
                </>
                }
            </Page>
        )
    }
}

const mapStateToProps = store => ({
    currency: store.currencies.currency
})

const mapDispatchToProps = dispatch => ({
    AddToCart: (item) => dispatch(AddToCart(item))
});
  

const ItemPageWithRouter = withRouter(ItemPage);
export default connect(mapStateToProps, mapDispatchToProps)(ItemPageWithRouter);
