import React from 'react';
import { Link } from 'react-router-dom';
import {FiSearch, FiBell, FiMail, FiSettings} from 'react-icons/fi'
import {GoHome} from 'react-icons/go'
import NF from './notifiyer'


// Copyright &copy; { new Date().getFullYear() } Developers Connector
const Footer = () => {
    return (
        <footer className="footer" >
          <div className='navbar-holder'>
            <ul className="nav " >
              <li> <Link to="/notifications" className="header-brand nf-icons"><FiBell className="icons-x" /><NF/></Link></li>
              <div className='v-spacer'/>
              <li className=""><Link to="/search"  className="header-brand"><FiSearch className="icons-x" /></Link></li>
              <div className='v-spacer'/>
              <li className="link-class"><Link to="/feed"  className="header-brand"><div className="home-icon"><GoHome className="selectedicon" /></div></Link></li>
              <div className='v-spacer'/>
              <li className=""><Link to = '/message'  className="header-brand"><FiMail  className="icons-x"/></Link></li>
              <div className='v-spacer'/>
              <li className=""><Link to = '/settings'  className="header-brand"><FiSettings  className="icons-x"/></Link></li>
            </ul>
          </div>
        </footer>
    )
}

export default Footer;
