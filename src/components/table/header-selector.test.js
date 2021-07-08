import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import HeaderSelector, { ColumnList } from './header-selector';

configure({ adapter: new Adapter() });

describe('HeaderSelector', () => {
  it('should render without crashing', () => {
    shallow(<HeaderSelector />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<HeaderSelector />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  describe('ColumnList', () => {
    it('should match snapshot if no props are passed', () => {
      const tree = mount(<ColumnList />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should match snapshot if columns are empty', () => {
      const tree = mount(<ColumnList columns={[]} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should match snapshot if columns are not empty', () => {
      const columns = [
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
      const tree = mount(<ColumnList columns={columns} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should contain List component', () => {
      const columns = [
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
      const wrapper = mount(<ColumnList columns={columns} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(wrapper.find('List').exists()).toBe(true);
    });

    it('should contain Checkbox component', () => {
      const columns = [
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
      const wrapper = mount(<ColumnList columns={columns} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(wrapper.find('Checkbox').exists()).toBe(true);
    });

    it('should contain Checkbox prop checked to be true', () => {
      const columns = [
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
      const wrapper = mount(<ColumnList columns={columns} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(wrapper.find('Checkbox').props().checked).toBe(true);
    });

    it('should contain Checkbox prop checked to be false', () => {
      const columns = [
        {
          cell: () => {},
          field: 'description',
          headerName: 'Description',
          isFilterable: true,
          isResizable: true,
          isSearchable: true,
          isSortable: true,
          isVisible: false,
          type: 'String',
        },
      ];
      const wrapper = mount(<ColumnList columns={columns} toggleColumns={() => {}} toggleAllColumns={() => {}} />);
      expect(wrapper.find('Checkbox').props().checked).toBe(false);
    });
  });

  describe('HeaderSelector', () => {
    it('should match snapshot including ColumnList', () => {
      const tree = mount(<HeaderSelector />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should match snapshot if hiddenColumnCount is 1', () => {
      const tree = mount(<HeaderSelector hiddenColumnCount={1} />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should match snapshot if hiddenColumnCount is more than 1', () => {
      const tree = mount(<HeaderSelector hiddenColumnCount={3} />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should match snapshot if hiddenColumnCount is zero', () => {
      const tree = mount(<HeaderSelector hiddenColumnCount={0} />);
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should contain Popup component', () => {
      const wrapper = mount(<HeaderSelector hiddenColumnCount={0} />);
      expect(wrapper.find('Popup').exists()).toBe(true);
    });

    it('should contain Button component', () => {
      const wrapper = mount(<HeaderSelector hiddenColumnCount={0} />);
      expect(wrapper.find('Button').exists()).toBe(true);
    });

    it('should contain Icon component', () => {
      const wrapper = mount(<HeaderSelector hiddenColumnCount={0} />);
      expect(wrapper.find('Icon').exists()).toBe(true);
    });
  });
});
