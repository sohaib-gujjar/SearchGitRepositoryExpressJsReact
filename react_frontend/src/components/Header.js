import React, { Component } from 'react';
import logo from '../logo.svg';

/**
 * Header class
 * Show logo, app name and menu
 */
export default class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <a href="/" className="App-header" style={{ color: "white", textDecoration: "none", display: "flex", flexFlow: "row" }}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>ExpressJS Example</h1>
                </a>
                <div className="App-menu">
                    <a
                        className="App-link"
                        href="/"
                        rel="noopener noreferrer"
                    >
                        Home
                </a>
                    <a
                        className="App-link"
                        href="/bookmarked"
                        rel="noopener noreferrer"
                    >
                        Bookmarked Repositories
                </a>
                </div>
            </header>
        )
    }
}