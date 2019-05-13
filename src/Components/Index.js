import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col, ListGroup, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IndexLinkContainer } from 'react-router-bootstrap';


class Index extends Component {

    getData(pageNumber) {
        const { loadBooks, loadBookCount, loadActivePage } = this.props;

        if (pageNumber === undefined) {
            pageNumber = 1
        }

        loadActivePage(pageNumber)

        axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
            page: pageNumber,
            itemsPerPage: 20,
            filters: []
        })
            .then(res => {
                loadBooks(res.data.books)
                loadBookCount(res.data.count)
            })
    }

    componentDidMount() {
        this.getData(this.props.match.params.pathParam)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.pathParam !== prevProps.match.params.pathParam) {
            this.getData(this.props.match.params.pathParam)
        }
    }



    render() {

        const { books, totalNoOfPages, activePage } = this.props

        //put all page numbers in an array
        let pageNumbers = [];
        if (totalNoOfPages !== null) {
            for (let i = 1; i <= totalNoOfPages; i++) {
                pageNumbers.push(i);
            }
        }

        // print relavent page numbers
        let active = activePage;
        let items = [];

        pageNumbers.forEach(number => {
            if (number == 1 || number == totalNoOfPages || (number >= activePage - 2 && number <= activePage + 2)) {
                 items.push(
                    <IndexLinkContainer to={`/${number}`}>
                        <Pagination.Item key={number} active={number === active}>
                            {number}
                        </Pagination.Item>
                    </IndexLinkContainer>
                )
            }
        })

        const PaginationBasic = () => {
            return (
                <Pagination>{items}</Pagination>
            )
        };

        return (
            <Container>
                <Row className="mb-3">
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
                <Row>
                    <Col id="paginationCol">
                        <PaginationBasic />
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books,
        totalNoOfPages: state.noOfPages,
        activePage: state.activePage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadBooks: books => {
            dispatch({ type: "LOAD_BOOKS", payload: books });
        },
        loadBookCount: count => {
            dispatch({ type: "LOAD_NO_OF_PAGES", payload: count });
        },
        loadActivePage: pageNumber => {
            dispatch({ type: "LOAD_ACTIVE_PAGE", payload: pageNumber });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

