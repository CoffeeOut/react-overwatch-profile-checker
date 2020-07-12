import React, { useRef, useEffect } from 'react';
import './SideMenu.scss';
import classNames from 'classnames';

const SideMenu = ({className, elementNames, setSelectedPage, activeElement, closeSideMenu}) => {

    const sideMenuRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', handleClickOutsideSideMenu);
        return () => { window.removeEventListener('click', handleClickOutsideSideMenu)};
    }, []);

    function handleClickOutsideSideMenu(e) {
        if(!sideMenuRef.current.contains(e.target)) {
            closeSideMenu();
        }
    }

    return (
        <div className={classNames('side-menu', className)} ref={sideMenuRef}>
            {elementNames.map((elementName, i) =>
                <div
                    className={classNames('side-menu__element', activeElement === i && 'side-menu__element_active')}
                    onClick={() => setSelectedPage(i)}
                    key={i}>{elementName}
                </div>
            )}
        </div>
    )
};

export default SideMenu;