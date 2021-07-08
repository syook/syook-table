import './header-selector.css';
import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react';

export const ColumnList = ({ columns, toggleAllColumns, toggleColumns }) => {
  return (
    <List key={`hide-selector-list`}>
      {(columns || []).map((column, index) => (
        <List.Item key={`hide-selector-list-item-${index}`}>
          <List.Content>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={column.isVisible}
              onChange={(_e, { checked }) => toggleColumns(column.headerName, { checked })}
            />{' '}
            <span>{column.headerName}</span>
          </List.Content>
        </List.Item>
      ))}
      <List.Item>
        <List.Content>
          <Button compact content="Hide all" size="mini" onClick={() => toggleAllColumns(false)} />
          <Button compact content="Show all" size="mini" onClick={() => toggleAllColumns(true)} />
        </List.Content>
      </List.Item>
    </List>
  );
};

const HeaderSelector = props => {
  const hiddenColumnsCount = props.hiddenColumnCount;
  return (
    <div style={{ textAlign: 'left', display: 'inline-block' }}>
      <Popup
        trigger={
          <Button
            size="medium"
            icon
            style={{
              background: props.accentColor
                ? hiddenColumnsCount
                  ? props.accentColor
                  : 'rgb(170, 170, 170)'
                : hiddenColumnsCount
                ? '#3498DB'
                : 'rgb(109, 180, 226)',
              color: '#fff',
              padding: hiddenColumnsCount ? '0.78em 0.6em 0.78em' : '',
              marginRight: '10px',
            }}>
            <Icon name="eye slash outline" />{' '}
            {hiddenColumnsCount === 1
              ? '1 hidden column'
              : hiddenColumnsCount >= 1
              ? `${hiddenColumnsCount} hidden columns`
              : 'Hide columns'}
          </Button>
        }
        content={
          <ColumnList
            columns={props.columns || []}
            toggleColumns={props.toggleColumns}
            toggleAllColumns={props.toggleAllColumns}
          />
        }
        on="click"
        positionFixed
        position="bottom center"
        className="selectColumns-btn"
      />
    </div>
  );
};

export default HeaderSelector;
