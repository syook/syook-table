import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactTabulous from './containers/table/indexFunctionalComponent';
import { Input } from 'semantic-ui-react';

export default class App extends React.Component {
  //you can manipulate this component for testing
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      data: [
        { id: 1, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false },
        { id: 2, name: 'Prakash Barik', description: 'QA', isDeleted: true },
        { id: 3, name: 'Muhammad Anees', description: 'Dev', isDeleted: true },
        { id: 4, name: 'Mayank Khajanchi', description: 'Dev', isDeleted: true },
      ],
    };
  }
  onDelete = ids => {
    console.log('onDelete', ids);
  };

  onShow = rowObject => {
    console.log('onShow', rowObject);
  };

  onEdit = rowObject => {
    console.log('onEdit', rowObject);
  };

  // componentDidMount() {
  //   this.setState({ count: 16 });
  // }

  onInputChange = ({ rowObject, value: newValue }) => {
    const obj = this.state.data.find(item => item.id === rowObject.id);
    obj.name = newValue;
    // this.setState(prev => {
    //   return {
    //     data: [...prev.data.filter(item => item.id !== rowObject.id), obj],
    //   };
    // });
  };

  columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      type: 'String',
      cell: rowObject => (
        <Input value={rowObject.name} onChange={(_e, { value }) => this.onInputChange({ value, rowObject })} />
      ),
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      type: 'String',
      cell: rowObject => rowObject.description,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
  ];

  updatingObjectId = () => false;

  actionDefs = [
    {
      name: 'Show',
      isVisible: _rowObject => true,
      isDisabled: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      isLoading: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      function: this.onShow,
      icon: 'eye',
      color: '#85C1E9',
    },
    {
      name: 'Delete',
      isVisible: rowObject => !rowObject.isDeleted,
      isDisabled: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      isLoading: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      function: rowObject => this.onDelete(rowObject),
      icon: 'trash',
      color: '#E8515D',
    },
  ];
  showIcon = row => {
    return <i>icon</i>;
  };

  getBulkActionState = data => {
    console.log(data);
  };

  componentDidMount() {
    this.setState({
      data: [
        { id: 1, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false },
        { id: 2, name: 'Prakash Barik', description: 'QA', isDeleted: true },
      ],
    });
  }

  render() {
    return (
      <div>
        <ReactTabulous
          data={this.state.data}
          columnDefs={this.columnDefs}
          actionDefs={this.actionDefs}
          includeAction={true}
          showBulkActions={true}
          bulkActionDefs={[{ name: 'Delete', function: () => null }]}
          mandatoryFields={['Name']}
          name={'Table Name'}
          // count={20}
          showIcon={this.showIcon}
          getBulkActionState={this.getBulkActionState}
          getSelectedOrUnselectedId={(check, id) => {
            console.log(check, id, 'checked value for particular row for the bulkAction');
          }}
          // fetchOnPageChange={(pageNumber, search, searchKeys, rowsPerPage, sortParams) => {
          //   //do something here , like fetch the data from backend.
          //   this.setState({ data: this.state.data });
          //   console.log('heyy');
          // }}
          enableIcon={true}
          isShowSerialNumber
          isAllowDeepSearch
          emptyCellPlaceHolder="N/A"
          accentColor="#26547c"
        />
      </div>
    );
  }
}
