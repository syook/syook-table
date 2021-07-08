import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { findSearchValue, findAttrValue, queryCondition, filterData, loopFilters } from './utils';

configure({ adapter: new Adapter() });

describe('FilterProvider', () => {
  it('findSearchValue should return empty string if second parameter is not passed', () => {
    expect(findSearchValue('String')).toBe('');
  });

  it('findSearchValue should return passed value if type is not String', () => {
    expect(findSearchValue('number', 100)).toBe(100);
  });

  it('findSearchValue should return passed value with trimmed if type is String', () => {
    expect(findSearchValue('String', '     hello world     ')).toBe('hello world');
  });

  it('findAttrValue should return found value if found in data obj', () => {
    const data = { Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 };
    const filter = {
      attribute: 'Name',
      label: 'Name',
      predicate: 'Where',
      query: 'contains',
      type: 'String',
      value: 'har',
    };
    expect(findAttrValue(data, filter.attribute)).toBe('Harsh Singh');
  });

  it('findAttrValue should return found value if found inside nested array', () => {
    const data = {
      Description: 'Dev',
      id: 1,
      objIndex: 0,
      arr: [{ Name: 'Harsh Singh' }],
    };
    expect(findAttrValue(data, 'Name')).toBe('Harsh Singh');
  });

  it('findAttrValue should return found value if found in data obj', () => {
    const data = { Description: 'Dev', Name: 'Harsh Singh', id: 1, objIndex: 0 };
    expect(findAttrValue(data, 'Description')).toBe('Dev');
  });

  it('findAttrValue should return found value if found inside nested array', () => {
    const data = {
      Name: 'Harsh Singh',
      id: 1,
      objIndex: 0,
      arr: [{ Description: 'Dev' }],
    };
    expect(findAttrValue(data, 'Description')).toBe('Dev');
  });

  it('queryCondition should return undefined if no values are passed', () => {
    expect(queryCondition({})).toBe(undefined);
  });

  it('queryCondition should return undefined if empty values are passed', () => {
    const obj = {
      attrValue: '',
      attributeType: '',
      searchValue: '',
      query: '',
      placeholder: 'N/A',
    };
    expect(queryCondition(obj)).toBe(undefined);
  });

  describe('case "contains"', () => {
    it('queryCondition should return true if searchValue is empty', () => {
      const obj = {
        attrValue: '',
        attributeType: '',
        searchValue: '',
        query: 'contains',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('queryCondition should return true if attrValue have searchValue and attributetype is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'dev',
        query: 'contains',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "does not contains"', () => {
    it('queryCondition should return true if searchValue is empty', () => {
      const obj = {
        attrValue: '',
        attributeType: '',
        searchValue: '',
        query: 'does not contains',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('queryCondition should return true if attrValue does not have searchValue and attributetype is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'QA',
        query: 'does not contains',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "is"', () => {
    it('queryCondition should return true if searchValue is empty', () => {
      const obj = {
        attrValue: '',
        attributeType: '',
        searchValue: '',
        query: 'is',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('queryCondition should return true if attrValue have searchValue and attributetype is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('queryCondition should return false if attrValue has searchValue but not exactly equal and attributetype is singleselect', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'singleselect',
        searchValue: 'Dev',
        query: 'is',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('queryCondition should return true if attrValue is exactly equal to searchValue and attributetype is singleselect', () => {
      const obj = {
        attrValue: 'D',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('queryCondition should return true if attrValue is equal to searchValue but and attributetype is boolean', () => {
      const obj = {
        attrValue: true,
        attributeType: 'boolean',
        searchValue: true,
        query: 'is',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "is not"', () => {
    it('should be false if attrValue is equal to searchValue but and attributetype is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not equal to searchValue but and attributetype is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 7),
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be true if attrValue is not exactly equal to searchValue and attributetype is singleSelect', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'singleselect',
        searchValue: 'Dev',
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is exactly equal to searchValue and attributetype is singleSelect', () => {
      const obj = {
        attrValue: 'D',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not equal to searchValue and attributetype is boolean', () => {
      const obj = {
        attrValue: true,
        attributeType: 'boolean',
        searchValue: false,
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is equal to searchValue and attributetype is boolean', () => {
      const obj = {
        attrValue: true,
        attributeType: 'boolean',
        searchValue: true,
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not equal to searchValue and attributeType is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'QA',
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is equal to searchValue and attributeType is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'Developer',
        query: 'is not',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "is empty"', () => {
    it('should be false if attrValue is not empty and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is empty and attributeType is date', () => {
      const obj = {
        attrValue: '',
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be true if attrValue is empty and attributeType is boolean', () => {
      const obj = {
        attrValue: '',
        attributeType: 'boolean',
        searchValue: true,
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is not empty and attributeType is boolean', () => {
      const obj = {
        attrValue: true,
        attributeType: 'boolean',
        searchValue: true,
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is empty and attributeType is singleselect', () => {
      const obj = {
        attrValue: '',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is not empty and attributeType is singleselect', () => {
      const obj = {
        attrValue: 'D',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is empty and attributeType is string', () => {
      const obj = {
        attrValue: '',
        attributeType: 'string',
        searchValue: 'Dev',
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is not empty and attributeType is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'Dev',
        query: 'is empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "is not empty"', () => {
    it('should be true if attrValue is not empty and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is empty and attributeType is date', () => {
      const obj = {
        attrValue: '',
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be false if attrValue is empty and attributeType is boolean', () => {
      const obj = {
        attrValue: '',
        attributeType: 'boolean',
        searchValue: true,
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not empty and attributeType is boolean', () => {
      const obj = {
        attrValue: true,
        attributeType: 'boolean',
        searchValue: true,
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is empty and attributeType is singleselect', () => {
      const obj = {
        attrValue: '',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not empty and attributeType is singleselect', () => {
      const obj = {
        attrValue: 'D',
        attributeType: 'singleselect',
        searchValue: 'D',
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if attrValue is empty and attributeType is string', () => {
      const obj = {
        attrValue: '',
        attributeType: 'string',
        searchValue: 'Dev',
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if attrValue is not empty and attributeType is string', () => {
      const obj = {
        attrValue: 'Developer',
        attributeType: 'string',
        searchValue: 'Dev',
        query: 'is not empty',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "is before"', () => {
    it('should be true is attrValue is before than searchValue and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2020, 9, 6),
        query: 'is before',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false is attrValue is not before than searchValue and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2020, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is before',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "is after"', () => {
    it('should be false is attrValue is not after than searchValue and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2019, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2020, 9, 6),
        query: 'is after',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue is after than searchValue and attributeType is date', () => {
      const obj = {
        attrValue: new Date(2020, 9, 6),
        attributeType: 'date',
        searchValue: new Date(2019, 9, 6),
        query: 'is after',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "="', () => {
    it('should be true is attrValue is equal to searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '10',
        query: '=',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false is attrValue is not equal to searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '9',
        query: '=',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "≠"', () => {
    it('should be false is attrValue is equal to searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '10',
        query: '≠',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue is not equal to searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '9',
        query: '≠',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "<"', () => {
    it('should be false is attrValue is greater than searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '8',
        query: '<',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue less than searchValue', () => {
      const obj = {
        attrValue: '7',
        attributeType: 'number',
        searchValue: '9',
        query: '<',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "≤"', () => {
    it('should be false is attrValue is greater than or not equal to searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '8',
        query: '≤',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue less than or equal to searchValue', () => {
      const obj = {
        attrValue: '7',
        attributeType: 'number',
        searchValue: '7',
        query: '≤',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case ">"', () => {
    it('should be false is attrValue is less than searchValue', () => {
      const obj = {
        attrValue: '7',
        attributeType: 'number',
        searchValue: '8',
        query: '>',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue greater than searchValue', () => {
      const obj = {
        attrValue: '10',
        attributeType: 'number',
        searchValue: '9',
        query: '>',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "≥"', () => {
    it('should be false is attrValue is less than or not equal to searchValue', () => {
      const obj = {
        attrValue: '2',
        attributeType: 'number',
        searchValue: '8',
        query: '≥',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true is attrValue less than or equal to searchValue', () => {
      const obj = {
        attrValue: '7',
        attributeType: 'number',
        searchValue: '7',
        query: '≥',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "is any of"', () => {
    it('should be true if searchValue includes attrValue', () => {
      const obj = {
        attrValue: 'Dev',
        attributeType: 'singleselect',
        searchValue: 'Developer',
        query: 'is any of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if searchValue does not includes attrValue', () => {
      const obj = {
        attrValue: 'QA',
        attributeType: 'singleselect',
        searchValue: 'Developer',
        query: 'is any of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "is none of"', () => {
    it('should be false if searchValue includes attrValue', () => {
      const obj = {
        attrValue: 'Dev',
        attributeType: 'singleselect',
        searchValue: 'Developer',
        query: 'is none of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if searchValue does not includes attrValue', () => {
      const obj = {
        attrValue: 'QA',
        attributeType: 'singleselect',
        searchValue: 'Developer',
        query: 'is none of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('case "has any of"', () => {
    it('should be true if searchValue includes attrValue', () => {
      const obj = {
        attrValue: 'Dev',
        attributeType: 'singleselect',
        searchValue: 'Developer'.split(''),
        query: 'has any of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });

    it('should be false if searchValue does not includes attrValue', () => {
      const obj = {
        attrValue: 'QA',
        attributeType: 'singleselect',
        searchValue: 'Developer'.split(''),
        query: 'has any of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });
  });

  describe('case "has none of"', () => {
    it('should be false if searchValue includes attrValue', () => {
      const obj = {
        attrValue: 'Dev',
        attributeType: 'singleselect',
        searchValue: 'Developer'.split(''),
        query: 'has none of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(false);
    });

    it('should be true if searchValue does not includes attrValue', () => {
      const obj = {
        attrValue: 'QA',
        attributeType: 'singleselect',
        searchValue: 'Developer'.split(''),
        query: 'has none of',
        placeholder: 'N/A',
      };
      expect(queryCondition(obj)).toBe(true);
    });
  });

  describe('filterData', () => {
    it('should return only those data which Description includes search value', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      const expectedData = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      expect(
        filterData({
          data,
          attribute: 'Description',
          value: 'De',
          query: 'contains',
          type: 'string',
        })
      ).toEqual(expectedData);
    });

    it('should return only those data which Name includes search value', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      const expectedData = [{ Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 }];
      expect(
        filterData({
          data,
          attribute: 'Name',
          value: 'Ma',
          query: 'contains',
          type: 'string',
        })
      ).toEqual(expectedData);
    });
  });

  describe('loopFilters', () => {
    it('should return data as it is if filters are empty', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      expect(loopFilters(data, [], 'Description')).toBe(data);
    });

    it('should return data which contains search value in description', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      const filters = [
        {
          attribute: 'Description',
          label: 'Description',
          predicate: 'Where',
          query: 'contains',
          type: 'string',
          value: 'dev',
        },
      ];
      const expectedData = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      expect(loopFilters(data, filters, 'Description')).toEqual(expectedData);
    });

    it('should return data in which Description and Name contains search value', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      const filters = [
        {
          attribute: 'Description',
          label: 'Description',
          predicate: 'And',
          query: 'contains',
          type: 'string',
          value: 'dev',
        },
        {
          attribute: 'Name',
          label: 'Name',
          predicate: 'And',
          query: 'contains',
          type: 'string',
          value: 'Dav',
        },
      ];
      const expectedData = [{ Description: 'Dev', Name: 'David', id: 1, objIndex: 0 }];
      expect(loopFilters(data, filters, 'Description')).toEqual(expectedData);
    });

    it('should return data in which Description and Name contains search value', () => {
      const data = [
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
        { Description: 'Dev', Name: 'John', id: 2, objIndex: 1 },
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'Mark', id: 4, objIndex: 3 },
      ];
      const filters = [
        {
          attribute: 'Description',
          label: 'Description',
          predicate: 'Or',
          query: 'contains',
          type: 'string',
          value: 'QA',
        },
        {
          attribute: 'Name',
          label: 'Name',
          predicate: 'Or',
          query: 'contains',
          type: 'string',
          value: 'Dav',
        },
      ];
      const expectedData = [
        { Description: 'QA', Name: 'William', id: 3, objIndex: 2 },
        { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
      ];
      expect(loopFilters(data, filters, 'Description')).toEqual(expectedData);
    });
  });
});
