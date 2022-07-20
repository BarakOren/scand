import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
import {fakedata} from "../../fakedata";


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

    render(){
        const param = this.props.match.params.category
        return(
            <Page>
                <CategoryTitle>{param}</CategoryTitle>
                <ItemsContainer>
                    {fakedata[param].map((item, index) => {
                        return <Item item={item} key={index} category={param}/>
                    })}
                    {fakedata[param].length % 3 !== 0 && <DummieItem />}
                </ItemsContainer>
            </Page>
        )
    }
}

export default withRouter(CategoryPage);