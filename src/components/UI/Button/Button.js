import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({className, imageURL, text, onClick}) => {
    return (
        <button
            className={classNames('button', className)}
            type='button'
            onClick={onClick}>
            {imageURL ?
                <img
                    className='button__image'
                    src={imageURL}
                    alt=''
                /> : text}
        </button>
    )
};

export default Button;