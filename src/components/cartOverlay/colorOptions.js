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

const ColorOption = styled.button`
    cursor: pointer;
    height: 15px;
    width: 15px;
    background-color: ${p => p.bg};
    outline: ${p => p.selected ? "1px solid #5ECE7B" : "none"} ;
    outline-offset: 1px;
    border: none;
`

class ColorOptions extends Component {
    

    render(){
        const {cart, item, colors, changeSizeOrColor} = this.props;
        const selectedItem = cart.find((cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)
        return(
            <OptionsContainer >
                {colors.map((colorOption) => {
                    return <ColorOption onClick={() => changeSizeOrColor(item, "color", colorOption)} 
                    key={colorOption} bg={colorOption} selected={colorOption === selectedItem.color}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ColorOptions);
