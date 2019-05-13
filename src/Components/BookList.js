import React, { Component } from 'react';
import axios from "axios";
import { Row, Col, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class BookList extends Component {
    componentDidMount() {
        const { loadBooks, loadNoOfPages } = this.props;
        axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
            // page: 2,
            // itemsPerPage: 20,
            // filters: []
        })
            .then(res => {
                // console.log(res.data)
                loadNoOfPages(res.data.count)
                loadBooks(res.data.books)
            })
    }

    render() {
        const { books, pages } = this.props
        console.log(books)
        console.log(pages)
        return (
            <Row>
                <Col>
                    <ListGroup>
                        {books.map(book =>
                            <ListGroup.Item>
                                <li>Author: {book.book_author}</li>
                                <li>Pages: {book.book_pages}</li>
                                <li>City of publication: {book.book_publication_city}</li>
                                <li>Country of publication: {book.book_publication_country}</li>
                                <li>Year of publication: {book.book_publication_year}</li>
                                <li>Title: {book.book_title}</li>
                                <li>ID: {book.id}</li>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books,
        pages: state.noOfPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadBooks: books => {
            dispatch({ type: "LOAD_BOOKS", payload: books });
        },
        loadNoOfPages: bookTotal => {
            dispatch({ type: "LOAD_NO_OF_PAGES", payload: bookTotal })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);