import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {popupToggle} from "../../redux/currencies/actions";
import {fetchProducts} from "../../fetchData"
import Loader from "../../components/loader"

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
    display: flex;
    align-items: center;
    justify-content: ${p => p.length > 3 ? "space-between" : "flex-start"};
    flex-wrap: wrap;
    gap: 3vw;
    padding: 0;
    list-style-type: none;

  @media only screen and (max-width: 1000px) {
        justify-content: space-evenly;
        gap: 30px 0;
  }
`

const DummieItem = styled.div`
    /* to keep all items on the left. */
    height: 25vw;
    width: 20vw;
    padding: 16px;

    @media only screen and (max-width: 1000px) {
        height: 33vw;
        width: 28vw;
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

    getItems = () => {
        fetchProducts(this.props.match.params.category)
        .then(fetchedItems => {
            this.setState({
                name: fetchedItems.data.category.name,
                products: fetchedItems.data.category.products,
                loading: false,
            })
        })
        .catch((err) => this.setState({ loading: false, error: err.message }));
    }

    componentDidMount(){
        this.getItems()
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.getItems()
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
