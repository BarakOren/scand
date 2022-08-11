import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeSizeOrColor } from "../../redux/cart/actions";

const OptionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 5px;
    @media only screen and (max-width: 420px) {
        justify-content: center;
    }
`


const SizeOption = styled.button`
    width: ${p => p.size >= 3 ? "43px" : "63px"};
    height: ${p => p.size >= 3 ? "30px" : "45px"};
    font-family: Source Sans Pro;
    font-size: ${p => p.size >= 3 ? "13px" : "16px"};
    font-weight: 400;
    text-align: center;
    border: 1px solid #1D1F22;
    background: ${p => p.selected ? "#1D1F22" : "none"};
    color: ${p => p.selected ? "white" : "#1D1F22"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media only screen and (max-width: 700px) {
        width: ${p => p.size >= 3 ? "43px" : "50px"};
        height: ${p => p.size >= 3 ? "30px" : "35px"};
        font-size: ${p => p.size >= 3 ? "11px" : "14px"};
    }  
    @media only screen and (max-width: 700px) {
        width: ${p => p.size >= 3 ? "43px" : "35px"};
        height: ${p => p.size >= 3 ? "30px" : "29px"};
    }  
  
`

const ColorOption = styled.button`
    cursor: pointer;
    height: 30px;
    width: 30px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
    outline-offset: 1px;
    border: ${p => p.white ? "1px solid black" : "none"};
    @media only screen and (max-width: 420px) {
        height: 24px;
        width: 24px;
    }  
`

class OptionSelector extends Component {

    render(){
        const {cart, item, att, changeSizeOrColor, length} = this.props
        // getting attribute from redux 
        const selectedAtt = cart.find(
            cartItem => cartItem.id === item.id && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
        ).attributes.find(attritbute => attritbute.name === att.name)

        return(
            <OptionsContainer>
                {att.items.map((attItem) => {
                    return att.type === "text" ? 
                    <SizeOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} size={length} key={attItem.value} selected={attItem.value === selectedAtt.selected}>{attItem.value}</SizeOption>
                    :
                    <ColorOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} key={attItem.value} bg={attItem.value} selected={attItem.value === this.props.att.selected} white={attItem.value === "#FFFFFF"}/>
                })}
            </OptionsContainer>
        )
    }
}

const mapStateToProps = store => ({
    cart: store.cart.cart,
})

const mapDispatchToProps = dispatch => ({
    changeSizeOrColor: (item, changeType, selected) => dispatch(changeSizeOrColor(item, changeType, selected))
});

export default connect(mapStateToProps,mapDispatchToProps)(OptionSelector);
