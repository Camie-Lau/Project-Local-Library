function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
//It returns the author object that has the matching ID.

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}
//It returns the book object that has the matching ID.

function partitionBooksByBorrowedStatus(books) {
  let notReturned = books.filter((book) => !book.borrows[0].returned);
  let returned = books.filter((book) => book.borrows[0].returned);
  return [notReturned, returned];
}

function getBorrowersForBook(book, accounts) {
  let allAccts = book.borrows.map((borrow) => {
    let acct = accounts.find((account) => account.id === borrow.id);
    return {
      ...borrow,
      ...acct,
    };
  });
  return allAccts.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
