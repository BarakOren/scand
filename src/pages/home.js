import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import {fetchCategories} from "../fetchData"
import Loader from "../components/loader";

const Page = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const Welcome = styled.h1`
    font-size: 5em;
    @media only screen and (max-width: 600px) {
        font-size: 4em;
        margin-top: 60px;
    }
    @media only screen and (max-width: 400px) {
        font-size: 3.5em;
    }
`

const Nav = styled.nav`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 900px) {
        width: 90%;
    }

    @media only screen and (max-width: 400px) {
        flex-direction: column;
        gap: 50px 0;
        height: unset;
    }
`

const A = styled(Link)`
    font-size: 3em;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33%;
    color: black;
    text-decoration: none;
    transition: .3s all;

    &:hover {
        color: #5ECE7B;
        text-shadow: 0 0 10px #5ECE7B;
    }
    @media only screen and (max-width: 700px) {
        font-size: 3em;
    }
    @media only screen and (max-width: 600px) {
        font-size: 2.5em;
    }
`

class Home extends Component {

    render(){
        const {loading, categories, error} = this.props
        return(
            <Page>
                <Welcome>Welcome</Welcome>
                {loading && <Loader />}
                {!loading && 
                    <Nav>
                        {categories.map((category) => {
                            return <A key={category.name + "link"} to={`/category/${category.name}`}>{category.name}</A>
                        })}
                    </Nav>
                }
                {error && !loading && <h1>sorry, we got a problem...</h1>}
            </Page>
        )
    }
}

export default Home;