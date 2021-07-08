import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TableCell from './cell';

configure({ adapter: new Adapter() });

const data = [
  { Description: 'Dev', Name: 'David', id: 1, objIndex: 0 },
  { Description: 'QA', Name: 'John', id: 2, objIndex: 1 },
];

describe('TableCell', () => {
  it('should render without crashing', () => {
    shallow(<TableCell data={{ data }} row={{ objIndex: 0 }} />);
  });

  it('should match snapshot', () => {
    const tree = mount(<TableCell data={{ data }} row={{ objIndex: 0 }} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if currentItem is not found', () => {
    const tree = mount(<TableCell data={{ data }} row={{ objIndex: 3 }} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if currentItem is found', () => {
    const tree = mount(<TableCell data={{ data }} row={{ objIndex: 1 }} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
