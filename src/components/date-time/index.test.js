import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DateTimeComponent from '.';

configure({ adapter: new Adapter() });

const date = new Date();

describe('Date Time Component', () => {
  it('should render properly', () => {
    shallow(<DateTimeComponent />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<DateTimeComponent />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept props', () => {
    const fn = jest.fn();
    const wrapper = mount(<DateTimeComponent value={date} onChange={fn} />);
    expect(wrapper.props().value).toEqual(date);
    expect(wrapper.props().onChange).toEqual(fn);
  });

  it('props should accept proper datatypes', () => {
    const fn = jest.fn();
    const wrapper = mount(<DateTimeComponent value={date} onChange={fn} />);
    expect(typeof wrapper.props().value).toEqual('object');
    expect(typeof wrapper.props().onChange).toEqual('function');
  });

  it('should render Date Picker', () => {
    const wrapper = shallow(<DateTimeComponent />);
    debugger;
    expect(wrapper.find('#date-picker').exists()).toBe(true);
  });

  it('Date Picker should accept selected prop', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('selected')).toBe(date);
  });

  it('date format prop should be "MMMM d, yyyy h:mm aa"', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('dateFormat')).toBe('MMMM d, yyyy h:mm aa');
  });

  it('date format prop should be true', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('showTimeSelect')).toBe(true);
  });

  it('time format prop should be "HH:mm"', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('timeFormat')).toBe('HH:mm');
  });

  it('time intervals prop should be 1', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('timeIntervals')).toBe(1);
  });

  it('time caption prop should be "time"', () => {
    const wrapper = shallow(<DateTimeComponent value={date} />);
    expect(wrapper.find('#date-picker').prop('timeCaption')).toBe('time');
  });
});
