const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.some(user => user.username === username)) {
      return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});


// Get the book list available in the shop
public_users.get('/', (req, res) => {
  new Promise((resolve, reject) => {
      if (books) {
          resolve(books);
      } else {
          reject("No books available");
      }
  })
  .then((books) => res.json(books))
  .catch((error) => res.status(500).json({ message: error }));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
      const isbn = req.params.isbn;
      const book = await new Promise((resolve, reject) => {
          if (books[isbn]) {
              resolve(books[isbn]);
          } else {
              reject("Book not found");
          }
      });
      return res.json(book);
  } catch (error) {
      return res.status(404).json({ message: error });
  }
});
  


// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  new Promise((resolve, reject) => {
      const matchingBooks = [];

      for (const bookId in books) {
          if (books[bookId].author.toLowerCase() === author) {
              matchingBooks.push(books[bookId]);
          }
      }

      if (matchingBooks.length > 0) {
          resolve(matchingBooks);
      } else {
          reject("No books found for the given author");
      }
  })
  .then((books) => res.json(books))
  .catch((error) => res.status(404).json({ message: error }));
});



// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  try {
      const title = req.params.title.toLowerCase();
      const matchingBooks = await new Promise((resolve, reject) => {
          const booksByTitle = [];

          for (const bookId in books) {
              if (books[bookId].title.toLowerCase() === title) {
                  booksByTitle.push(books[bookId]);
              }
          }

          if (booksByTitle.length > 0) {
              resolve(booksByTitle);
          } else {
              reject("No books found for the given title");
          }
      });
      return res.json(matchingBooks);
  } catch (error) {
      return res.status(404).json({ message: error });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book && book.reviews) {
      return res.json(book.reviews);
  } else {
      return res.status(404).json({ message: "No reviews found for the given book" });
  }
});
module.exports.general = public_users;
