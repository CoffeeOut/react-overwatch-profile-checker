import React from 'react';
import './NavList.scss';
import classNames from 'classnames';

const NavList = ({className, elementNames, setSelectedPage}) => {
    return (
        <ul className={classNames('nav-list', className)}>
            {elementNames.map((elementName, i) =>
                <li
                    className='nav-list__element'
                    onClick={() => setSelectedPage(i)}
                    key={i}>{elementName}
                </li>
            )}
        </ul>
    )
};

export default NavList;