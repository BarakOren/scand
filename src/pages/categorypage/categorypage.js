import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
import {fakedata} from "../../fakedata";
import { connect } from "react-redux";
import {popupToggle} from "../../redux/currencies/actions";
import {fetchProducts} from "../../fetchData"

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

const ItemsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 100px;

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

    componentDidMount(){
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

    render(){
        
        const param = this.props.match.params.category
        const {loading} = this.state
        const {name, products, error} = this.state
        return(
            <Page>
                {loading && <h1>loading...</h1>}
                {!loading && 
                <>
                    <CategoryTitle>{name}</CategoryTitle>
                    <ItemsContainer>
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
