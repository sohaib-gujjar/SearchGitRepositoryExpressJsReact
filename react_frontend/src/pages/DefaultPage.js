import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from './Footer';
import Search from './Search';

/**
 * Main page to search and display repositories.
 */
export default class DefaultPage extends Component
{
    render() {
        console.log('DefaultPage...');
        return(            
            <React.Fragment>
                <Header/>
                <Search></Search>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}