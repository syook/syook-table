import './table.css';

import React, { useEffect, useReducer, useCallback } from 'react';
import { Table } from 'semantic-ui-react';

import Pagination from '../../components/pagination';

import { findPageRange, findCurrentData } from './utils';

export const PaginationContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'currentPage':
      return { ...state, currentPage: action.payload };
    case 'numberOfColumns':
      return { ...state, numberOfColumns: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'numberOfPages':
      return { ...state, numberOfPages: action.payload };
    case 'rowsPerPage':
      return { ...state, rowsPerPage: action.payload };
    default:
      return state;
  }
}

function PaginationProvider(props) {
  const rowsPerPage = {
    value: props.defaultItemsToDisplay || 10,
    label: `${props.defaultItemsToDisplay || 10} Items`,
  };
  const rowCount = typeof props.count === 'number' ? props.count : (props.data || []).length;

  const [state, dispatch] = useReducer(reducer, {
    currentPage: 1,
    data: [...props.data],
    numberOfColumns: 30,
    numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
    rowsPerPage,
  });

  const setCurrentPage = useCallback(currentPage => dispatch({ type: 'currentPage', payload: currentPage }), [
    state.currentPage,
  ]);
  const resetToFirstPage = useCallback(() => setCurrentPage(1), [setCurrentPage]);

  const onSelectRowsPerPage = useCallback(
    (selectedRowsPerPage = { value: 10, label: '10 Items' }) => {
      let { currentPage } = state;
      const rowCount = typeof props.count === 'number' ? props.count : (props.data || []).length;

      const numberOfPages = Math.ceil(rowCount / selectedRowsPerPage.value);
      if (numberOfPages < currentPage) currentPage = numberOfPages;
      props.updateRowsPerPage(selectedRowsPerPage.value);
      if (props.fetchOnPageChange)
        props.fetchOnPageChange(currentPage, props.searchText, null, selectedRowsPerPage.value, {
          columnName: props.columnName,
          columnType: props.columnType,
          direction: props.direction,
        });

      dispatch({
        type: 'numberOfPages',
        payload: numberOfPages,
      });
      dispatch({
        type: 'rowsPerPage',
        payload: selectedRowsPerPage,
      });
      dispatch({
        type: 'currentPage',
        payload: currentPage || 1,
      });
    },
    [props.fetchOnPageChange, state.currentPage, props.searchText, props.columnName, props.columnType, props.direction]
  );

  const handlePageClick = useCallback(
    (_e, data) => {
      if (props.fetchOnPageChange)
        props.fetchOnPageChange(+data.page, props.searchText, null, state.rowsPerPage.value, {
          columnName: props.columnName,
          columnType: props.columnType,
          direction: props.direction,
        });
      setCurrentPage(+data.page || 1);
    },
    [props.fetchOnPageChange, state.rowsPerPage, props.searchText, props.columnName, props.columnType, props.direction]
  );

  const handleDirectionClick = useCallback(
    e => {
      const { currentPage } = state;
      const direction = e.currentTarget.dataset['direction'];
      let change = 0;
      if (direction === 'LEFT' && currentPage > 1) {
        change = -1;
      } else if (direction === 'RIGHT' && currentPage < state.numberOfPages) {
        change = 1;
      }
      if (change !== 0) {
        if (props.fetchOnPageChange) {
          props.fetchOnPageChange(currentPage + change || 1, props.searchText, null, state.rowsPerPage.value, {
            columnName: props.columnName,
            columnType: props.columnType,
            direction: props.direction,
          });
        }
        setCurrentPage(currentPage + change || 1);
      }
    },
    [state, props.fetchOnPageChange]
  );

  useEffect(() => {
    const rowCount = typeof props.count === 'number' ? props.count : props.data.length;

    let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = state;
    const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    // props.resetBulkSelection();
    dispatch({ type: 'numberOfPages', payload: numberOfPages });
    dispatch({ type: 'currentPage', payload: currentPage || 1 });

    const data = findCurrentData(props.data, state.currentPage, state.rowsPerPage);
    dispatch({ type: 'data', payload: data });
  }, [props.data, props.count, state.currentPage]);

  useEffect(() => {
    resetToFirstPage();
  }, [props.resetPagination]);

  let { children } = props;
  let pageRange = findPageRange({ ...state });
  const startIndex = (state.currentPage - 1) * state.rowsPerPage.value;

  return (
    <>
      <div
        className={`scrollable-table tableFixHead ${props.tableScroll ? 'shouldSroll' : null}`}
        style={{ maxWidth: '100%', marginTop: '10px' }}>
        <Table sortable celled padded className="tableStyle left aligned table-fixed">
          <PaginationContext.Provider
            value={{
              rawData: props.rawData,
              ...state,
              startIndex,
              rowCount,
              resetToFirstPage: resetToFirstPage,
            }}>
            {children}
          </PaginationContext.Provider>
        </Table>
      </div>
      <Pagination
        {...props}
        {...state}
        handleDirectionClick={handleDirectionClick}
        handlePageClick={handlePageClick}
        onSelectRowsPerPage={onSelectRowsPerPage}
        pageRange={pageRange}
        rowCount={rowCount}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default PaginationProvider;
