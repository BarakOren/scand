import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeSizeOrColor } from "../../redux/cart/actions";

const OptionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0 5px;
`

const SizeOption = styled.button`
    font-family: Source Sans Pro;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.selected ? "white" : "#1D1F22"};
    border: 1px solid #1D1F22;
    width: ${p => p.square ? "24px" : ""};
    height: ${p => p.size === "small" ? "24px" : "24px"};
    font-size: 14px;
    background: ${p => p.selected ? "#1D1F22" : "none"};
    /* @media only screen and (max-width: 1400px) {
        width: ${p => p.size === "small" ? "26px" : "30px"};
        height: ${p => p.size === "small" ? "26px" : "30px"};
        font-size: ${p => p.size === "small" ? "8px" : "10px"};
    } */
    @media only screen and (max-width: 420px) {
        font-size: 10px;
        width: ${p => p.size === "small" ? "20px" : "22px"};
        height: ${p => p.size === "small" ? "20px" : "22px"};
        font-size: ${p => p.size === "small" ? "6px" : "10px"};
    }
`

const ColorOption = styled.button`
    cursor: pointer;
    height: 16px;
    width: 16px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
    border: ${p => p.white ? "1px solid #1D1F22" : "none"};
    outline-offset: 1px;
`

class OptionSelector extends Component {

    render(){
        const {cart, item, att, size, changeSizeOrColor} = this.props
        // getting attribute from redux 
        const selectedAtt = cart.find(
            cartItem => cartItem.id === item.id && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
        ).attributes.find(attritbute => attritbute.name === att.name)

        return(
            <OptionsContainer>
                {att.items.map((attItem) => {
                    return att.type === "text" ? 
                    <SizeOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} key={attItem.value} square={attItem.value.length <= 3} size={size} selected={attItem.value === selectedAtt.selected}>{attItem.value}</SizeOption>
                    :
                    <ColorOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} key={attItem.value} white={attItem.value === "#FFFFFF"}  bg={attItem.value} selected={attItem.value === this.props.att.selected}/>
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
