import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TableFilter from '.';

configure({ adapter: new Adapter() });

const filters = [
  {
    attribute: 'Name',
    label: 'Name',
    predicate: 'Where',
    query: 'contains',
    type: 'String',
    value: 'Dav',
  },
];

describe('TableFilter', () => {
  it('should render without crashing', () => {
    const fn = jest.fn();
    shallow(<TableFilter applyFilter={fn} />);
  });

  it('matches snapshot', () => {
    const fn = jest.fn();
    const tree = shallow(<TableFilter applyFilter={fn} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if filters are applied', () => {
    const fn = jest.fn();
    const tree = mount(<TableFilter applyFilter={fn} filters={filters} selectedFilters={filters} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if filters are not applied', () => {
    const fn = jest.fn();
    const tree = mount(<TableFilter applyFilter={fn} filters={[]} selectedFilters={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if filters are disabled', () => {
    const fn = jest.fn();
    const tree = mount(
      <TableFilter applyFilter={fn} filters={filters} selectedFilters={filters} filterDisabled={false} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if query is not "is empty" or "is not empty"', () => {
    const fn = jest.fn();
    const column = {
      query: 'contains',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if query is "is empty" or "is not empty"', () => {
    const fn = jest.fn();
    const column = {
      query: 'is empty',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is String', () => {
    const fn = jest.fn();
    const column = {
      type: 'String',
    };

    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is Number', () => {
    const fn = jest.fn();
    const column = {
      type: 'Number',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is SingleSelect', () => {
    const fn = jest.fn();
    const column = {
      type: 'SingleSelect',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is MultiSelect', () => {
    const fn = jest.fn();
    const column = {
      type: 'MultiSelect',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is Boolean', () => {
    const fn = jest.fn();
    const column = {
      type: 'Boolean',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is DateTime', () => {
    const fn = jest.fn();
    const column = {
      type: 'DateTime',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if column type is date', () => {
    const fn = jest.fn();
    const column = {
      type: 'date',
    };
    const tree = mount(
      <TableFilter
        applyFilter={fn}
        filters={filters}
        selectedFilters={filters}
        filterDisabled={false}
        column={column}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
