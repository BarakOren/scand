import React, {Component, createRef} from "react";
import styled, {createGlobalStyle} from "styled-components";
import { connect } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { getCategories } from "./apollo"
import CategoryPage from "./pages/categorypage/categorypage";
import Header from "./components/header";
import Home from "./pages/home";
import ItemPage from "./pages/itempage/itempage";
import CartPage from "./pages/cartpage/cartpage";
import Error from "./pages/error";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
    overflow-x: hidden;
    overflow-y: ${p => p.scrollBarToggle ? "hidden" : "auto"};
    padding-right: ${p => p.scrollBarToggle && p.pageBiggerThanWindow ? "17px" : "0"};
    background-color: ${p => p.pageBiggerThanWindow ? "red" : "blue"};
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

  constructor(){
    super();

    this.state = {
        loading: true,
        categories: [],
        error: null,
        pageBiggerThanWindow: null
    }
    this.check = this.check.bind(this);

  }
  
  check() {
    console.log("start")
    const res = window.innerHeight < document.body.clientHeight
    // true = scroll is on
    if(this.state.pageBiggerThanWindow !== res){
      this.setState({pageBiggerThanWindow: res})
      console.log("changed", this.state.pageBiggerThanWindow)
    }
  }

  async componentDidMount(){
    this.setState({pageBiggerThanWindow: window.innerHeight < document.body.clientHeight})
    window.addEventListener("resize", this.check);
    const resizeObserver = new ResizeObserver(entries => {
      console.log('Body height changed:', entries[0].target.clientHeight)
      if((window.innerHeight < entries[0].target.clientHeight) !== this.state.pageBiggerThanWindow){
        this.setState({pageBiggerThanWindow: window.innerHeight < entries[0].target.clientHeight})
      }
    }
    )
    resizeObserver.observe(document.body)


      try {
        const res = await getCategories();
        this.setState({categories: res.categories, loading: false})
      }
      catch (error) {
        console.log(error.message)
        this.setState({loading: false, error: true})
      }
  }


  

  render(){
    const { cartOverlayToggle } = this.props;
    const { loading, categories, error } = this.state

    return (
      <AppContainer ref={this.resizeElement} >
        <GlobalStyle pageBiggerThanWindow={this.state.pageBiggerThanWindow} scrollBarToggle={cartOverlayToggle}  />
        <Router>
            <>
            <Header  loading={loading} categories={categories}/>
            <Switch>
              <Route exact path="/"><Home error={error} loading={loading} categories={categories}/></Route>
              <Route exact path="/cart"><CartPage /></Route>
              <Route exact path="/category/:category" component={(props) => <CategoryPage {...props} />}/>
              <Route exact path="/category/:category/:id" render={(props) => <ItemPage {...props} />}></Route>
              <Route ><Error /></Route>
            </Switch>
            </>
        </Router>
        <CartOverlayShader display={cartOverlayToggle ? "on" : "off"} />
      </AppContainer>
    );
  }
  
}

const mapStateToProps = store => ({
    cartOverlayToggle: store.cart.overlayToggler,
})

export default connect(mapStateToProps)(App);

