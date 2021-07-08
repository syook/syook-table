import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import BulkActionList from '.';

configure({ adapter: new Adapter() });

describe('BulkActionList', () => {
  it('should render without crashing', () => {
    shallow(<BulkActionList />);
  });

  it('should match snapshot', () => {
    const tree = mount(<BulkActionList />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain Dropdown component', () => {
    const wrapper = mount(<BulkActionList />);
    expect(wrapper.find('Dropdown').exists()).toBe(true);
  });

  it('Dropdown text should be selectedRows.length', () => {
    const wrapper = mount(<BulkActionList selectedRows={[1, 2]} />);
    expect(wrapper.find('Dropdown').props().text).toBe('Bulk Action (2 selected)');
  });

  it('Dropdown text should be zero if selectedRows are empty', () => {
    const wrapper = mount(<BulkActionList selectedRows={[]} />);
    expect(wrapper.find('Dropdown').props().text).toBe('Bulk Action (0 selected)');
  });

  it('should match snapshot is selectedRows are empty', () => {
    const tree = mount(<BulkActionList selectedRows={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot is selectedRows are not empty', () => {
    const tree = mount(<BulkActionList selectedRows={[1, 2]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if bulkActions are empty', () => {
    const tree = mount(<BulkActionList selectedRows={[1, 2]} bulkActions={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if bulkActions are not empty', () => {
    const bulkActions = [{ function: () => {}, name: 'Delete' }];
    const tree = mount(<BulkActionList selectedRows={[1, 2]} bulkActions={bulkActions} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
