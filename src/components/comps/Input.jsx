import React from 'react';
import css from '../../styles/form.css';

const { Input } = css


const InputComponent = (props) => {

    const { placeholder, action, inputValue } = props

    return (
        <React.Fragment>
            <Input
                value={ inputValue }
                type={"text"}
                placeholder={placeholder}
                maxLenght={"100"}
                onChange={event => {
                    action(event.target.value)
                }}
            />
        </React.Fragment>
    );
}

export default InputComponent