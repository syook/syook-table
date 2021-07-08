import './actions.css';

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TableActions = ({ actions, row, actionOnHover, data }) => {
  const currentItem = data[row.objIndex];
  return currentItem ? (
    <div
      className={`table-actions ${actionOnHover ? 'onHoverActions' : ''}`}
      style={{
        display: actionOnHover ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
      }}>
      {(actions || []).map((action, index) => {
        if (typeof action.isVisible === 'function' && !action.isVisible(currentItem)) {
          return null;
        }
        return action.hasCustomComponent ? (
          action.customComponent(currentItem)
        ) : (
          <Button
            icon
            id="button"
            className={action.className || ''}
            size={action.size || 'small'}
            inverted={typeof action.inverted === 'function' && action.inverted(currentItem)}
            key={`TableActions-${index}`}
            onClick={() => typeof action.function === 'function' && action.function(currentItem)}
            color={action.color || null}
            disabled={typeof action.isDisabled === 'function' && action.isDisabled(currentItem)}
            loading={typeof action.isLoading === 'function' && action.isLoading(currentItem)}
            // style={{ action.color && action.color[0] === "#" ? background: action.color || '#5DA1CD': {} }}
          >
            <Icon
              className={action.iconClassName || ''}
              name={action.icon}
              color={typeof action.iconColor === 'function' && action.iconColor(currentItem)}
              inverted={action.iconInverted || false}
            />{' '}
            {action.name}
          </Button>
        );
      })}
    </div>
  ) : null;
};

export default TableActions;
