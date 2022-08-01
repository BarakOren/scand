import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {changeCurrency, closeToggle} from "../redux/currencies/actions";

const Container = styled.div`
    display: ${p => p.display === "on" ? "block" : "none"};
    width: 100px;
    padding: 6px 0;
    position: absolute;
    top: 30px;
    left: -15px;
    box-shadow: 0px 4px 35px 0px #A8ACB030;
    z-index:3;
    background: white;
`   

const Currency = styled.button`
    width: 100%;
    height: 33%;
    padding: 12px 0;
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
        // closing window if the user clicked outside of the window.
        if (this.props.currenciesToggle && this.currencyRef && !this.currencyRef.current.contains(event.target)) {
          this.props.closeToggle();
        }
      }

    render(){
        const {currency ,currenciesToggle, changeCurrency, currencies} = this.props
        return(
            <Container ref={this.currencyRef} display={currenciesToggle ? "on" : "off"} >
                {currencies.map((curr) => {
                  return <Currency key={curr.label}
                  onClick={() => changeCurrency(curr)} selected={currency.label === curr.label}
                  >{curr.symbol} {curr.label}</Currency>
                  })
                }
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    currenciesToggle: store.currencies.popupToggle,
    currency: store.currencies.currency,
    currencies: store.currencies.currencies
})


const mapDispatchToProps = dispatch => ({
    changeCurrency: (newCurrency) => dispatch(changeCurrency(newCurrency)),
    closeToggle: () => dispatch(closeToggle())
});
  
export default connect(mapStateToProps,mapDispatchToProps)(CurrencyToggler);