import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium transition duration-200 ${className} ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-500'
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;