import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';

import Filter from '../../components/filter';

import { loopFilters } from './utils';

export const FilterContext = React.createContext();

export default class FilterProvider extends PureComponent {
  state = {
    selectedFilters: [],
    filterDisabled: false,
  };

  componentDidUpdate(prevProps) {
    if ((this.props.data || []) && !isEqual(this.props.data, prevProps.data)) {
      this.applyFilter();
    }
    const columnDefs = (this.props.filterableColumns || []).map(def => def.headerName);
    const prevColumnDefs = (prevProps.filterableColumns || []).map(def => def.headerName);
    if (!isEqual(columnDefs, prevColumnDefs)) {
      this.setState({
        selectedFilters: [],
      });
    }
  }

  setSelectedFilters = selectedFilters => {
    this.setState({ selectedFilters });
  };

  applyFilter = filters => {
    this.setState({ filterDisabled: true });
    const selectedFilters = filters && filters.length ? filters : this.state.selectedFilters;
    const searchedData = [...this.props.data] || [];
    if (!selectedFilters.length) {
      this.setState({ filterDisabled: false });
      return searchedData;
    }

    const filteredData = loopFilters(searchedData, selectedFilters, this.props.emptyCellPlaceHolder);
    this.setState({ filterDisabled: false });
    return filteredData;
  };

  render() {
    const { children, filterableColumns } = this.props;
    const parentDataCount = (this.props.data || []).length;
    const data = this.applyFilter(this.state.selectedFilters);
    const stateDataCount = (data || []).length;
    return (
      <FilterContext.Provider value={{ ...this.state, data }}>
        <Filter
          applyFilter={this.applyFilter}
          disabled={!parentDataCount || !filterableColumns.length}
          filterDisabled={this.state.filterDisabled}
          filterableColumns={filterableColumns}
          columns={this.props.columns}
          selectedFilters={this.state.selectedFilters}
          setSelectedFilters={this.setSelectedFilters}
        />
        {children}

        {parentDataCount && !stateDataCount ? <div className="noRecordsDiv">{'No Results Found'}</div> : null}
      </FilterContext.Provider>
    );
  }
}
