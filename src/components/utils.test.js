import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPropertyOption, findColumnOptions, getTableColumns, getTableData } from './utils';

configure({ adapter: new Adapter() });

const filterableColumns = [
  {
    cell: () => {},
    field: 'Name',
    headerName: 'Name',
    isFilterable: true,
    isResizable: true,
    isSearchable: true,
    isSortable: true,
    isVisible: true,
    type: 'String',
    options: [1, 2, 3],
  },
  {
    cell: () => {},
    field: 'Description',
    headerName: 'Description',
    isFilterable: true,
    isResizable: true,
    isSearchable: true,
    isSortable: true,
    isVisible: true,
    type: 'String',
  },
];

describe('utils', () => {
  describe('createPropertyOption', () => {
    it('should return an object with value and label as passed property if found', () => {
      expect(createPropertyOption('headerName')(filterableColumns[0])).toEqual({
        value: 'Name',
        label: 'Name',
      });
    });

    it('should return an object with value and label as passed property if found', () => {
      expect(createPropertyOption('headerName')(filterableColumns[1])).toEqual({
        value: 'Description',
        label: 'Description',
      });
    });
  });

  describe('findColumnOptions', () => {
    it('should return option of matching headerName with attribute', () => {
      expect(findColumnOptions(filterableColumns, 'Name')).toEqual(filterableColumns[0].options);
    });

    it('should return empty array if options are not found', () => {
      expect(findColumnOptions(filterableColumns, 'Description')).toEqual([]);
    });
  });

  describe('getTableColumns', () => {
    it('should return an object with columnDefs value as passed data', () => {
      expect(getTableColumns(filterableColumns)).toEqual({
        columnDefs: filterableColumns,
        searchKeys: { Name: true, Description: true },
      });
    });

    it('should return an object with searchKeys value as object with isSearchable true and headerName is present', () => {
      const filterableColumns = [
        {
          cell: () => {},
          field: 'name',
          headerName: 'Name',
          isFilterable: true,
          isResizable: true,
          isSearchable: false,
          isSortable: true,
          isVisible: true,
          type: 'String',
          options: [1, 2, 3],
        },
        {
          cell: () => {},
          field: 'description',
          headerName: 'Description',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: true,
          type: 'String',
        },
      ];
      expect(getTableColumns(filterableColumns)).toEqual({
        columnDefs: filterableColumns,
        searchKeys: { Description: true },
      });
    });

    it('should return an object with searchKeys excluding object with isSearchable false or headerName is not present', () => {
      const filterableColumns = [
        {
          cell: () => {},
          field: 'name',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: true,
          type: 'String',
          options: [1, 2, 3],
        },
        {
          cell: () => {},
          field: 'description',
          headerName: 'Description',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: true,
          type: 'String',
        },
      ];
      expect(getTableColumns(filterableColumns)).toEqual({
        columnDefs: filterableColumns,
        searchKeys: { Description: true },
      });
    });
  });

  describe('getTableData', () => {
    it('should return table data for the given data isVisible true', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1 },
        { Description: 'QA', Name: 'John', id: 2 },
      ];
      const columns = getTableColumns(filterableColumns);
      expect(getTableData(columns.columnDefs, data)).toEqual([
        { id: 1, objIndex: 0, Name: 'David', Description: 'Dev' },
        { id: 2, objIndex: 1, Name: 'John', Description: 'QA' },
      ]);
    });

    it('should return table data for the given data excluding object with isVisible false', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, Address: 'vghv' },
        { Description: 'QA', Name: 'John', id: 2, Address: 'uyvv' },
      ];
      const filterableColumns = [
        {
          cell: () => {},
          field: 'Name',
          headerName: 'Name',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: true,
          type: 'String',
          options: [1, 2, 3],
        },
        {
          cell: () => {},
          field: 'Description',
          headerName: 'Description',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: false,
          type: 'String',
        },
      ];
      expect(getTableData(filterableColumns, data)).toEqual([
        { id: 1, objIndex: 0, Name: 'David' },
        { id: 2, objIndex: 1, Name: 'John' },
      ]);
    });
  });
});
