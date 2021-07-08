import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
// import moment from 'moment';
// import startOfMinute from 'date-fns/startOfMinute';

import { isAfter, isBefore, startOfMinute, isEqual as isEqualDate } from 'date-fns';

export const queryCondition = ({ attrValue = '', attributeType = '', searchValue = '', query = '', placeholder }) => {
  const attributeTypeIsDate = attributeType === 'date' || attributeType === 'datetime';
  if (!searchValue && !attributeTypeIsDate && ['contains', 'does not contains', 'is'].includes(query)) return true;
  attributeType = (attributeType || '').toLowerCase();
  if (attributeType === 'string') {
    attrValue = (attrValue || '').toLowerCase();
    searchValue = (searchValue || '').toLowerCase();
  }

  // date-fns
  if (attributeTypeIsDate) {
    attrValue = attrValue ? startOfMinute(new Date(attrValue)) : '';
    searchValue = searchValue ? startOfMinute(new Date(searchValue)) : '';
  }
  switch (query) {
    case 'contains':
      return attrValue && attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'does not contains':
      return attrValue && !attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'is':
      if (attributeTypeIsDate) {
        return attrValue && isEqualDate(attrValue, searchValue);
      }
      if (attributeType === 'singleselect') {
        if ((searchValue || [])[0] === 0) return isEqual(attrValue, searchValue[0]);
        return (searchValue || [])[0] && isEqual(attrValue, searchValue[0]);
      }
      if (attributeType === 'boolean') {
        return (attrValue || false) === (searchValue || false);
      }
      return attrValue && isEqual(attrValue, searchValue);
    case 'is not':
      if (attributeTypeIsDate) {
        return attrValue && !isEqualDate(attrValue, searchValue);
      }
      if (attributeType === 'singleselect') {
        if ((searchValue || [])[0] === 0) return isEqual(attrValue, searchValue[0]);
        return (searchValue || [])[0] && !isEqual(attrValue, searchValue[0]);
      }
      return attrValue && !isEqual(attrValue, searchValue);
    case 'is empty':
      if (attributeTypeIsDate) return !attrValue;
      return attrValue === 0 ? false : attrValue === placeholder || isEmpty(attrValue.toString());
    case 'is not empty':
      if (attributeTypeIsDate) return !!attrValue;
      return attrValue === 0 ? true : attrValue !== placeholder && !isEmpty(attrValue.toString());
    // Date
    case 'is before':
      // return attrValue.isBefore(searchValue);
      return isBefore(attrValue, searchValue);
    case 'is after':
      // return attrValue.isAfter(searchValue);
      return isAfter(attrValue, searchValue);
    // case 'is on or before':
    //   return attrValue.isSameOrBefore(searchValue);
    // case 'is on or after':
    //   return attrValue.isSameOrAfter(searchValue);

    // Numbers
    case '=':
      return +attrValue === +searchValue;
    case '≠':
      return +attrValue !== +searchValue;
    case '<':
      return +attrValue < +searchValue;
    case '≤':
      return +attrValue <= +searchValue;
    case '>':
      return +attrValue > +searchValue;
    case '≥':
      return +attrValue >= +searchValue;

    // Single-Select
    case 'is any of':
      return searchValue && attrValue && searchValue.includes(attrValue);
    case 'is none of':
      return searchValue && attrValue && !searchValue.includes(attrValue);

    // Multi-select
    case 'has any of':
      return searchValue && attrValue && searchValue.some(v => attrValue.includes(v));
    case 'has none of':
      return searchValue && attrValue && !searchValue.some(v => attrValue.includes(v));

    default:
      return;
  }
};

export const findSearchValue = (type, value) => {
  if (type === 'String') {
    return value ? value.trim() : '';
  } else {
    return value;
  }
};

export const findAttrValue = (obj, attribute) => {
  const foundValue = obj[attribute];
  if (foundValue || foundValue === 0) return foundValue;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && !!value) {
      if (Array.isArray(value)) {
        let subValue;
        for (subValue of value) {
          let result = findAttrValue(subValue, attribute);
          if (result) return result;
        }
      } else {
        if (value[attribute] || value[attribute] === 0) return value[attribute];
      }
    }
  }
};

export const filterData = ({ data, attribute, value, query, type, placeholder }) => {
  return data.filter(d =>
    queryCondition({
      attrValue: findAttrValue(d, attribute),
      searchValue: findSearchValue(type, value),
      query,
      attributeType: (type || '').toLowerCase(),
      placeholder,
    })
  );
};

export const loopFilters = (data, filters, placeholder) => {
  const filterLength = (filters || []).length;
  if (!filterLength) return data;
  if (filterLength === 1) return filterData({ data, ...filters[0], placeholder });

  switch (filters[1].predicate) {
    case 'And':
      let andPredicateFilteredData = data;
      filters.forEach(filter => {
        andPredicateFilteredData = filterData({ data: andPredicateFilteredData, ...filter, placeholder });
      });
      return andPredicateFilteredData;

    case 'Or':
      let orPredicateFilteredData = [];
      filters.forEach(filter => {
        const currentFilterData = filterData({ data, ...filter, placeholder });
        orPredicateFilteredData = [...new Set([...orPredicateFilteredData, ...currentFilterData])];
      });
      return orPredicateFilteredData;
    default:
      return [];
  }
};

// moment-js
// if (attributeType === 'date') {
//   attrValue =
//     attrValue && attrValue instanceof moment
//       ? attrValue.startOf('minute')
//       : moment(attrValue || '').startOf('minute');
//   searchValue =
//     searchValue && searchValue instanceof moment
//       ? searchValue.startOf('minute')
//       : moment(searchValue || '').startOf('minute');
// }
