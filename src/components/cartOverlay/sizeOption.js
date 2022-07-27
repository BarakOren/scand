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
    width: 24px;
    height: 24px;
    font-family: Source Sans Pro;
    font-size: 14px;
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


class SizeOptions extends Component {
    
    render(){
        const {cart, item, sizes, changeSizeOrColor} = this.props;
        const selectedItem = cart.find((cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)
        return(
            <OptionsContainer >
                    {sizes.map((sizeOption) => {
                            return <SizeOption onClick={() => {changeSizeOrColor(item, "size", sizeOption); this.forceUpdate()}}  
                            key={sizeOption} selected={sizeOption === selectedItem.size}>{sizeOption}</SizeOption>
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

export default connect(mapStateToProps,mapDispatchToProps)(SizeOptions);
