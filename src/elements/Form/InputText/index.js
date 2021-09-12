import React, { useState } from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function Text(props) {
  const {
    outerClassName,
    prepend,
    append,
    name,
    type,
    inputClassName,
    value,
    placeholder,
    errorResponse,
  } = props;

  const [hasError, setHasError] = useState(null);

  let pattern = "";
  if (type === "tel") {
    pattern = "[0-9]*";
  }
  if (type === "email") {
    pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  const onChange = (event) => {
    const target = {
      target: {
        name: name,
        value: event.target.value,
      },
    };

    if (type === "email") {
      if (!pattern.test(event.target.value)) {
        setHasError(errorResponse);
      } else {
        setHasError(null);
      }
    }

    if (type === "tel") {
      if (event.target.validity.valid) {
        props.onChange(target);
      }
    } else {
      props.onChange(target);
    }
  };

  return (
    <div className={["input-text mb-3", outerClassName].join(" ")}>
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend bg-gray-900">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          pattern={pattern}
          className={["form-control", inputClassName].join(" ")}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {append && (
          <div className="input-group-append bg-gray-900">
            <div className="input-group-text">{append}</div>
          </div>
        )}
      </div>
      {hasError && <span className="error-helper">{hasError}</span>}
    </div>
  );
}

Text.defaultProps = {
  type: "text",
  pattern: "",
  placeholder: "Please type here ...",
  errorResponse: "Please match the requested format.",
};

Text.propTypes = {
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  type: propTypes.string,
  placeholder: propTypes.string,
};
