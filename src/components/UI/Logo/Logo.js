import React, {useState} from 'react';
import './Logo.scss';
import classNames from 'classnames';

const Logo = ({className, mainLogoURL, smallScreenLogoURL}) => {

    const [currentDeviceWidth, setDeviceWidth] = useState(window.innerWidth);

    window.addEventListener('resize', () => {
        setDeviceWidth(window.innerWidth);
    });

    return (
        <img
            className={classNames('logo', className)}
            src={currentDeviceWidth >= 1024 ? mainLogoURL : smallScreenLogoURL || mainLogoURL}
            alt='logo'
        />
    )

};

export default Logo;