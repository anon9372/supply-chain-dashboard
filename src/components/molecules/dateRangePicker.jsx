import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../atoms/dataPicker';

const DateRangePicker = ({ startDate, endDate, onChange, className = '' }) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <DatePicker
        selected={startDate}
        onChange={(date) => onChange([date, endDate])}
        placeholderText="Start Date"
        className="w-full"
      />
      <span className="text-gray-500">to</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => onChange([startDate, date])}
        placeholderText="End Date"
        className="w-full"
      />
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DateRangePicker;