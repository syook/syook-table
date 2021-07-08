import React, { useEffect, useReducer, useCallback } from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

import { searchActions } from '../../constants';

export const SearchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case searchActions.searchText:
      return { ...state, searchText: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'rowsPerPage':
      return { ...state, rowsPerPage: action.payload };
    case 'columnName':
      return { ...state, columnName: action.payload };
    case 'columnType':
      return { ...state, columnType: action.payload };
    case 'direction':
      return { ...state, direction: action.payload };
    default:
      return state;
  }
}

function SearchProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    searchText: '',
    data: props.dataTable ? [...props.tableData] : [],
    rowsPerPage: 10,
    columnName: null,
    columnType: null,
    direction: null,
  });

  const search = useCallback(
    debounce(
      (searchText, abc) => {
        const { tableData, searchKeys } = props;
        if (!searchText || isEmpty(searchKeys)) {
          dispatch({ type: 'data', payload: tableData });
        }
        if (props.fetchOnPageChange) {
          props.fetchOnPageChange(1, searchText, searchKeys, state.rowsPerPage, {
            columnName: state.columnName,
            columnType: state.columnType,
            direction: state.direction,
          });
        } else {
          const searchedData = onSearch(searchText);
          dispatch({ type: 'data', payload: searchedData });
        }
      },
      props.fetchOnPageChange ? 1200 : 300,
      { leading: true, trailing: true }
    ),
    [props.tableData, props.searchKeys, props.fetchOnPageChange]
  );

  useEffect(() => {
    if (props.fetchOnPageChange) {
      dispatch({ type: 'data', payload: props.tableData });
    } else {
      search(state.searchText, props);
    }
    const a = props;
  }, [props.tableData]);

  const updateRowsPerPage = useCallback(val => {
    dispatch({ type: 'rowsPerPage', payload: val });
  }, []);

  const updateRowsSortParams = useCallback((columnName, columnType, direction) => {
    dispatch({ type: 'columnName', payload: columnName });
    dispatch({ type: 'columnType', payload: columnType });
    dispatch({ type: 'direction', payload: direction });
  }, []);

  const onSearch = useCallback(
    searchText => {
      const { tableData, searchKeys } = props;

      const searchedObjects = getSearchTextFilteredData({
        data: tableData,
        searchKeys,
        searchText,
      });
      return searchedObjects;
    },
    [props.tableData, props.searchKeys]
  );

  const onChangeSearchText = useCallback(
    value => {
      const searchText = (value || '').trimStart().toLowerCase();
      const currentSearchText = state.searchText;

      if (searchText === currentSearchText) return;

      dispatch({ type: searchActions.searchText, payload: searchText });
      search(searchText, props);
    },
    [state] //,props,
  );

  const mainDataCount = props.count || (props.tableData || []).length;
  const stateDataCount = (state.data || []).length;
  return (
    <div>
      <SearchContext.Provider
        value={{
          rawData: props.rawData,
          ...state,
          count: props.count,
          rowsPerPageFromSearch: state.rowsPerPage,
          updateRowsPerPage: updateRowsPerPage,
          updateRowsSortParams: updateRowsSortParams,
        }}>
        <SearchComponent
          disabled={!mainDataCount && !state.searchText}
          name={props.tableName}
          onChangeSearchText={onChangeSearchText}
        />
        {props.children}
        {!stateDataCount && (
          <div style={{ padding: '0 15px' }}>
            <div className="noRecordsDiv">
              {!mainDataCount ? `No ${props.tableName || 'data'} to Display` : 'No Results Found'}
            </div>
          </div>
        )}
      </SearchContext.Provider>
    </div>
  );
}

export default SearchProvider;
