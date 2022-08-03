import React, {Component} from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {AddToCart} from "../../redux/cart/actions";
// import { fetchProductInfo } from "../../fetchData"
import Loader from "../../components/loader";
import { v4 as uuidv4 } from 'uuid';
import { getProductInfo } from "../../apollo";
import {Redirect} from "react-router-dom";

const Page = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0 30px;
    padding-bottom: 30px;
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
    height: 70vh;
    width: 60%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 30%;
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
    margin-bottom: 6px;
    color: #1D1F22;
`

const OptionsContainer = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
`

const ColorOption = styled.input`
    cursor: pointer;
    height: 32px;
    width: 32px;
    background-color: ${p => p.bg};
    outline-offset: 2px;
    border: ${p => p.white ? "1px solid black" : "none"};
    -webkit-appearance: none;
    margin: 0 10px 0 0;

    &:checked {
        outline: 2px solid #5ECE7B;
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
    &:disabled {
        background: black;
        opacity: 0.3;
    }
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

class ItemPage extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            error: null,
            product: null,
            currentImage: null,
            attributes: {}
        }
    }

    async componentDidMount(){
        console.log(this.props);
        try{
            const res = await getProductInfo(this.props.match.params.id);
            if(res.product === null){
                this.props.history.push("/can-not-get-this-product")
            }
            this.setState({product: res.product, loading: false})
        }
        catch (error) {
            console.log(error.message)
            this.setState({ error: true, loading: false })
          }
    }



    render(){
        const {AddToCart, currency} = this.props;
        const {loading, error, product, currentImage} = this.state
        const currentCurrency = product ? product.prices.find(cur => cur.currency.label === currency.label) : undefined
        
        const switchImages = (currentImage) => {this.setState({ currentImage })}

        const handleChange = (e) => {
            const state = this.state.attributes
            this.setState({ attributes: Object.assign(state, {[e.target.name]: e.target.value}) })
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const uid = uuidv4();
            const productClone = structuredClone(product);
            productClone.attributes.forEach(att => {
                Object.assign(att, {selected: this.state.attributes[att.name]})
            })
            Object.assign(productClone, {uid: uid})
            AddToCart(productClone)
        }


        return(
            <Page>
                {error && <h1>sorry, we had a problem...</h1>}
                {loading && <Loader  />}
                {!loading &&
                <>
                    <ImagesContainer>
                        {product.gallery.map((image, index) => {
                            return <SmallImage key={index} onClick={() => switchImages(image)} style={{backgroundImage: `url(${image})`}} /> 
                        })}
                    </ImagesContainer>

                    <SelectedImage style={{backgroundImage: `url(${currentImage ? currentImage : product.gallery[0]})`}}>
                        {!product.inStock && <OutOfStock>Out Of Stock</OutOfStock>}
                    </SelectedImage>

                    <DetailsContainer > 
                        <ItemName>{product.brand}</ItemName>
                        <SubName>{product.name}</SubName>
                        <Form onSubmit={handleSubmit}>
                        {
                            product.attributes.map(attribute => {
                                return <>
                                <Label>{attribute.name}</Label>
                                <OptionsContainer>
                                {attribute.items.map(item => {
                                    if(attribute.type !== "swatch")
                                        return <SizeOption 
                                        onChange={handleChange}
                                        type="radio"
                                        key={item.value}
                                        required 
                                        name={attribute.name}
                                        value={item.value} 
                                        checked={this.state.attributes[attribute.name] === item.value}
                                        />
                                    else 
                                        return <ColorOption 
                                        onChange={handleChange}
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
                                </>
                            }) 
                        }
                            <Label style={{marginTop: "30px"}}>Price:</Label>
                            <Price>{currentCurrency.currency.symbol}{currentCurrency.amount}</Price>
                            <Button type="submit" disabled={!product.inStock}>{product.inStock ? "ADD TO CART" : "OUT OF STOCK"}</Button>
                    </Form>
                    <Description
                    dangerouslySetInnerHTML={{ __html: product.description}}
                    />    
                    
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
