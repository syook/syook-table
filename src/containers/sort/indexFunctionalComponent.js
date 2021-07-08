import React, { useEffect, useReducer, useCallback } from 'react';

import { fetchSortedData } from './utils';

export const SortContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'columnName':
      return { ...state, columnName: action.payload };
    case 'columnType':
      return { ...state, columnType: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'direction':
      return { ...state, direction: action.payload };
    case 'resetPagination':
      return { ...state, resetPagination: action.payload };
    default:
      return state;
  }
}

function SortProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    columnName: null,
    columnType: null,
    direction: null,
    data: props.data ? [...props.data] : [],
    resetPagination: false,
  });

  const handleSort = useCallback(
    ({ headerName: clickedColumn, type: columnType, direction, field }) => () => {
      direction = direction || 'ascending';

      if (!clickedColumn) return;
      const { columnName } = state;
      if (columnName !== clickedColumn) {
        direction = 'ascending';
        props.updateRowsSortParams(field, columnType, direction);
        if (props.fetchOnPageChange) {
          props.fetchOnPageChange(1, props.searchText, null, props.rowsPerPageFromSearch, {
            columnName: field,
            columnType,
            direction,
          });
        }
        dispatch({
          type: 'columnName',
          payload: clickedColumn,
        });
        dispatch({
          type: 'columnType',
          payload: columnType,
        });
        dispatch({
          type: 'direction',
          payload: direction,
        });
        dispatch({
          type: 'resetPagination',
          payload: !state.resetPagination,
        });
      } else {
        props.updateRowsSortParams(field, columnType, direction);

        if (props.fetchOnPageChange) {
          props.fetchOnPageChange(1, props.searchText, null, props.rowsPerPageFromSearch, {
            columnName: field,
            columnType,
            direction,
          });
        }
        dispatch({
          type: 'direction',
          payload: direction,
        });
        dispatch({
          type: 'resetPagination',
          payload: !state.resetPagination,
        });
      }
    },
    [props.fetchOnPageChange, state.columnName, state.resetPagination, props.updateRowsSortParams]
  );

  useEffect(() => {
    getSortedData();
  }, [props.data, state.columnName, state.columnType, state.direction, state.resetPagination]);

  const getSortedData = useCallback(() => {
    const { columnName, columnType, direction } = state;

    if (columnName && columnType) {
      if (props.fetchOnPageChange) {
        dispatch({ type: 'data', payload: props.data });
      } else {
        const sortedData = fetchSortedData({ data: [...props.data], columnType, columnName, direction }) || [];
        dispatch({ type: 'data', payload: sortedData });
      }
    } else {
      dispatch({ type: 'data', payload: props.data });
    }
  }, [state.columnName, state.columnType, state.direction, props.data, props.fetchOnPageChange]);

  const { children } = props;

  return (
    <SortContext.Provider
      value={{
        rawData: props.rawData,
        handleSort: handleSort,
        ...state,
        count: props.count,
        direction: state.direction,
        columnName: state.columnName,
        columnType: state.columnType,
      }}>
      {children}
    </SortContext.Provider>
  );
}

export default SortProvider;
