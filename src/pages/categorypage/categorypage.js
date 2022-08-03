import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {popupToggle} from "../../redux/currencies/actions";
// import {fetchProducts} from "../../fetchData"
import Loader from "../../components/loader"
import { getProducts } from "../../apollo";

const Page = styled.div`
    width: 100%;
    padding-bottom: 50px;
`

const CategoryTitle = styled.h1`
    font-size: 42px;
    font-weight: 200;
    width: 100%;
    text-align: left;
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
            this.setState({loading: false, error: true})
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
        
        // const param = this.props.match.params.category
        const {loading} = this.state
        const {name, products, error} = this.state
        return(
            <Page>
                {loading &&  <Loader  />}
                {!loading && 
                <>
                    <CategoryTitle>{name}</CategoryTitle>
                    <ItemsContainer length={products.length}>
                    {products.map((product) => {
                        return <Item product={product} key={product.name} >{product.name}</Item>
                    })}
                    </ItemsContainer>
                </>
                }
                
                {error && !loading && <h1>sorry, we got a problem...</h1>}
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
