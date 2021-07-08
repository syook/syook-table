import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import IndexFunctionalComponent from './indexFunctionalComponent';

configure({ adapter: new Adapter() });

const data = [
  { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
];

describe('TableFilter', () => {
  it('should render without crashing', () => {
    shallow(<IndexFunctionalComponent data={[]} />);
  });

  it('matches snapshot if data is empty', () => {
    const tree = shallow(<IndexFunctionalComponent data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if data is not empty', () => {
    const tree = shallow(<IndexFunctionalComponent data={data} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if mandatoryFields are not empty', () => {
    const mandatoryFields = ['Name'];
    const tree = shallow(<IndexFunctionalComponent data={data} mandatoryFields={mandatoryFields} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if bulkActionDefs are present and showBulkActions is true', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const tree = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if isShowSerialNumber is true', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = true;
    const tree = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if isShowSerialNumber is false', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const tree = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if includeAction is true', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const includeAction = true;
    const tree = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
        includeAction={includeAction}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('matches snapshot if showStatusIcon is true', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const includeAction = true;
    const showStatusIcon = true;
    const tree = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
        includeAction={includeAction}
        showStatusIcon={showStatusIcon}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain SearchProvider', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const includeAction = true;
    const showStatusIcon = true;
    const wrapper = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
        includeAction={includeAction}
        showStatusIcon={showStatusIcon}
      />
    );
    expect(wrapper.find('SearchProvider').exists()).toBe(true);
  });

  it('SearchProvider should contain prop rawData as data passed to TableFilter', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const includeAction = true;
    const showStatusIcon = true;
    const wrapper = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
        includeAction={includeAction}
        showStatusIcon={showStatusIcon}
      />
    );
    expect(wrapper.find('SearchProvider').props().rawData).toEqual(data);
  });

  it('SearchProvider should contain prop tableData as data in state', () => {
    const mandatoryFields = ['Name'];
    const showBulkActions = true;
    const bulkActionDefs = [{ function: () => {}, name: 'Delete' }];
    const isShowSerialNumber = false;
    const includeAction = true;
    const showStatusIcon = true;
    const wrapper = shallow(
      <IndexFunctionalComponent
        data={data}
        mandatoryFields={mandatoryFields}
        bulkActionDefs={bulkActionDefs}
        showBulkActions={showBulkActions}
        isShowSerialNumber={isShowSerialNumber}
        includeAction={includeAction}
        showStatusIcon={showStatusIcon}
      />
    );
    expect(wrapper.find('SearchProvider').props().tableData).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
