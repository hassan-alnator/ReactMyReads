import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// API 
import * as BooksAPI from './BooksAPI'

// Main CSS
import './App.css'

// Main Pages/Components
import Search from './components/Search'
import Books from './components/Books'


export default class BooksApp extends Component {

  state = {

    shelfs: ['Currently Reading', 'Want To Read', 'Read'],
    books: [],
    isLoading: true,
    search_term: '',
    search_result: []

  }

  startLoading = () => {
    this.setState({ isLoading: true });
  }

  stopLoading = () => {
    this.setState({ isLoading: false });
  }

  alreadyInShelf = (book) => {
    const { books } = this.state;
    return books.find((b) => b.id === book.id) || false;
  }

  searchBooks = (term, max) => {
    if (term) {
      this.startLoading()

      BooksAPI.search(term, max)
        .then((search_result) => this.setState({ search_result }))
        .then(() => this.stopLoading())
    }
  }

  addBook = (shelf, book) => {

    this.setState((state) => ({
      books: state.books.concat({ ...book, shelf })
    }))
  }

  shelfMover = (newShelf, updatedBook) => {

    // Update Book Status
    this.setState((state) => ({
      books: state.books.map((book) => {
        if (book.id === updatedBook.id) {
          return { ...book, shelf: newShelf }
        }
        return book;
      })
    }));

    //Update Book Data
    BooksAPI.update(updatedBook, newShelf);

  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => this.setState({ books, isLoading: false }))
      .catch((err) => console.log(err));
  }

  render() {
    const { books, isLoading, search_result } = this.state;

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <Books shelfs={this.state.shelfs} shelfMover={this.shelfMover} books={books} isLoading={isLoading} />
        )} />

        <Route exact path="/search" render={() => (
          <Search alreadyInShelf={this.alreadyInShelf} shelfMover={this.addBook} searchBooks={this.searchBooks} searchResult={search_result} isLoading={isLoading} />
        )} />

      </div>
    )
  }
}


