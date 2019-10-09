import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Table from '../src/index';
import moment from 'moment';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

let tableConfig = [
  {
    heading: 'Name',
    column: 'name',
    type: 'String',
    cell: ({ row }) => row.name,
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Description',
    column: 'description',
    type: 'String',
    cell: ({ row }) => row.description,
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Category',
    column: 'category',
    type: 'Select',
    cell: ({ row }) => row.category,
    options: [{ value: 'Electrical', label: 'Electrical' }, { value: 'Mechanical', label: 'Mechanical' }],
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Availability',
    column: 'availability',
    type: 'Boolean',
    cell: ({ row }) => (row.availability ? 'Yes' : 'No'),
    isSortable: true,
    isSearchable: true,
  },
  {
    heading: 'Created at',
    column: 'createdAt',
    type: 'Date',
    cell: ({ row }) => moment(row.createdAt).formatOf('DD-MMM-YYYY hh:mm A'),
    isSortable: true,
    isSearchable: true,
  },
];

let actionConfig = [
  {
    action: 'Show',
    function: this.onShow,
    icon: 'eye',
    show: _row => true,
  },
  {
    action: 'Edit',
    function: this.onShow,
    icon: 'pencil',
    show: _row => true,
  },
  {
    action: 'Delete',
    show: _row => true,
    function: this.onDelete,
    icon: 'trash',
  },
];

describe('Table', () => {
  it('can render a table', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(
        <Table
          actionConfig={actionConfig}
          bulkActions={[{ action: 'delete', function: onDelete }]}
          data={this.props.objects}
          includeAction={true}
          mandatoryFields={['Name']}
          name="Menu Items"
          records={tableConfig}
        />,
        container
      );
    });

    // Write Assertions below
  });
});
