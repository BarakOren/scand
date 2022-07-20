import React, {Component} from "react";
import styled from "styled-components";

const Container = styled.div`
    display: ${p => p.display ? "block" : "none"};
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
    background: none;
    border: none;
    /* #EEEEEE selected */
`

class CurrencyToggler extends Component {

    // constructor(props) {
    //     super(props);
    
    //     this.wrapperRef = React.createRef();
    //     this.handleClickOutside = this.handleClickOutside.bind(this);
    //   }
    
    //   componentDidMount() {
    //     document.addEventListener("mousedown", this.handleClickOutside);
    //   }
    
    //   componentWillUnmount() {
    //     document.removeEventListener("mousedown", this.handleClickOutside);
    //   }
  
    //   handleClickOutside(event) {
    //     if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
    //       this.props.toggleOutsideClick(this.props.currenciesKey)
    //     }
    //   }

    render(){
        return(
            <Container ref={this.wrapperRef} display={this.props.state} >
                <Currency>&#x24; USD</Currency>
                <Currency style={{background: "#EEEEEE"}}>&#x20AC; EUR</Currency>
                <Currency>&#xa5; JPY</Currency>
            </Container>
        )
    }
}

export default CurrencyToggler;