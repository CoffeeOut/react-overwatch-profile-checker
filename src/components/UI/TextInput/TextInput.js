import React from 'react';
import './TextInput.scss';
import classNames from 'classnames';

const TextInput = ({className, placeholder, onChange}) => {
    return (
        <input
            className={classNames('text-input', className)}
            type='text'
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
        />
    )
};

export default TextInput;