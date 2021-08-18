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
//orders.reduce((total, currentOrder) => {
//return total + currentOrder.total
//}, 0)
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
  //Use the .foreach loop to find the most common genres
  let countObj = {};
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
  console.log(countArray.slice(0, 5));
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
  let result = [];

  books.reduce((acc, book) => {
    result.push({ name: book.title, count: book.borrows.length });
  }, []);
  console.log(result.sort((b, a) => a.count - b.count).slice(0, 5));
  return result.sort((b, a) => a.count - b.count).slice(0, 5);
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
