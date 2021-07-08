import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import PaginationProvider from './indexFunctioncalComponent';

configure({ adapter: new Adapter() });

const data = [
  { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
];

describe('SortProvider', () => {
  it('should render without crashing', () => {
    shallow(<PaginationProvider data={data} />);
  });

  it('should match snapshot if data is not empty', () => {
    const tree = shallow(<PaginationProvider data={data} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if data is empty', () => {
    const tree = shallow(<PaginationProvider data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain Table component', () => {
    const wrapper = shallow(<PaginationProvider data={data} />);
    expect(wrapper.find('Table').exists()).toBe(true);
  });

  it('Table should contain sortable as true', () => {
    const wrapper = shallow(<PaginationProvider data={data} />);
    expect(wrapper.find('Table').props().sortable).toBe(true);
  });

  it('Table should contain celled as true', () => {
    const wrapper = shallow(<PaginationProvider data={data} />);
    expect(wrapper.find('Table').props().celled).toBe(true);
  });

  it('Table should contain padded as true', () => {
    const wrapper = shallow(<PaginationProvider data={data} />);
    expect(wrapper.find('Table').props().padded).toBe(true);
  });

  it('should contain Pagination component', () => {
    const wrapper = shallow(<PaginationProvider data={data} />);
    expect(wrapper.find('Pagination').exists()).toBe(true);
  });

  it('Pagination should contain rowCount as passed prop count', () => {
    const wrapper = shallow(<PaginationProvider data={data} count={2} />);
    expect(wrapper.find('Pagination').props().rowCount).toBe(2);
  });
});
