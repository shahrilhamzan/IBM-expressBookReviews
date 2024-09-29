const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});

return res.send(JSON.stringify(books,null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});


    // // Update the code here
    const isbnId = Number(req.params.isbn);
    const getIsbn = books[isbnId]
    return res.send(JSON.stringify(getIsbn));
      
 });
  
// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});

//       // // Update the code here

//       // const authorId = Number(req.params.author);
//       // const getAuthor = books[authorId]

//       get_all_books =  JSON.stringify(books,null,4);

//       callAuthor($name){
//         for (const author in get_all_books) {
//           if(author == author){
//             return true;
//             return res.send(JSON.stringify(author, books[$name]));
//           }
//           else {
//             return false;
//           }
//         }
//       }
      
     
      
// });

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const authorParam = req.params.author;
  const matchingBooks = [];

  // Loop through the 'books' object
  for (const bookId in books) {
      if (books[bookId].author.toLowerCase() === authorParam.toLowerCase()) {
          // If the book's author matches the requested author, add the book to the results
          matchingBooks.push(books[bookId]);
      }
  }

  if (matchingBooks.length > 0) {
      // Return matching books if found
      return res.json(matchingBooks);
  } else {
      // Return an error if no books are found for the given author
      return res.status(404).json({ message: "No books found for the given author." });
  }
});



// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const value_capture = [];

  // Loop through the 'books' object
  for (const bookId in books) {
    if (books[bookId].title === title) {
      // If the book's title matches exactly, add the book to the results
      value_capture.push(books[bookId]);
    }
  }

  if (value_capture.length > 0) {
    // Return matching books if found
    return res.json(value_capture);
  } else {
    // Return an error if no books are found for the given title
    return res.status(404).json({ message: "No books found for the given title." });
  }
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
