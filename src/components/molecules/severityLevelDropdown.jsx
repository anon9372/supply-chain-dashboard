import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atoms/select';

const SeverityLevelDropdown = ({ value, onChange, className = '' }) => {
  const options = [
    { value: 'Critical', label: 'Critical' },
    { value: 'Severe', label: 'Severe' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Low', label: 'Low' },
  ];

  return (
    <Select
      name="severityLevel"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select Severity Level"
      className={className}
    />
  );
};

SeverityLevelDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SeverityLevelDropdown;