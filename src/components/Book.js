import React, { useEffect, useState } from 'react';
import './Book.css';

const getBookListFromLocalStorage = () => {
    const data = localStorage.getItem('bookList');
    return data ? JSON.parse(data) : [];
}

export default function Book() {
    const [bookList, setBookList] = useState(getBookListFromLocalStorage());
    const [book, setBook] = useState({ title: '', author: '' });

    const addBookHandler = (e) => {
        e.preventDefault();
        setBookList([...bookList, book]);
        setBook({});
    };

    useEffect(() => {
        localStorage.setItem('bookList', JSON.stringify(bookList));
    }, [bookList]);

    return (
        <div className="main">
            <div className="bookList">
                <h1>Book list</h1>
                {
                    bookList.map((book, id) => {
                        return <p key={id}>({id + 1}) {book.title} by {book.author}</p>
                    })
                }
                <button 
                    className="clear-btn"
                    onClick={() => setBookList([])}
                >
                    CLEAR
                </button>
            </div>

            <div className="addBook">
                <h1>Add book</h1>
                <form 
                    autoComplete="off" 
                    className="form"
                    onSubmit={addBookHandler}
                >
                    <input 
                        name="title"
                        label="Title"
                        type="text" 
                        className="input"
                        placeholder="Title of the book"
                        required
                        onChange={(e) => {
                            const { name, value } = e.target;
                            setBook({ ...book, [name]: value });
                        }}
                        value={book.title || ''}
                    />
                    <br/>
                    <input 
                        name="author"
                        label="Author"
                        type="text"
                        className="input"
                        placeholder="Author of the book"
                        required
                        onChange={(e) => {
                            const { name, value } = e.target;
                            setBook({ ...book, [name]: value });
                        }}
                        value={book.author || ''}
                    />
                    <br/>
                    <br/>
                    <button 
                        type="submit"
                        className="add-btn"
                    >
                    ADD
                    </button>
                </form>
            </div>
        </div>
    );
}
