import React, {Component, createRef} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {changeCurrency, closeToggle, setCurrencies} from "../redux/currencies/actions";
import {getCurrencies} from "../apollo"
import { rotate } from "./spinner";

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

const MiniSpinner = styled.span`
    display: inline-block;
    transform: translate(50%,-50%);
    width: 15px;
    height: 15px;
    border: 3px solid #1D1F22;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: ${rotate} 1s linear infinite;
`

class CurrencyToggler extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          loading: true
        }
        this.currencyRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      async componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        try {
          const res = await getCurrencies();
          this.props.setCurrencies(res.currencies)
          this.setState({loading: false});
        } catch (error) {
          console.log(error.message);
          this.setState({error: true, loading: false})
        }
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
        const {loading, error} = this.state;
        
        return(
            <Container ref={this.currencyRef} display={currenciesToggle ? "on" : "off"} >
                {loading && <MiniSpinner />}
                {!loading && !error && currencies.map((curr) => {
                  return <Currency key={curr.label} selected={currency.label === curr.label}
                  onClick={() => changeCurrency(curr)}>{curr.symbol} {curr.label}</Currency>
                })}
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
    closeToggle: () => dispatch(closeToggle()),
    setCurrencies: (data) => dispatch(setCurrencies(data))
});
  
export default connect(mapStateToProps,mapDispatchToProps)(CurrencyToggler);