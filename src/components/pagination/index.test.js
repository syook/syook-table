import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Pagination from '.';

configure({ adapter: new Adapter() });

const data = [
  { Description: 'Dev', name: 'Harsh', id: 1, objIndex: 0 },
  { Description: 'QA', name: 'Prakash', id: 2, objIndex: 1 },
];
const pageRange = [1];
const rowsPerPage = { label: '10 items', value: 10 };
const tableFooterName = 'footer';
const rowCount = 2;

describe('Pagination Component', () => {
  it('should render properly', () => {
    shallow(<Pagination data={[]} />);
  });

  it('should match snapshot when data prop is empty', () => {
    const tree = shallow(<Pagination data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept all props', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Pagination
        data={[]}
        rowCount={rowCount}
        tableFooterName={tableFooterName}
        rowsPerPage={rowsPerPage}
        onSelectRowsPerPage={fn}
        handlePageClick={fn}
        handleDirectionClick={fn}
        currentPage={1}
        numberOfPages={5}
        pageRange={[]}
      />
    );
    expect(wrapper.props().data.length).toEqual(0);
    expect(wrapper.props().rowCount).toEqual(rowCount);
    expect(wrapper.props().tableFooterName).toEqual('footer');
    expect(wrapper.props().rowsPerPage).toEqual(rowsPerPage);
    expect(wrapper.props().onSelectRowsPerPage).toEqual(fn);
    expect(wrapper.props().handlePageClick).toEqual(fn);
    expect(wrapper.props().handleDirectionClick).toEqual(fn);
    expect(wrapper.props().currentPage).toEqual(1);
    expect(wrapper.props().numberOfPages).toEqual(5);
    expect(wrapper.props().pageRange.length).toEqual(0);
  });

  it('should accept proper datatypes for props', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Pagination
        data={[]}
        rowCount={rowCount}
        tableFooterName={tableFooterName}
        rowsPerPage={rowsPerPage}
        onSelectRowsPerPage={fn}
        handlePageClick={fn}
        handleDirectionClick={fn}
        currentPage={1}
        numberOfPages={5}
        pageRange={[]}
      />
    );
    expect(Array.isArray(wrapper.props().data)).toEqual(true);
    expect(typeof wrapper.props().rowCount).toEqual('number');
    expect(typeof wrapper.props().tableFooterName).toEqual('string');
    expect(typeof wrapper.props().rowsPerPage).toEqual('object');
    expect(typeof wrapper.props().onSelectRowsPerPage).toEqual('function');
    expect(typeof wrapper.props().handlePageClick).toEqual('function');
    expect(typeof wrapper.props().handleDirectionClick).toEqual('function');
    expect(typeof wrapper.props().currentPage).toEqual('number');
    expect(typeof wrapper.props().numberOfPages).toEqual('number');
    expect(Array.isArray(wrapper.props().pageRange)).toEqual(true);
  });

  it('should match snapshot when data prpp is not empty', () => {
    const fn = jest.fn();
    const tree = mount(
      <Pagination
        data={data}
        rowCount={rowCount}
        tableFooterName={tableFooterName}
        rowsPerPage={rowsPerPage}
        onSelectRowsPerPage={fn}
        handlePageClick={fn}
        handleDirectionClick={fn}
        currentPage={1}
        numberOfPages={1}
        pageRange={pageRange}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should contain Label Component', () => {
    const wrapper = shallow(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('Label').exists()).toBe(true);
  });

  it('should contain Select Component', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('Select').exists()).toBe(true);
  });

  it('should contain Menu Component', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('Menu').exists()).toBe(true);
  });

  it('should match snapshot if pageRange is empty', () => {
    const wrapper = mount(<Pagination data={data} pageRange={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot if pageRange has values', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should contain 4 MenuItem Component if pageRange is empty', () => {
    const wrapper = mount(<Pagination data={data} pageRange={[]} />);
    expect(wrapper.find('MenuItem').length).toBe(4);
  });

  it('should contain (4 + pageRange.length) MenuItem Component if pageRange is not empty', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('MenuItem').length).toBe(4 + pageRange.length);
  });

  it('should contain tableFooterName value in Label', () => {
    const wrapper = shallow(<Pagination data={data} tableFooterName={tableFooterName} pageRange={pageRange} />);
    expect(wrapper.find('Label').contains(tableFooterName)).toBeTruthy();
  });

  it('should contain rowCount value in Label', () => {
    const wrapper = shallow(
      <Pagination data={data} tableFooterName={tableFooterName} pageRange={pageRange} rowCount={rowCount} />
    );
    expect(wrapper.find('Label').contains(rowCount)).toBeTruthy();
  });

  it('passed rowsPerPage prop should match value prop in Select Component', () => {
    const wrapper = mount(<Pagination data={data} rowsPerPage={rowsPerPage} pageRange={pageRange} />);
    expect(wrapper.find('Select').prop('value')).toBe(rowsPerPage);
  });

  it('Select prop isClearable should be false', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('Select').prop('isClearable')).toBe(false);
  });

  it('Select prop isSearchable should be false', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(wrapper.find('Select').prop('isSearchable')).toBe(false);
  });

  it('MenuItem 1 should have page prop value as 1', () => {
    const wrapper = mount(<Pagination data={data} pageRange={[]} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(0)
        .props().page
    ).toBe(1);
  });

  it('handlePageClick should get assigned to MenuItem onClick', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(0)
        .props().onClick
    ).toBe(fn);
  });

  it('MenuItem should invoke handlePageClick on click', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(0)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
  });

  it('handleDirectionClick should get assigned to MenuItem onClick', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handleDirectionClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(1)
        .props().onClick
    ).toBe(fn);
  });

  it('MenuItem should invoke handleDirectionClick on click', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handleDirectionClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(1)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
  });

  it('handleDirectionClick should get assigned to MenuItem onClick', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handleDirectionClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().onClick
    ).toBe(fn);
  });

  it('MenuItem should invoke handleDirectionClick on click', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handleDirectionClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
  });

  it('MenuItem page prop should get assigned by numberOfPages', () => {
    const wrapper = mount(<Pagination data={data} pageRange={[]} numberOfPages={3} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .props().page
    ).toBe(3);
  });

  it('handlePageClick should get assigned to MenuItem onClick', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .props().onClick
    ).toBe(fn);
  });

  it('MenuItem should invoke handlePageClick on click', () => {
    const fn = jest.fn();
    const wrapper = mount(<Pagination data={data} pageRange={[]} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
  });

  it('pageRange item should be assigned to MenuItem content prop', () => {
    const pageRange = [1, 2];
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().content
    ).toBe(String(pageRange[0]));
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .props().content
    ).toBe(String(pageRange[1]));
  });

  it('pageRange item should be assigned to MenuItem page prop', () => {
    const pageRange = [1, 2];
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().page
    ).toBe(pageRange[0]);
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .props().page
    ).toBe(pageRange[1]);
  });

  it('handlePageClick should be assigned to MenuItem onClick prop', () => {
    const fn = jest.fn();
    const pageRange = [1, 2];
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().onClick
    ).toBe(fn);
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .props().onClick
    ).toBe(fn);
  });

  it('MenuItem should invoke handlePageClick on click', () => {
    const fn = jest.fn();
    const pageRange = [1, 2];
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} handlePageClick={fn} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
    expect(
      wrapper
        .find('MenuItem')
        .at(3)
        .simulate('click')
    );
    expect(fn).toHaveBeenCalled();
  });

  it('if current page is equal to pageRange value, active prop should be true', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} currentPage={1} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().active
    ).toBe(true);
  });

  it('if current page is not equal to pageRange value, active prop should be false', () => {
    const wrapper = mount(<Pagination data={data} pageRange={pageRange} currentPage={2} />);
    expect(
      wrapper
        .find('MenuItem')
        .at(2)
        .props().active
    ).toBe(false);
  });
});
