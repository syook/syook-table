import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import TableActions from '.';

configure({ adapter: new Adapter() });

const actions = [
  {
    color: '#85C1E9',
    function: () => {},
    icon: 'eye',
    isDisabled: () => {},
    isLoading: () => {},
    isVisible: () => {},
    name: 'Show',
  },
  {
    color: '#E8515D',
    function: () => {},
    icon: 'trash',
    isDisabled: () => {},
    isLoading: () => {},
    isVisible: () => {},
    name: 'Delete',
  },
];
const data = [
  { description: 'Dev', id: 1, isDeleted: false, is_completed: true, name: 'Harsh Singh' },
  { description: 'QA', id: 2, isDeleted: true, name: 'Prakash Barik' },
];
const row = { Description: 'Dev', name: 'Harsh Singh', id: 1, objIndex: 0 };

describe('TableActions Component', () => {
  it('should render without crashing', () => {
    shallow(<TableActions actions={actions} data={data} row={row} />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<TableActions actions={actions} data={data} row={row} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if data is empty', () => {
    const tree = shallow(<TableActions actions={actions} data={[]} row={row} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if actions is empty', () => {
    const tree = shallow(<TableActions actions={[]} data={data} row={row} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should acccept props', () => {
    const wrapper = mount(<TableActions actions={actions} data={data} row={row} />);
    expect(wrapper.props().actions).toEqual(actions);
    expect(wrapper.props().data).toEqual(data);
    expect(wrapper.props().row).toEqual(row);
  });

  it('should accept proper datatypes', () => {
    const wrapper = mount(<TableActions actions={actions} data={data} row={row} />);
    expect(Array.isArray(wrapper.props().actions)).toEqual(true);
    expect(Array.isArray(wrapper.props().data)).toEqual(true);
    expect(typeof wrapper.props().row).toEqual('object');
    expect(Array.isArray(wrapper.props().row)).toEqual(false);
  });
});
