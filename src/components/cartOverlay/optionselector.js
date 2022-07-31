import React, {Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeSizeOrColor } from "../../redux/cart/actions";

const OptionsContainer = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 5px;
`


const SizeOption = styled.button`
    width: 30px;
    height: 30px;
    font-family: Source Sans Pro;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    border: 1px solid #1D1F22;
    background: ${p => p.selected ? "#1D1F22" : "none"};
    color: ${p => p.selected ? "white" : "#1D1F22"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`


const ColorOption = styled.button`
    cursor: pointer;
    height: 15px;
    width: 15px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
    outline-offset: 1px;
    border: none;
`

class OptionSelector extends Component {

    render(){
        const {cart, item, att, changeSizeOrColor} = this.props
        // getting attribute from redux 
        const selectedAtt = cart.find(
            cartItem => cartItem.id === item.id && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
        ).attributes.find(attritbute => attritbute.name === att.name)

        return(
            <OptionsContainer>
                {att.items.map((attItem) => {
                    return att.type === "text" ? 
                    <SizeOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} key={attItem.value} selected={attItem.value === selectedAtt.selected}>{attItem.value}</SizeOption>
                    :
                    <ColorOption onClick={() => changeSizeOrColor(item, att.name, attItem.value)} key={attItem.value} bg={attItem.value} selected={attItem.value === this.props.att.selected}/>
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
