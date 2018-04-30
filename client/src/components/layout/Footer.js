import React, { Component } from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; { new Date().getFullYear() } Developers Connector
        </footer>
    )
}
export default Footer;