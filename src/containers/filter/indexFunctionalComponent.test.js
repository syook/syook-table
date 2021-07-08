import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import FilterProvider from './indexFunctionalComponent';

configure({ adapter: new Adapter() });

const data = [{ Description: 'Dev', Name: 'David', id: 1, objIndex: 0 }];

describe('FilterProvider', () => {
  it('should render without crashing', () => {
    shallow(<FilterProvider data={[]} />);
  });

  it('should match snapshot if data is empty', () => {
    const tree = shallow(<FilterProvider data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if data is not empty', () => {
    const tree = shallow(<FilterProvider data={data} filterableColumns={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain TableFilter component', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={[]} />);
    expect(wrapper.find('TableFilter').exists()).toBe(true);
  });

  it('TableFilter should contain disabled as true if data is not empty', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={[]} />);
    expect(wrapper.find('TableFilter').props().disabled).toBe(true);
  });

  it('TableFilter should contain disabled as true if filterableColumn is not empty', () => {
    const wrapper = shallow(<FilterProvider data={[]} filterableColumns={data} />);
    expect(wrapper.find('TableFilter').props().disabled).toBe(true);
  });

  it('TableFilter should contain disabled as false if data and filterableColumn not empty', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={data} />);
    expect(wrapper.find('TableFilter').props().disabled).toBe(false);
  });

  it('should contain ContextProvider', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={data} />);
    expect(wrapper.find('ContextProvider').exists()).toBe(true);
  });

  it('ContextProvider should contain value prop rawdata as passed prop rawData', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={data} rawData={data} />);
    expect(wrapper.find('ContextProvider').props().value.rawData).toEqual(data);
  });

  it('ContextProvider should contain value prop count as passed prop count', () => {
    const wrapper = shallow(<FilterProvider data={data} filterableColumns={data} count={3} />);
    expect(wrapper.find('ContextProvider').props().value.count).toBe(3);
  });
});
