import React, {Component} from "react";
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header";
import {Routes,Route} from "react-router-dom";
import CategoryPage from "./pages/categorypage/categorypage";
import Home from "./pages/home";
import ItemPage from "./pages/itempage/itempage";
import CartPage from "./pages/cartpage/cartpage";
import Error from "./pages/error";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  width: 90%;
  padding: 0 5%;
`




class App extends Component {
  
  render(){
    return (
      <AppContainer >
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<CategoryPage />} />
          <Route path="/itempage" element={<ItemPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
        {/* add switch */}
      </AppContainer>
    );
  }
  
}

export default App;
