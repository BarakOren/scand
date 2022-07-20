import React, {Component} from "react";
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CategoryPage from "./pages/categorypage/categorypage";
import Home from "./pages/home";
import ItemPage from "./pages/itempage/itempage";
import CartPage from "./pages/cartpage/cartpage";
import Error from "./pages/error";
import { connect } from "react-redux";

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

const Shader = styled.div`
  display: ${p => p.display === "on" ? "block" : "none"};
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0,0,0, 0.22);
`

class App extends Component {
  
  render(){
  
    const { cartOverlayToggle } = this.props;
    return (
      <AppContainer >
        <GlobalStyle />
        <Router>
          <>
          <Header />
          <Shader display={cartOverlayToggle ? "on" : "off"} />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/:category" component={(props) => <CategoryPage {...props} />}/>
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

const mapStateToProps = store => ({
    cartOverlayToggle: store.cart.overlayToggler,
})


export default connect(mapStateToProps)(App);

