const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
  }

  if (authenticatedUser(username, password)) {
      const accessToken = jwt.sign({ data: username }, 'access', { expiresIn: '1h' });
      req.session.authorization = { accessToken, username };
      return res.status(200).json({ message: "Login successful" });
  } else {
      return res.status(401).json({ message: "Invalid login" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
  }

  // If the book has reviews, modify or add the review for the user
  if (!books[isbn].reviews) {
      books[isbn].reviews = {};
  }
  books[isbn].reviews[username] = review;

  return res.json({ message: "Review added/updated successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn] || !books[isbn].reviews || !books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review not found" });
  }

  delete books[isbn].reviews[username];
  return res.json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
