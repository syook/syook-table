import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { searchObj, getSearchTextFilteredData } from './utils';

configure({ adapter: new Adapter() });

const searchKeys = { Description: true, Name: true };
const tableData = [
  { Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'Prakash Barik', id: 2, objIndex: 1 },
];

describe('SearchProvider Utils', () => {
  it('searchObj should return false if empty values are passed', () => {
    expect(searchObj({}, '', {})).toBe(false);
  });

  it('searchObj should return false if props are undefined', () => {
    expect(searchObj(undefined, undefined, undefined)).toBe(false);
  });

  it('searchObj should return true if search value if found', () => {
    expect(searchObj({ Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 }, 'har', searchKeys)).toBe(true);
  });

  it('searchObj should return false if searchKey is empty', () => {
    expect(searchObj({ Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 }, 'har', {})).toBe(false);
  });

  it('searchObj should return false if tableData is empty', () => {
    expect(searchObj({}, 'har', searchKeys)).toBe(false);
  });

  it('getSearchTextFilteredData should return same data if searchText is empty', () => {
    const searchText = '';
    expect(getSearchTextFilteredData({ data: tableData, searchText, searchKeys })).toEqual(tableData);
  });

  it('getSearchTextFilteredData should return matching object if searchtext is found', () => {
    const searchText = 'Har';
    expect(getSearchTextFilteredData({ data: tableData, searchText, searchKeys })).toEqual([
      { Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 },
    ]);
  });

  it('getSearchTextFilteredData should return value regardless of case sensitivity', () => {
    const searchText = 'pra';
    expect(getSearchTextFilteredData({ data: tableData, searchText, searchKeys })).toEqual([
      { Description: 'QA', Name: 'Prakash Barik', id: 2, objIndex: 1 },
    ]);
  });
});
