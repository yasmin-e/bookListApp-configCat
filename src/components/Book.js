import React, { useEffect, useState } from 'react';
import * as configcat from 'configcat-js';
import './Book.css';

const getBookListFromLocalStorage = () => {
  const data = localStorage.getItem('bookList');
  return data ? JSON.parse(data) : [];
};

const sdkKey = 'mwbaCBCQ4EyCinyHLrOpWw/S2sERkguckuEofREFPD5eQ';

export default function Book() {
  const [bookList, setBookList] = useState(getBookListFromLocalStorage());
  const [book, setBook] = useState({ id: null, title: '', author: '' });
  const [sortedMode, setSortedMode] = useState('');

  const addBookHandler = (e) => {
    e.preventDefault();
    setBookList([...bookList,
      {
        id: (bookList.length + 1),
        title: book.title,
        author: book.author,
      },
    ]);
    setBook({});
  };

  const sortedBooks = sortedMode === 'on' ? [...bookList.reverse()] : bookList;

  useEffect(() => {
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }, [bookList]);

  useEffect(() => {
    const configCatClient = configcat.createClient(sdkKey);
    configCatClient.getValue('sorterFeature', false, (value) => { console.log(value); return value ? setSortedMode('on') : setSortedMode('off'); });
  }, [sortedMode, sortedBooks]);

  console.log(`sorted mode : ${sortedMode}`);
  console.log(`sorted books : ${JSON.stringify(sortedBooks)}`);

  return (
    <div className="main">
      <div className="bookList">
        <h1>Book list</h1>
        {
            sortedBooks.map((x) => (
              <p key={x.id}>
                (
                {x.id}
                )
                {' '}
                {x.title}
                {' '}
                by
                {' '}
                {x.author}
              </p>
            ))
        }
        <button
          type="button"
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
            value={book.title ? book.title : ''}
          />
          <br />
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
            value={book.author ? book.author : ''}
          />
          <br />
          <br />
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
