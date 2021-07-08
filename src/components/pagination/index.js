import './pagination.css';

import React from 'react';
import { Label, Menu, MenuItem } from 'semantic-ui-react';
import Select from 'react-select';

const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
  value: num,
  label: `${num} Items`,
}));

const Pagination = props => {
  if (!props.data.length) return null;

  const maxRowOptionAvailable = (
    rowsPerPageOptions.find(obj => obj.value >= props.rowCount) || rowsPerPageOptions[rowsPerPageOptions.length - 1]
  ).value;
  const pageOptions = rowsPerPageOptions.filter(obj => +obj.value <= +maxRowOptionAvailable);
  return (
    <div className="tabulous pagination-footer">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          width: '100%',
        }}>
        <Label ribbon>
          Total {props.tableFooterName} : {props.rowCount}
        </Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              color: '#26547c',
              fontSize: '13px',
              fontWeight: 'normal',
              margin: '0px 15px',
            }}>
            Show
          </span>
          <Select
            className="pagination_select"
            value={props.rowsPerPage}
            options={pageOptions}
            onChange={() => console.log('onchsnge wsjbdefej') || props.onSelectRowsPerPage()}
            isClearable={false}
            isSearchable={false}
            menuPortalTarget={document.querySelector('#root')}
            menuPlacement="top"
          />
          <Menu floated="right" pagination>
            <MenuItem icon="angle double left" page={1} onClick={props.handlePageClick} />
            <MenuItem data-direction="LEFT" onClick={props.handleDirectionClick} icon="angle left" />
            {props.pageRange.map((pageIndex, index) => (
              <MenuItem
                key={`table-footer-${index}`}
                content={`${pageIndex}`}
                page={pageIndex}
                onClick={props.handlePageClick}
                active={pageIndex === props.currentPage}
                as="a"
              />
            ))}
            <MenuItem data-direction="RIGHT" onClick={props.handleDirectionClick} icon="angle right" />
            <MenuItem icon="angle double right" page={props.numberOfPages} onClick={props.handlePageClick} />
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
