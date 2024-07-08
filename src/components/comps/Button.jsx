import React from 'react';

const buttonCSS = {
    display: 'block',
    padding: '10px 14px 12px',
    borderRadius: '6px',
    backgroundColor: '#B0F347',
    cursor: 'pointer',
    marginLeft: '10px'
}

const Button = (props) => {

    const { children, onClick } = props

    return (
        <button style={buttonCSS} onClick={onClick}>{ children }</button>
    )
}

export default Button