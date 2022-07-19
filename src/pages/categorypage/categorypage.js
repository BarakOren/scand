import React, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";
import { withRouter } from 'react-router-dom'
const Page = styled.div`
    width: 100%;
    height: 85vh;

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
    componentDidMount(){
        console.log(this.props);
        console.log(this.props.match.params.id);
      }

    render(){
        return(
            <Page>
                <CategoryTitle>Women</CategoryTitle>
                <ItemsContainer>
                    <Item /><Item /><Item /><Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <DummieItem />
                </ItemsContainer>
                
            </Page>
        )
    }
}

export default withRouter(CategoryPage);