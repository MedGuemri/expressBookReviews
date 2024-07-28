const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

public_users.get('/', async function (req, res) {
  try {
    const booksList = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 1000); // Simulating async operation with a timeout
    });
    return res.status(200).json({ books: booksList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book list" });
  }
});

public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject("Book not found");
        }
      }, 1000); // Simulating async operation with a timeout
    });
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const filteredBooks = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const booksByAuthor = Object.values(books).filter(book => book.author === author);
        if (booksByAuthor.length > 0) {
          resolve(booksByAuthor);
        } else {
          reject("Books by this author not found");
        }
      }, 1000); // Simulating async operation with a timeout
    });
    return res.status(200).json({ books: filteredBooks });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const filteredBooks = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const booksByTitle = Object.values(books).filter(book => book.title === title);
        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject("Books with this title not found");
        }
      }, 1000); // Simulating async operation with a timeout
    });
    return res.status(200).json({ books: filteredBooks });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports.general = public_users;
