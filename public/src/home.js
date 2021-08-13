const { sortAccountsByLastName } = require("./accounts");

function getTotalBooksCount(books) {
  return books.map((book) => book).length;
}
//It returns a number that
//represents the number of book objects inside of the array.

function getTotalAccountsCount(accounts) {
  return accounts.map((account) => account).length;
}
//It returns a number that represents
//the number of account objects inside of the array.

function getBooksBorrowedCount(books) {
  let checkedOut = books.filter((book) =>
    book.borrows.find((borrow) => borrow.returned === false)
  );
  return checkedOut.length;
}
/*It returns a number that represents the number of books _that 
are currently checked out of the library._ This number can be 
found by looking at the first transaction in the `borrows` 
key of each book. If the transaction says the book has not been 
returned (i.e. `returned: false`), the book has been borrowed. */

function getMostCommonGenres(books) {
  let countObj = {};
  //Use the .foreach loop to find the most common genres

  books.forEach((Book) => {
    if (countObj[Book.genre] == null) {
      countObj[Book.genre] = 1;
    } else {
      countObj[Book.genre]++;
    }
  });

  let countArray = [];
  //loop through object with for in for name and key
  for (const key of Object.keys(countObj)) {
    countArray.push({
      name: key,
      count: countObj[key],
    });
  }

  //Use the sort and slice method to trim the list to only the top 5
  countArray.sort((count1, count2) => count2.count - count1.count);
  return countArray.slice(0, 5);
}

//how to sort them to get top 5(functional decomposition)

/*It returns an array containing five objects or fewer that 
represents the most common occurring genres, ordered from most 
common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

If more than five genres are present, only the top five should be returned.
*/
function getMostPopularBooks(books) {
  let sorted = books
    .sort((b, a) => a.borrows.length - b.borrows.length)
    .slice(0, 5)
    .map((book) => {
      return {
        name: book.title,
        count: book.borrows.length,
      };
    });
  return sorted;
}
//It returns an array containing five objects or fewer
// that represents the most popular books in the library.
//  Popularity is represented by the number of times a book
//  has been borrowed.

// Each object in the returned array has two keys:

// - The `name` key which represents the title of the book.
// - The `count` key which represents the number of times the book has been borrowed.

// If more than five books are present, only the top five should be returned.

function getMostPopularAuthors(books, authors) {
  //sort book by most borrowed
  //total borrowed for each author
  //find all book for each author and sum all borrows
  //aggregate all borrows for all books for each author
  //   let authorAndCount = [];
  //   let authorBookIdMatch = authors.map((author) => {
  //     let obj = {};
  //     obj.name = author.name;
  //     obj.count = books.reduce((acc, book) => {
  //       if (book.authorId == author.id) {
  //         acc += book.borrows.length;
  //         return acc;
  //       }
  //     }, 0);
  //     return authorAndCount.push(obj)
  //       .push(obj
  //       .sort((b, a) => a.borrows.length - b.borrows.length)
  //       .slice(0, 5));
  //   });
  // }
  // function getMostPopularAuthors(books, authors) {
  return books
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return {
        name: `${author.name.first} ${author.name.last}`,
        count: book.borrows.length,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

//returns array of books with authorId same as BookId

//   .map((book) => {
//     return {
//       name: authors.name,
//       count: book.borrows.length,
//     };
//   });
// return sorted;
// match the books array authorId with authors author id to return the name
//somehow push the name into an array with name and count of borrows

/* It returns an array containing five objects or fewer that 
represents the most popular authors whose books have been checked 
out the most. Popularity is represented by finding all of the 
books written by the author and then adding up the number of times 
those books have been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

If more than five authors are present, only the top five 
should be returned. */

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
