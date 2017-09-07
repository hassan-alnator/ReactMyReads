import React, { Component } from 'react';

export default class Book extends Component {


    render() {
        const { book, shelfMover } = this.props;

        const { title, authors, imageLinks, shelf } = book;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks ? imageLinks.thumbnail : 'https://i.pinimg.com/736x/b8/bd/3f/b8bd3f935d3c7270a454da6903096706--blank-book-book-covers.jpg'}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(e) => shelfMover(e.target.value, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.join(",")}</div>
            </div>
        )
    }

}

