import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { findStartPage, findPageRange, findCurrentData } from './utils';

configure({ adapter: new Adapter() });

describe('utils', () => {
  describe('findStartPage', () => {
    describe('no arguments passed', () => {
      it('should return NaN', () => {
        expect(findStartPage()).toBe(NaN);
      });
    });

    describe('passing numberOfPages as 2 and currentPage as 2', () => {
      it('should return 1', () => {
        expect(findStartPage(2, 2)).toBe(1);
      });
    });

    it('findStartPage should return 1 if numberOfPages is 3', () => {
      expect(findStartPage(3, 4)).toBe(1);
    });

    it('findStartPage should return 1 if currentPage is equal to 1', () => {
      expect(findStartPage(5, 1)).toBe(1);
    });

    it('findStartPage should return currentPage - 2 if currentPage is equal to numberOfPages', () => {
      expect(findStartPage(5, 5)).toBe(3);
    });

    it('findStartPage should return currentPage - 1 if currentPage is more than 1 and not equal to numberOfPages & numberOfPages is more than 3', () => {
      expect(findStartPage(5, 4)).toBe(3);
    });
  });

  describe('findCurrentData', () => {
    it('findCurrentData should return empty array if searchedDataFound is empty', () => {
      expect(findCurrentData([], 1, { value: 10 })).toEqual([]);
    });

    it('findCurrentData should return same data values if searchedDataFound length is less than rowsPerPage', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
      ];
      expect(findCurrentData(data, 1, { value: 10 })).toEqual(data);
    });

    it('findCurrentData should return rowsPerPage values in data if values in data is more than rowsPerPage', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
      ];

      const expectedData = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
      ];
      expect(findCurrentData(data, 1, { value: 5 })).toEqual(expectedData);
    });

    it('findCurrentData should return all values in data if values in data is less than rowsPerPage', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
      ];

      const expectedData = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
      ];
      expect(findCurrentData(data, 1, { value: 10 })).toEqual(expectedData);
    });

    it('findCurrentData should return values in data as per rowsPerPage value if values in data is more than rowsPerPage', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
        { Description: 'Dev', Name: 'Steve', id: 7, objIndex: 6 },
        { Description: 'QA', Name: 'Tony', id: 8, objIndex: 7 },
        { Description: 'Dev', Name: 'Diana', id: 9, objIndex: 8 },
        { Description: 'QA', Name: 'Natasha', id: 10, objIndex: 9 },
        { Description: 'Dev', Name: 'Mark', id: 11, objIndex: 10 },
        { Description: 'QA', Name: 'Robert', id: 12, objIndex: 11 },
      ];

      const expectedData = [
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
        { Description: 'Dev', Name: 'Steve', id: 7, objIndex: 6 },
        { Description: 'QA', Name: 'Tony', id: 8, objIndex: 7 },
        { Description: 'Dev', Name: 'Diana', id: 9, objIndex: 8 },
        { Description: 'QA', Name: 'Natasha', id: 10, objIndex: 9 },
      ];
      expect(findCurrentData(data, 2, { value: 5 })).toEqual(expectedData);
    });

    it('findCurrentData should return values in data as per rowsPerPage value if values in data is more than rowsPerPage', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'QA', Name: 'Peter', id: 4, objIndex: 3 },
        { Description: 'Dev', Name: 'Bruce', id: 5, objIndex: 4 },
        { Description: 'QA', Name: 'Clark', id: 6, objIndex: 5 },
        { Description: 'Dev', Name: 'Steve', id: 7, objIndex: 6 },
        { Description: 'QA', Name: 'Tony', id: 8, objIndex: 7 },
        { Description: 'Dev', Name: 'Diana', id: 9, objIndex: 8 },
        { Description: 'QA', Name: 'Natasha', id: 10, objIndex: 9 },
        { Description: 'Dev', Name: 'Mark', id: 11, objIndex: 10 },
        { Description: 'QA', Name: 'Robert', id: 12, objIndex: 11 },
      ];

      const expectedData = [
        { Description: 'Dev', Name: 'Mark', id: 11, objIndex: 10 },
        { Description: 'QA', Name: 'Robert', id: 12, objIndex: 11 },
      ];
      expect(findCurrentData(data, 3, { value: 5 })).toEqual(expectedData);
    });
  });

  describe('findPageRange', () => {
    it('findPageRange should return [currentPage - 1, currentPage, currentPage + 1 ] ', () => {
      const obj = {
        numberOfPages: 3,
        currentPage: 2,
      };
      expect(findPageRange(obj)).toEqual([1, 2, 3]);
    });

    it('findPageRange should return numberOfPages is currentPage is greater than numberOfPages', () => {
      const obj = {
        numberOfPages: 3,
        currentPage: 1,
      };
      expect(findPageRange(obj)).toEqual([1, 2, 3]);
    });

    it('findPageRange should return numberOfPages is currentPage is greater than numberOfPages', () => {
      const obj = {
        numberOfPages: 10,
        currentPage: 6,
      };
      expect(findPageRange(obj)).toEqual([5, 6, 7]);
    });

    it('findPageRange should return empty array if numberOfPages is zero', () => {
      const obj = {
        numberOfPages: 0,
        currentPage: 0,
      };
      expect(findPageRange(obj)).toEqual([]);
    });
  });
});
