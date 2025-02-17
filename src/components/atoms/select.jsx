// src/components/atoms/Select.jsx
import React from 'react';
import PropTypes from 'prop-types';
import SelectComponent from 'react-select';

const Select = ({ name, value, onChange, options, className = '', placeholder = 'Select an option' }) => {
  // Convert the selected value into the format expected by react-select
  const selectedOption = options.find((option) => option.value === value);

  // Handle changes in the react-select component
  const handleChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : '';
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className={`w-full ${className}`}>
      <SelectComponent
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: '#d1d5db',
            borderRadius: '0.375rem',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#9ca3af',
            },
          }),
        }}
      />
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;