import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {popupToggle} from "../../redux/currencies/actions";
import Loader from "../../components/loader"
import { getProducts } from "../../apollo";

const Page = styled.div`
    width: 100%;
    padding-bottom: 50px;
`

const CategoryTitle = styled.h1`
    font-size: 42px;
    font-weight: 400;
    width: 100%;
    margin: 80px 0;
    text-align: left;
`

const Error = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ItemsContainer = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10vw;
    padding: 0;
    list-style-type: none;

    
    @media only screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
`


class CategoryPage extends Component {

    constructor(){
        super()

        this.state = {
            name: "",
            products: [],
            loading: true,
            error: false,
        }
    }


    getItems = async () => {
        try {
            const res = await getProducts(this.props.match.params.category);
            this.setState({name: res.category.name ,products: res.category.products, loading: false})
          }
          catch (error) {
            console.log(error.message)
            this.setState({loading: false, error: "Sorry, Can not get items right now.."})
          }
    }

    async componentDidMount(){
        this.getItems()
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.setState({loading: true, error: false})
            this.getItems()
            // wtf is bind
        }
    } 

    render(){
        
        const {loading, error, name, products } = this.state
        return(
            <Page>
                {loading &&  <Loader />}
                {!loading && error && <Error>{error}</Error>}
                {!loading && !error && 
                <>
                    <CategoryTitle>{name}</CategoryTitle>
                    <ItemsContainer length={products.length}>
                        {products.map((product) => {
                            return <Item product={product} key={product.name} >{product.name}</Item>
                        })}
                    </ItemsContainer>
                </>
                }
            </Page>
        )
    }
}

const mapStateToProps = store => ({
    cartOverlay: store.cart.overlayToggler
})

const mapDispatchToProps = dispatch => ({
    popupToggle: () => dispatch(popupToggle())
})

const CategoryWithRouter = withRouter(CategoryPage);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryWithRouter);
