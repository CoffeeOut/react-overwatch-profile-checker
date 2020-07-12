import React, {useState} from 'react';
import './Search.scss';
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import classNames from 'classnames';

const Search = ({className, placeholder, onSearch, children}) => {

    const [inputValue, setInputValue] = useState(null);

    return (
        <div className={classNames('search', className)}>
            <TextInput
                className='search__input'
                placeholder={placeholder}
                onChange={setInputValue}
            />
            <Button
                className='search__button'
                imageURL='https://tinyurl.com/yc9bsx8s'
                onClick={() => onSearch(inputValue)}
            />
            {children}
        </div>
    )
};

export default Search;