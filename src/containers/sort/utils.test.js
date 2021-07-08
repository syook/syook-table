import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { fetchSortedData } from './utils';

configure({ adapter: new Adapter() });

const data = [
  { Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'Prakash Barik', id: 2, objIndex: 1 },
];

describe('SortProvider', () => {
  it('fetchSortedData should return empty array if columnType is null', () => {
    expect(
      fetchSortedData({
        data,
        columnType: null,
        columnName: 'Name',
        direction: 'ascending',
      })
    ).toEqual([]);
  });

  it('fetchSortedData should return empty array if columnName is null', () => {
    expect(
      fetchSortedData({
        data,
        columnType: 'String',
        columnName: null,
        direction: 'ascending',
      })
    ).toEqual([]);
  });

  it('fetchSortedData should return sorted array with Name in ascending with type string', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
    ];
    const columnName = 'Name';
    const columnType = 'String';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with Name in descending with type string', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const columnName = 'Name';
    const columnType = 'String';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with Name in ascending with type singleselect', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
    ];
    const columnName = 'Name';
    const columnType = 'singleselect';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with Name in descending with type singleselect', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const columnName = 'Name';
    const columnType = 'singleselect';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with Description in ascending with type string', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const columnName = 'Description';
    const columnType = 'String';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with Description in descending with type string', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
    ];
    const columnName = 'Description';
    const columnType = 'String';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with id in ascending with type number', () => {
    const data = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
    ];
    const expectedData = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const columnName = 'id';
    const columnType = 'Number';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with id in descending with type number', () => {
    const data = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2 },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1 },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0 },
    ];
    const columnName = 'id';
    const columnType = 'Number';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with is_completed in ascending with type boolean', () => {
    const data = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, is_completed: true },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, is_completed: false },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, is_completed: true },
    ];
    const expectedData = [
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, is_completed: false },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, is_completed: true },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, is_completed: true },
    ];
    const columnName = 'is_completed';
    const columnType = 'Boolean';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with is_completed in descending with type boolean', () => {
    const data = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, is_completed: true },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, is_completed: false },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, is_completed: true },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, is_completed: true },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, is_completed: true },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, is_completed: false },
    ];
    const columnName = 'is_completed';
    const columnType = 'Boolean';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with date in ascending with type date', () => {
    const data = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, date: new Date(2020, 2, 10) },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, date: new Date(2019, 2, 10) },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, date: new Date(2020, 1, 9) },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, date: new Date(2019, 2, 10) },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, date: new Date(2020, 1, 9) },
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, date: new Date(2020, 2, 10) },
    ];
    const columnName = 'date';
    const columnType = 'date';
    const direction = 'ascending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });

  it('fetchSortedData should return sorted array with date in descending with type date', () => {
    const data = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, date: new Date(2020, 2, 10) },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, date: new Date(2019, 2, 10) },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, date: new Date(2020, 1, 9) },
    ];
    const expectedData = [
      { Description: 'QA', Name: 'david', id: 3, objIndex: 2, date: new Date(2020, 2, 10) },
      { Description: 'Dev', Name: 'hank', id: 1, objIndex: 0, date: new Date(2020, 1, 9) },
      { Description: 'QA', Name: 'peter', id: 2, objIndex: 1, date: new Date(2019, 2, 10) },
    ];
    const columnName = 'date';
    const columnType = 'date';
    const direction = 'descending';
    expect(
      fetchSortedData({
        data,
        columnType,
        columnName,
        direction,
      })
    ).toEqual(expectedData);
  });
});
