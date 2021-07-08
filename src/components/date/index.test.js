import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DateComponent from '.';

configure({ adapter: new Adapter() });

const date = new Date();

describe('Date Component', () => {
  it('should render without crashing', () => {
    shallow(<DateComponent />);
  });

  it('matches snapshot', () => {
    const tree = shallow(<DateComponent />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept props', () => {
    const fn = jest.fn();
    const wrapper = mount(<DateComponent value={date} onChange={fn} />);
    expect(wrapper.props().value).toEqual(date);
    expect(wrapper.props().onChange).toEqual(fn);
  });

  it('props should accept proper datatypes', () => {
    const fn = jest.fn();
    const wrapper = mount(<DateComponent value={date} onChange={fn} />);
    expect(typeof wrapper.props().value).toEqual('object');
    expect(typeof wrapper.props().onChange).toEqual('function');
  });

  it('should render Date Picker', () => {
    const wrapper = mount(<DateComponent value={date} />);
    expect(wrapper.find('#date-picker').exists()).toBe(true);
  });

  it('Date Picker should accept selected prop', () => {
    const wrapper = shallow(<DateComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('selected')).toBe(date);
  });

  it('Date Picker should accept date format prop', () => {
    const wrapper = shallow(<DateComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('dateFormat')).toBe('MMMM d, yyyy');
  });
});
