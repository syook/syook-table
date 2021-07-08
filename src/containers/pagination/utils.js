export const findStartPage = (numberOfPages, currentPage) => {
  let startPage;
  if (numberOfPages <= 3 || currentPage === 1) {
    startPage = 1;
  } else if (currentPage === numberOfPages) {
    startPage = currentPage - 2;
  } else {
    startPage = currentPage - 1;
  }
  return startPage;
};

export const findPageRange = ({ numberOfPages, currentPage }) => {
  const startPage = findStartPage(numberOfPages, currentPage);
  return Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage);
};

export const findCurrentData = (searchedDataFound = [], currentPage, rowsPerPage) => {
  if (searchedDataFound.length < rowsPerPage.value) {
    return searchedDataFound;
  }
  return searchedDataFound.slice((currentPage - 1) * rowsPerPage.value, currentPage * rowsPerPage.value);
};
