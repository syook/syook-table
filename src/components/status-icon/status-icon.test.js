import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import StatusIcon from './status-icon';

configure({ adapter: new Adapter() });

const showWorkOrderStatus = {
  IconName: 'home',
  StatusIcon: 'icon',
  IconColor: 'red',
};

describe('StatusIcon Component', () => {
  it('should render without crashing', () => {
    shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
  });

  it('matches snapshot', () => {
    const tree = shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept props', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.props().showWorkOrderStatus).toEqual(showWorkOrderStatus);
  });

  it('props should accept proper datatypes', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(typeof wrapper.props().showWorkOrderStatus).toEqual('object');
  });

  it('should render Popup Component', () => {
    const wrapper = shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Popup').exists()).toBe(true);
  });

  it('should render Icon Component', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Icon').exists()).toBe(true);
  });

  it('value for Popup position should be "top left" if position is not found', () => {
    const showWorkOrderStatus = {
      IconName: 'home',
      StatusIcon: 'icon',
      IconColor: 'red',
    };
    const wrapper = shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Popup').prop('position')).toBe('top left');
  });

  it('value for Popup position should be passed position value if found', () => {
    const showWorkOrderStatus = {
      IconName: 'home',
      StatusIcon: 'icon',
      IconColor: 'red',
      position: 'top right',
    };
    const wrapper = shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Popup').prop('position')).toBe(showWorkOrderStatus.position);
  });

  it('value for Popup content should be passed content value if found', () => {
    const showWorkOrderStatus = {
      IconName: 'home',
      StatusIcon: 'icon',
      IconColor: 'red',
      position: 'top right',
      content: 'some text',
    };
    const wrapper = shallow(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Popup').prop('content')).toBe(showWorkOrderStatus.content);
  });

  it('on mount, should render icons', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Icon').exists()).toBe(true);
  });

  it('icon name should be passed value from prop', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Icon').prop('name')).toBe(showWorkOrderStatus.IconName);
  });

  it('icon color should be passed value from prop', () => {
    const wrapper = mount(<StatusIcon showWorkOrderStatus={showWorkOrderStatus} />);
    expect(wrapper.find('Icon').prop('color')).toBe(showWorkOrderStatus.IconColor);
  });
});
