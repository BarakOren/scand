import React, {Component} from "react";
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header";

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
        {/* add switch */}
      </AppContainer>
    );
  }
  
}

export default App;
