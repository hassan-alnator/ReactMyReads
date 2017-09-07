import React, { Component } from 'react';
import { ProgressBar } from 'react-materialize'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as utils from '../utils'


export default class Books extends Component {

    render() {
        const { isLoading, books, shelfMover } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                {isLoading && <ProgressBar />}

                <div className="list-books-content">
                    <div>
                        {
                            this.props.shelfs.map((shelf, index) => {
                                return <BookShelf key={`shelf_${index}`} shelfMover={shelfMover} isLoading={isLoading} title={shelf} books={books.filter((book) => book.shelf === utils.camelize(shelf))} />
                            })
                        }

                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }

}