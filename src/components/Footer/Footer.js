import React from 'react';
import './Footer.scss';

const Footer = ({children}) => {
  return (
      <footer className='page-footer'>
          {children}
      </footer>
  )
};

export default Footer;