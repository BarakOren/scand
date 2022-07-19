import react, {Component} from "react";
import styled from "styled-components";
import Item from "./components/item";

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

    &:after {
    content: "";
    flex: auto;
  }
`



class CategoryPage extends Component {


    render(){
        return(
            <Page>
                <CategoryTitle>Women</CategoryTitle>
                <ItemsContainer>
                    <Item /><Item /><Item /><Item />
                    <Item /><Item /><Item /><Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </ItemsContainer>
                
            </Page>
        )
    }
}

export default CategoryPage;