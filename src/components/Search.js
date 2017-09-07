import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Input, ProgressBar } from 'react-materialize'
import Book from './Book'


export default class Search extends Component {


    /**
     * render searched books and check if any of these books are currently in a shelf or not.
     * 
     * @returns Book Component
     * @memberof Search
     */
    renderSearchResults() {

        const { searchResult, shelfMover, alreadyInShelf } = this.props;

        if (!searchResult.hasOwnProperty("error")) {

            return searchResult.map((book, index) => {

                // Default Shelf as none
                book = { ...book, shelf: "none" };

                // Check if its already in a shelf
                const isAlreadyInShelf = alreadyInShelf(book);
                if (isAlreadyInShelf) {
                    book = isAlreadyInShelf;
                }

                return (<li key={index}><Book shelfMover={shelfMover} book={book} /></li>);
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <Input type="text" label="Search by title or author" s={12} onChange={(e) => this.props.searchBooks(e.target.value, 20)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.isLoading && <ProgressBar />}
                    <ol className="books-grid">{this.renderSearchResults()}</ol>
                </div>
            </div>
        )
    }

}