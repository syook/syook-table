import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SearchComponent from '.';

configure({ adapter: new Adapter() });

const onChangeSearchText = () => {};
const name = 'Harsh';
const disabled = false;
const placeholder = 'Search...';

describe('Search Component', () => {
  it('should render without crashing', () => {
    shallow(<SearchComponent />);
  });

  it('matches snapshot', () => {
    const tree = shallow(<SearchComponent />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('accepts props', () => {
    const wrapper = mount(
      <SearchComponent
        onChangeSearchText={onChangeSearchText}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
    expect(wrapper.props().name).toEqual(name);
    expect(wrapper.props().disabled).toEqual(disabled);
    expect(wrapper.props().placeholder).toEqual(placeholder);
    expect(wrapper.props().onChangeSearchText).toEqual(onChangeSearchText);
  });

  it('props should accept proper datatypes', () => {
    const wrapper = mount(
      <SearchComponent
        onChangeSearchText={onChangeSearchText}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
    expect(typeof wrapper.props().name).toEqual('string');
    expect(typeof wrapper.props().disabled).toEqual('boolean');
    expect(typeof wrapper.props().placeholder).toEqual('string');
    expect(typeof wrapper.props().onChangeSearchText).toEqual('function');
  });

  it('should render Input Component', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('Input').exists()).toBe(true);
  });

  it('should render input tag', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('default value for input should be empty', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('on change of value, state should be updated', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(
      wrapper.find('Input').simulate('change', {
        target: {
          value: 'harsh',
        },
      })
    );
    expect(wrapper.find('input').prop('value')).toBe('harsh');
  });

  it('should render Icon Components', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('Icon').length).toBe(2);
  });

  it('should render search Icon Component', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('Icon[name="search"]').exists()).toBe(true);
  });

  it('should render close Icon Component', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('Icon[name="close"]').exists()).toBe(true);
  });

  it('on change, handler should be invoked', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchComponent onChange={fn} onChangeSearchText={fn} />);
    expect(
      wrapper.find('Input').simulate('change', {
        target: {
          value: 'Harsh',
        },
      })
    );
    expect(fn).toHaveBeenCalled();
  });

  it('on click, handler should be invoked', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchComponent onClick={fn} onChangeSearchText={fn} />);
    expect(wrapper.find('Icon[name="close"]').simulate('click'));
    expect(fn).toHaveBeenCalled();
  });

  it('on mount, onChangeSearchText should be invoked', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchComponent onChangeSearchText={fn} />);
    expect(fn).toHaveBeenCalled();
  });

  it('on input change, state should be updated', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(
      wrapper.find('Input').simulate('change', {
        target: {
          value: 'Harsh',
        },
      })
    );
    expect(wrapper.find('input').prop('value')).toBe('Harsh');
  });

  it('on close icon click, state should be empty', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(
      wrapper.find('Input').simulate('change', {
        target: {
          value: 'Harsh',
        },
      })
    );
    expect(wrapper.find('Icon[name="close"]').simulate('click'));
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('default placeholder should be Search..., if placeholder prop is not passed', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.find('Input').prop('placeholder')).toBe('Search...');
  });

  it('placeholder should be value passed to prop, if placeholder is passed', () => {
    const wrapper = shallow(<SearchComponent placeholder={'Search'} />);
    expect(wrapper.find('Input').prop('placeholder')).toBe('Search');
  });

  it('Input should not be disabled if disabled prop is not passed', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(Boolean(wrapper.find('Input').prop('disabled'))).toBe(false);
  });

  it('Input should be disabled if disabled prop is passed', () => {
    const wrapper = shallow(<SearchComponent disabled={true} />);
    expect(wrapper.find('Input').prop('disabled')).toBe(true);
  });

  it('should match snapshot if name prop is passed', () => {
    const tree = shallow(<SearchComponent name={name} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain name prop value if name is passed', () => {
    const wrapper = shallow(<SearchComponent name={name} />);
    expect(wrapper.contains(name)).toBeTruthy();
  });

  it('should not contain name prop value if name is not passed', () => {
    const wrapper = shallow(<SearchComponent />);
    expect(wrapper.contains(name)).toBeFalsy();
  });
});
