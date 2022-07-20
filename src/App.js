import React, {Component} from "react";
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
        <Router>
          <>
          <Header />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/:category"><CategoryPage /></Route>
            <Route exact path="/:category/:id"><ItemPage /></Route>
            <Route exact path="/cart"><CartPage /></Route>
            <Route exact path="*"><Error /></Route>
          </Switch>
          </>
        </Router>
        
      </AppContainer>
    );
  }
  
}


export default App;
