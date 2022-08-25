import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { connect } from "react-redux";
import {popupToggle} from "../../redux/currencies/actions";
import Spinner from "../../components/spinner"
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
    @media only screen and (max-width: 1000px) {
        margin: 50px 0;
    }
      @media only screen and (max-width: 760) {
        margin: 30px 0;
    }
    
    @media only screen and (max-width: 500px) {
        text-align: center;
    }
`

const Error = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ItemsContainer = styled.ul`
    width: 98%;
    display: grid;
    grid-template-columns: repeat(3, 250px);
    justify-content: space-between;
    grid-gap: 60px 0;
    padding: 0;
    list-style-type: none;

    @media only screen and (max-width: 1500px) {
        grid-template-columns: repeat(3, 240px);
    }

    @media only screen and (max-width: 1300px) {
        grid-template-columns: repeat(3, 240px);
    }

    @media only screen and (max-width: 1100px) {
        grid-template-columns: repeat(3, 240px);
    }

    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(3, 210px);
    }

    @media only screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 230px);
    }

    @media only screen and (max-width: 650px) {
        grid-template-columns: repeat(2, 200px);
    }

    @media only screen and (max-width: 550px) {
        grid-template-columns: repeat(2, 170px);
    }

    @media only screen and (max-width: 450px) {
        justify-content: center;
        grid-template-columns: repeat(1, 70%);
        grid-gap: 20px 0;
    }
`


class CategoryPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            products: [],
            loading: true,
            error: false,
        }
    }

    getItems = async () => {
        try {
            const res = await getProducts(this.props.match.path === "/" ? "all" : this.props.match.params.category);
            this.setState({name: res.category.name ,products: res.category.products, loading: false})
        }
          catch (error) {
            console.log(error.message)
            this.setState({loading: false, error: "Sorry, no such category"})
          }
    }

    async componentDidMount(){
        this.getItems()
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.setState({loading: true, error: false})
            this.getItems()
        }
    } 

    render(){
        const {loading, error, name, products } = this.state
        return(
            <Page>
                {loading &&  <Spinner />}
                {!loading && error && <Error>{error}</Error>}
                {!loading && !error && 
                <>
                    <CategoryTitle>{name.toUpperCase()}</CategoryTitle>
                    <ItemsContainer>
                        {products.map((product) => {
                            return <Item key={product.name} product={product}>{product.name}</Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);