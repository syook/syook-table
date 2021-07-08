import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TableHeader from '.';

configure({ adapter: new Adapter() });

const columns = [
  {
    cell: () => {},
    field: 'name',
    headerName: 'Name',
    isFilterable: true,
    isResizable: true,
    isSearchable: true,
    isSortable: true,
    isVisible: true,
    type: 'String',
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
const sortProps = {
  columnName: 'Name',
  columnType: 'String',
  direction: 'ascending',
  handleSort: () => {},
};

describe('TableHeader', () => {
  it('should render without crashing', () => {
    shallow(<TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />);
  });

  it('should match snapshop', () => {
    const tree = shallow(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept props', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.props().column).toEqual(columns[0]);
    expect(wrapper.props().index).toEqual(0);
    expect(wrapper.props().sortProps).toEqual(sortProps);
    expect(wrapper.props().defaultSort).toEqual('Name');
    expect(wrapper.props().disabled).toEqual(false);
  });

  it('should accept proper data types', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(typeof wrapper.props().column).toEqual('object');
    expect(typeof wrapper.props().index).toEqual('number');
    expect(typeof wrapper.props().sortProps).toEqual('object');
    expect(typeof wrapper.props().defaultSort).toEqual('string');
    expect(typeof wrapper.props().disabled).toEqual('boolean');
  });

  it('should contain TableHeaderCell', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').exists()).toBe(true);
  });

  it('TableHeaderCell should contain sorted prop value as ascending', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').prop('sorted')).toBe('ascending');
  });

  it('TableHeaderCell should contain sorted prop value as null', () => {
    const columns = [
      {
        cell: () => {},
        field: 'name',
        headerName: 'Name',
        isFilterable: true,
        isResizable: true,
        isSearchable: true,
        isSortable: false,
        isVisible: true,
        type: 'String',
      },
      {
        cell: () => {},
        field: 'description',
        headerName: 'Description',
        isFilterable: true,
        isResizable: true,
        isSearchable: true,
        isSortable: false,
        isVisible: true,
        type: 'String',
      },
    ];
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'ascending'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').prop('sorted')).toBe(null);
  });

  it('TableHeaderCell should contain className prop value as resizable if isResizable is true', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').prop('className')).toBe('sort-table  resizable');
  });

  it('TableHeaderCell should not contain className prop value as resizable if isResizable is false', () => {
    const columns = [
      {
        cell: () => {},
        field: 'name',
        headerName: 'Name',
        isFilterable: true,
        isResizable: false,
        isSearchable: true,
        isSortable: false,
        isVisible: true,
        type: 'String',
      },
      {
        cell: () => {},
        field: 'description',
        headerName: 'Description',
        isFilterable: true,
        isResizable: false,
        isSearchable: true,
        isSortable: false,
        isVisible: true,
        type: 'String',
      },
    ];
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').prop('className')).toBe('sort-table ');
  });

  it('TableHeaderCell should contain columnName', () => {
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Name'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').contains(sortProps.columnName)).toBe(true);
  });

  it('should contain is Icon component', () => {
    const columns = [
      {
        cell: () => {},
        field: 'description',
        headerName: 'Description',
        isFilterable: true,
        isResizable: false,
        isSearchable: true,
        isSortable: true,
        isVisible: true,
        type: 'String',
      },
    ];
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Address'} disabled={false} />
    );
    expect(wrapper.find('Icon').exists()).toBe(true);
  });

  it('should match snapshot if Icon component is present', () => {
    const columns = [
      {
        cell: () => {},
        field: 'description',
        headerName: 'Description',
        isFilterable: true,
        isResizable: false,
        isSearchable: true,
        isSortable: true,
        isVisible: true,
        type: 'String',
      },
    ];
    const wrapper = mount(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Address'} disabled={false} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('TableHeaderCell should contain headerMessage', () => {
    const columns = [
      {
        cell: () => {},
        field: 'description',
        headerName: 'Description',
        headerMessage: 'Developer',
        isFilterable: true,
        isResizable: false,
        isSearchable: true,
        isSortable: true,
        isVisible: true,
        type: 'String',
      },
    ];
    const wrapper = shallow(
      <TableHeader column={columns[0]} index={0} sortProps={sortProps} defaultSort={'Address'} disabled={false} />
    );
    expect(wrapper.find('TableHeaderCell').contains(columns[0].headerMessage)).toBe(true);
  });
});
