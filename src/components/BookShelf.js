import React, { Component } from 'react';
import { Preloader } from 'react-materialize'
import Book from './Book'

export default class BookShelf extends Component {



    renderBooks() {
        const { books, shelfMover } = this.props;
        return books.map((book, index) => <li key={`book_${book.shelf}_${index}`}><Book shelfMover={shelfMover} book={book} /></li>)
    }

    render() {
        const { title } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    {this.props.isLoading && <Preloader flashing />}
                    <ol className="books-grid">
                        {this.renderBooks()}
                    </ol>
                </div>
            </div >
        )
    }

}


