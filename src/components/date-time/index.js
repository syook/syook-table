import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import React from 'react';

const DateTimeComponent = props => {
  return (
    <DatePicker
      id="date-picker"
      selected={props.value}
      onChange={date => props.onChange(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={1}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeCaption="time"
    />
  );
};

export default DateTimeComponent;
