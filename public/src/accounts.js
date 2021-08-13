function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    let nameA = a.name.last;
    let nameB = b.name.last;
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
}

function getTotalNumberOfBorrows(account, books) {
  let checkOut = books.filter((book) => {
    return book.borrows.find((b) => b.id === account.id);
  });
  return checkOut.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkOut = books
    .filter((book) => {
      return book.borrows.find((b) => b.id === account.id && !b.returned)
        ? true
        : false;
    })
    .map((book) => {
      let auth = authors.find((a) => a.id === book.authorId);
      console.log(auth);
      return { ...book, author: auth };
    });

  return checkOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
