import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {changeCurrency, closeToggle} from "../redux/currencies/actions";

const Container = styled.div`
    display: ${p => p.display === "on" ? "block" : "none"};
    height: 130px;
    width: 100px;
    padding: 6px 0;
    position: absolute;
    top: 30px;
    left: -15px;
    box-shadow: 0px 4px 35px 0px #A8ACB030;
    z-index: 1;
`   

const Currency = styled.button`
    width: 100%;
    height: 33%;
    background: ${p => p.selected ? "#EEEEEE" : "none"};
    border: none;
    cursor: pointer;
`

class CurrencyToggler extends Component {


    constructor(props) {
        super(props);
    
        this.currencyRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

      handleClickOutside(event) {
        if (this.currencyRef && !this.currencyRef.current.contains(event.target)) {
          this.props.closeToggle();
        }
      }

    render(){
        const {currency ,currenciesToggle, changeCurrency} = this.props 
        return(
            <Container ref={this.currencyRef} display={currenciesToggle ? "on" : "off"} >
                <Currency onClick={() => changeCurrency('USD')} selected={currency === 'USD'}>&#x24; USD</Currency>
                <Currency onClick={() => changeCurrency('EUR')} selected={currency === 'EUR'} >&#x20AC; EUR</Currency>
                <Currency onClick={() => changeCurrency('JPY')} selected={currency === 'JPY'}>&#xa5; JPY</Currency>
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    currenciesToggle: store.currencies.popupToggle,
    currency: store.currencies.currency
})


const mapDispatchToProps = dispatch => ({
    changeCurrency: (newCurrency) => dispatch(changeCurrency(newCurrency)),
    closeToggle: () => dispatch(closeToggle())
});
  
export default connect(mapStateToProps,mapDispatchToProps)(CurrencyToggler);