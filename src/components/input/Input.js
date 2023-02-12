import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';

const Input = ({ id, name, value, type, placeholder, labelText, className, handleChange }) => {
    return (
        <>
            <div className="form-row">
                {labelText && (
                    <label className="form-label" htmlFor={name}>
                        {labelText}
                    </label>
                )}
                <input
                    id={id}
                    className={`form-input ${className}`}
                    type={type}
                    onChange={handleChange}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="false"
                />
            </div>
        </>
    );
};

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    labelText: PropTypes.string,
    className: PropTypes.string,
    handleChange: PropTypes.func
};

export default Input;
