// src/components/molecules/SpendAmountInput.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/input';

const SpendAmountInput = ({ value, onChange, className = '' }) => {
  return (
    <Input
      name="spendAmount"
      value={value}
      onChange={onChange}
      type="number"
      placeholder="Enter spend amount..."
      className={className}
    />
  );
};

SpendAmountInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SpendAmountInput;