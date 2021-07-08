import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SortProvider from './indexFunctionalComponent';

configure({ adapter: new Adapter() });

const rawData = [
  { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
];

describe('SortProvider', () => {
  it('should render without crashing', () => {
    shallow(<SortProvider />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<SortProvider />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain ContextProvider', () => {
    const wrapper = shallow(<SortProvider />);
    expect(wrapper.find('ContextProvider').exists()).toBe(true);
  });

  it('ContextProvider should contain prop value rawData as passed prop rawData', () => {
    const wrapper = shallow(<SortProvider rawData={rawData} />);
    expect(wrapper.find('ContextProvider').props().value.rawData).toBe(rawData);
  });

  it('ContextProvider should contain prop value count as passed prop count', () => {
    const wrapper = shallow(<SortProvider rawData={rawData} count={3} />);
    expect(wrapper.find('ContextProvider').props().value.count).toBe(3);
  });
});
