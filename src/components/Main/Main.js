import React from 'react';
import './Main.scss';

const Main = ({backgroundURL, children}) => {
    return (
        <main
            className='page-main'
            style={{backgroundImage: `url("${backgroundURL}")`}}>
            {children}
        </main>
    )
};

export default Main;