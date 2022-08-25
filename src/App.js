import React, {Component} from "react";
import styled, {createGlobalStyle} from "styled-components";
import { connect } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CategoryPage from "./pages/categorypage/categorypage";
import Header from "./components/header";
import ItemPage from "./pages/itempage/itempage";
import CartPage from "./pages/cartpage/cartpage";
import Error from "./pages/error";


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
    overflow-x: hidden;
    position: ${p => p.scrollBarToggle ? "fixed" : "static"};
    width: ${p => p.scrollBarToggle ? "100%" : "unset"};
    left: ${p => p.scrollBarToggle ? "0" : "unset"};
    overflow-y: scroll;


    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


  }

`;

const AppContainer = styled.div`
  width: 85%;
  padding: 0 7.5%;

`

const CartOverlayShader = styled.div`
  display: ${p => p.display === "on" ? "block" : "none"};
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  color: #1D1F22;
  background-color: rgba(57, 55, 72, 0.22);
`

class App extends Component {

  render(){
    const { cartOverlayToggle } = this.props;

    return (
      <AppContainer >
        <GlobalStyle scrollBarToggle={cartOverlayToggle}  />
        <CartOverlayShader display={cartOverlayToggle ? "on" : ""} />
        <Router>
            <>
            <Header />
            <Switch>
              <Route exact path="/" component={(props) => <CategoryPage {...props} />}/>
              <Route exact path="/cart"><CartPage /></Route>
              <Route exact path="/category/:category" component={(props) => <CategoryPage {...props} />}/>
              <Route exact path="/category/:category/:id" render={(props) => <ItemPage {...props} />}></Route>
              <Route path="*"><Error /></Route>
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

